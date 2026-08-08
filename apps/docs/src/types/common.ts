export type OptionalString = string | undefined;
export type NullishString = string | null;
export type NullishOptionalString = NullishString | undefined;

export type JsonPrimitive = string | number | boolean | null;
export type JsonArray = JsonValue[];
export type JsonObject = { [key: string]: JsonValue };
export type JsonValue = JsonPrimitive | JsonObject | JsonArray | undefined;
