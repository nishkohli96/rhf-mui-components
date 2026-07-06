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

export type CustomOnChangeProps<T, V> = T & {
  rhfOnChange: (value: V) => void;
};

/**
 * RHF field value for Autocomplete components mirrors
 * MUI `AutocompleteValue<string, Multiple, DisableClearable, false>` for primitives.
 * Tuple checks avoid distributive `boolean` breaking the conditional.
 */
export type AutocompleteNewValue<
  Multiple extends boolean,
  DisableClearable extends boolean
> = [Multiple] extends [true]
  ? [DisableClearable] extends [true]
    ? string[]
    : string[] | null
  : [DisableClearable] extends [true]
    ? string
    : string | null;
