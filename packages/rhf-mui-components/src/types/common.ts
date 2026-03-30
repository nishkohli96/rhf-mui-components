export type TrueOrFalse = true | false;

export type StringArr = string[];

export type StringOrNumber = string | number;

export type StrNumArray = StringOrNumber[];

export type KeyValueOption = Record<string, any>;

export type StrNumObjOption = StringOrNumber | KeyValueOption;

export type SelectValueType = StrNumObjOption | StrNumObjOption[];

export type StrObjOption = string | KeyValueOption;

export type OptionPrimitive = string | number;

/**
 * Generic type representing the possible value types for options
 * used in form components like select, radio group, checkbox group, etc.
 */
export type OptionValue<
  Option,
  ValueKey extends string | undefined
>
  = Option extends OptionPrimitive
    ? Option
    : ValueKey extends keyof Option
      ? Option[ValueKey] extends OptionPrimitive
        ? Option[ValueKey]
        : never
      : never;

export type CustomComponentIds = Partial<{
  field: string;
  label: string;
  helperText: string;
  error: string;
}>;
