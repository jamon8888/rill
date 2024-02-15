import type { ResolvedMeasureFilter } from "@rilldata/web-common/features/dashboards/filters/measure-filters/measure-filter-utils";
import {
  getTimeGrainFromDimension,
  isTimeDimension,
} from "@rilldata/web-common/features/dashboards/pivot/pivot-utils";
import type {
  PivotAxesData,
  PivotDataStoreConfig,
} from "@rilldata/web-common/features/dashboards/pivot/types";
import type { StateManagers } from "@rilldata/web-common/features/dashboards/state-managers/state-managers";
import {
  createAndExpression,
  createInExpression,
  sanitiseExpression,
} from "@rilldata/web-common/features/dashboards/stores/filter-utils";
import { useTimeControlStore } from "@rilldata/web-common/features/dashboards/time-controls/time-control-store";
import type { TimeRangeString } from "@rilldata/web-common/lib/time/types";
import {
  V1Expression,
  V1MetricsViewAggregationDimension,
  V1MetricsViewAggregationResponseDataItem,
  V1MetricsViewAggregationSort,
  createQueryServiceMetricsViewAggregation,
  type V1MetricsViewAggregationResponse,
} from "@rilldata/web-common/runtime-client";
import type { CreateQueryResult } from "@tanstack/svelte-query";
import { Readable, derived, readable } from "svelte/store";
import { mergeFilters } from "./pivot-merge-filters";

/**
 * Wrapper function for Aggregate Query API
 */
export function createPivotAggregationRowQuery(
  ctx: StateManagers,
  measures: string[],
  dimensions: V1MetricsViewAggregationDimension[],
  whereFilter: V1Expression,
  measureFilter: ResolvedMeasureFilter | undefined,
  sort: V1MetricsViewAggregationSort[] = [],
  limit = "100",
  offset = "0",
  timeRange: TimeRangeString | undefined = undefined,
): CreateQueryResult<V1MetricsViewAggregationResponse> {
  if (!sort.length) {
    sort = [
      {
        desc: false,
        name: measures[0] || dimensions?.[0]?.name,
      },
    ];
  }

  return derived(
    [ctx.runtime, ctx.metricsViewName, useTimeControlStore(ctx)],
    ([runtime, metricViewName, timeControls], set) =>
      createQueryServiceMetricsViewAggregation(
        runtime.instanceId,
        metricViewName,
        {
          measures: measures.map((measure) => ({ name: measure })),
          dimensions,
          where: sanitiseExpression(whereFilter, measureFilter?.filter),
          timeRange: {
            start: timeRange?.start ? timeRange.start : timeControls.timeStart,
            end: timeRange?.end ? timeRange.end : timeControls.timeEnd,
          },
          sort,
          limit,
          offset,
        },
        {
          query: {
            enabled: !!timeControls.ready && !!ctx.dashboardStore,
            queryClient: ctx.queryClient,
            keepPreviousData: true,
          },
        },
      ).subscribe(set),
  );
}

/***
 * Get a list of axis values for a given list of dimension values and filters
 */
export function getAxisForDimensions(
  ctx: StateManagers,
  config: PivotDataStoreConfig,
  dimensions: string[],
  whereFilter: V1Expression,
  sortBy: V1MetricsViewAggregationSort[] = [],
  timeRange: TimeRangeString | undefined = undefined,
): Readable<PivotAxesData | null> {
  if (!dimensions.length) return readable(null);

  const measures = config.measureNames;
  const { time } = config;

  let sortProvided = true;
  if (!sortBy.length) {
    sortBy = [
      {
        desc: true,
        name: measures[0] || dimensions?.[0],
      },
    ];
    sortProvided = false;
  }

  const dimensionBody = dimensions.map((d) => {
    if (isTimeDimension(d, time.timeDimension)) {
      return {
        name: time.timeDimension,
        timeGrain: getTimeGrainFromDimension(d),
        timeZone: time.timeZone,
        alias: d,
      };
    } else return { name: d };
  });

  return derived(
    dimensionBody.map((dimension) => {
      let sortByForDimension = sortBy;
      if (
        isTimeDimension(dimension.alias, time.timeDimension) &&
        !sortProvided
      ) {
        sortByForDimension = [
          {
            desc: false,
            name: dimension.alias,
          },
        ];
      }
      return createPivotAggregationRowQuery(
        ctx,
        measures,
        [dimension],
        whereFilter,
        config.measureFilter,
        sortByForDimension,
        "100",
        "0",
        timeRange,
      );
    }),
    (data) => {
      const axesMap: Record<string, string[]> = {};
      const totalsMap: Record<
        string,
        V1MetricsViewAggregationResponseDataItem[]
      > = {};

      // Wait for all data to populate
      if (data.some((d) => d?.isFetching)) return { isFetching: true };

      data.forEach((d, i: number) => {
        const dimensionName = dimensions[i];

        axesMap[dimensionName] = (d?.data?.data || [])?.map(
          (dimValue) => dimValue[dimensionName] as string,
        );
        totalsMap[dimensionName] = d?.data?.data || [];
      });

      if (Object.values(axesMap).some((d) => !d)) return { isFetching: true };
      return {
        isFetching: false,
        data: axesMap,
        totals: totalsMap,
      };
    },
  );
}

export function getTotalsRowQuery(
  ctx: StateManagers,
  config: PivotDataStoreConfig,
  colDimensionAxes: Record<string, string[]> = {},
) {
  const { colDimensionNames } = config;

  const { time } = config;
  const dimensionBody = colDimensionNames.map((dimension) => {
    if (isTimeDimension(dimension, time.timeDimension)) {
      return {
        name: time.timeDimension,
        timeGrain: getTimeGrainFromDimension(dimension),
        timeZone: time.timeZone,
        alias: dimension,
      };
    } else return { name: dimension };
  });

  const colFilters = colDimensionNames
    .filter((d) => !isTimeDimension(d, time.timeDimension))
    .map((dimension) =>
      createInExpression(dimension, colDimensionAxes[dimension]),
    );

  const mergedFilter = mergeFilters(
    createAndExpression(colFilters),
    config.whereFilter,
  );

  const sortBy = [
    {
      desc: true,
      name: config.measureNames[0],
    },
  ];
  return createPivotAggregationRowQuery(
    ctx,
    config.measureNames,
    dimensionBody,
    mergedFilter,
    config.measureFilter,
    sortBy,
    "1000",
  );
}