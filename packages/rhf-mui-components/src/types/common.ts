export type StringOrNumber = string | number;

export type KeyValueOption = Record<string, any>;

export type StrNumObjOption = StringOrNumber | KeyValueOption;

export type StrObjOption = string | KeyValueOption;

export type CustomComponentIds = Partial<{
  field: string;
  label: string;
  helperText: string;
  error: string;
}>;
