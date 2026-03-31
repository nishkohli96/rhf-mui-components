/**
 * Default value for the `autoComplete` prop in MUI input
 * components to disable browser autocomplete and autofill.
 * Let the developer override this value by passing their own
 * `autoComplete` prop to the TextField component.
 */
export const defaultAutocompleteValue = 'off';

/**
 * Default value for the select all option in RHFMultiAutocomplete
 * and RHFMultiAutocompleteObject components.
 */
export const selectAllOptionValue = '__ALL__';

/**
 * Threshold for the maximum umber of options to use MUI Select for.
 * If the number of options exceeds this threshold, advise the developer
 * to use `RHFAutocomplete` or `RHFMuiAutocomplete` instead.
 */
export const MUISELECT_OPTIONS_THRESHOLD = 40;
