// @generated by protoc-gen-es v1.9.0 with parameter "target=ts"
// @generated from file rill/local/v1/api.proto (package rill.local.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3, Timestamp } from "@bufbuild/protobuf";

/**
 * @generated from message rill.local.v1.PingRequest
 */
export class PingRequest extends Message<PingRequest> {
  constructor(data?: PartialMessage<PingRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "rill.local.v1.PingRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PingRequest {
    return new PingRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PingRequest {
    return new PingRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): PingRequest {
    return new PingRequest().fromJsonString(jsonString, options);
  }

  static equals(a: PingRequest | PlainMessage<PingRequest> | undefined, b: PingRequest | PlainMessage<PingRequest> | undefined): boolean {
    return proto3.util.equals(PingRequest, a, b);
  }
}

/**
 * @generated from message rill.local.v1.PingResponse
 */
export class PingResponse extends Message<PingResponse> {
  /**
   * @generated from field: google.protobuf.Timestamp time = 1;
   */
  time?: Timestamp;

  constructor(data?: PartialMessage<PingResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "rill.local.v1.PingResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "time", kind: "message", T: Timestamp },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PingResponse {
    return new PingResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PingResponse {
    return new PingResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): PingResponse {
    return new PingResponse().fromJsonString(jsonString, options);
  }

  static equals(a: PingResponse | PlainMessage<PingResponse> | undefined, b: PingResponse | PlainMessage<PingResponse> | undefined): boolean {
    return proto3.util.equals(PingResponse, a, b);
  }
}

/**
 * @generated from message rill.local.v1.GetMetadataRequest
 */
export class GetMetadataRequest extends Message<GetMetadataRequest> {
  constructor(data?: PartialMessage<GetMetadataRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "rill.local.v1.GetMetadataRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetMetadataRequest {
    return new GetMetadataRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetMetadataRequest {
    return new GetMetadataRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetMetadataRequest {
    return new GetMetadataRequest().fromJsonString(jsonString, options);
  }

  static equals(a: GetMetadataRequest | PlainMessage<GetMetadataRequest> | undefined, b: GetMetadataRequest | PlainMessage<GetMetadataRequest> | undefined): boolean {
    return proto3.util.equals(GetMetadataRequest, a, b);
  }
}

/**
 * @generated from message rill.local.v1.GetMetadataResponse
 */
export class GetMetadataResponse extends Message<GetMetadataResponse> {
  /**
   * @generated from field: string instance_id = 1;
   */
  instanceId = "";

  /**
   * @generated from field: string project_path = 2;
   */
  projectPath = "";

  /**
   * @generated from field: string install_id = 3;
   */
  installId = "";

  /**
   * @generated from field: string user_id = 4;
   */
  userId = "";

  /**
   * @generated from field: string version = 5;
   */
  version = "";

  /**
   * @generated from field: string build_commit = 6;
   */
  buildCommit = "";

  /**
   * @generated from field: string build_time = 7;
   */
  buildTime = "";

  /**
   * @generated from field: bool is_dev = 8;
   */
  isDev = false;

  /**
   * @generated from field: bool analytics_enabled = 9;
   */
  analyticsEnabled = false;

  /**
   * @generated from field: bool readonly = 10;
   */
  readonly = false;

  /**
   * @generated from field: int32 grpc_port = 11;
   */
  grpcPort = 0;

  constructor(data?: PartialMessage<GetMetadataResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "rill.local.v1.GetMetadataResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "instance_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "project_path", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "install_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "user_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "version", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "build_commit", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 7, name: "build_time", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 8, name: "is_dev", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 9, name: "analytics_enabled", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 10, name: "readonly", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 11, name: "grpc_port", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetMetadataResponse {
    return new GetMetadataResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetMetadataResponse {
    return new GetMetadataResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetMetadataResponse {
    return new GetMetadataResponse().fromJsonString(jsonString, options);
  }

  static equals(a: GetMetadataResponse | PlainMessage<GetMetadataResponse> | undefined, b: GetMetadataResponse | PlainMessage<GetMetadataResponse> | undefined): boolean {
    return proto3.util.equals(GetMetadataResponse, a, b);
  }
}

/**
 * @generated from message rill.local.v1.GetVersionRequest
 */
export class GetVersionRequest extends Message<GetVersionRequest> {
  constructor(data?: PartialMessage<GetVersionRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "rill.local.v1.GetVersionRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetVersionRequest {
    return new GetVersionRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetVersionRequest {
    return new GetVersionRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetVersionRequest {
    return new GetVersionRequest().fromJsonString(jsonString, options);
  }

  static equals(a: GetVersionRequest | PlainMessage<GetVersionRequest> | undefined, b: GetVersionRequest | PlainMessage<GetVersionRequest> | undefined): boolean {
    return proto3.util.equals(GetVersionRequest, a, b);
  }
}

/**
 * @generated from message rill.local.v1.GetVersionResponse
 */
export class GetVersionResponse extends Message<GetVersionResponse> {
  /**
   * @generated from field: string current = 1;
   */
  current = "";

  /**
   * @generated from field: string latest = 2;
   */
  latest = "";

  constructor(data?: PartialMessage<GetVersionResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "rill.local.v1.GetVersionResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "current", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "latest", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetVersionResponse {
    return new GetVersionResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetVersionResponse {
    return new GetVersionResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetVersionResponse {
    return new GetVersionResponse().fromJsonString(jsonString, options);
  }

  static equals(a: GetVersionResponse | PlainMessage<GetVersionResponse> | undefined, b: GetVersionResponse | PlainMessage<GetVersionResponse> | undefined): boolean {
    return proto3.util.equals(GetVersionResponse, a, b);
  }
}
