import type { AutocompleteRenderOptionState } from '@mui/material/Autocomplete';

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

export type CustomOnChangeProps<T, V> = T & {
  rhfOnChange: (value: V) => void;
};

/**
 * Per-option state handed to `renderOptionLabel` so custom labels can react to
 * the option's current status — e.g. dim a disabled option or emphasise the
 * selected one.
 *
 * Used by the form-control option components (radio group, checkbox group,
 * select). The Autocomplete family passes MUI's `AutocompleteRenderOptionState`
 * intersected with `disabled`, which is a superset of this shape, so the
 * `{ disabled, selected }` core is consistent everywhere.
 */
export type OptionRenderState = {
  /**
   * Whether the option is currently non-interactive — either the whole field is
   * disabled or the option was disabled via `getOptionDisabled`.
   */
  disabled: boolean;
  /** Whether the option is part of the current selection. */
  selected: boolean;
};

/**
 * Per-option state for `renderOptionLabel` in the Autocomplete family
 * (country select, multi autocomplete). Extends MUI's option state — which
 * already carries `selected`, `index` and `inputValue` for the filtered
 * dropdown — with the shared `disabled` flag, so the `{ disabled, selected }`
 * core matches the form-control components' `OptionRenderState`.
 */
export type AutocompleteOptionRenderState
  = AutocompleteRenderOptionState & Pick<OptionRenderState, 'disabled'>;
