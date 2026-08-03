'use client';

import {
  useContext,
  forwardRef,
  type JSX,
  type ReactNode,
  type Ref,
  type SyntheticEvent
} from 'react';
import {
  Controller,
  type FieldError,
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import {
  type AutocompleteProps,
  type AutocompleteChangeDetails,
  type AutocompleteChangeReason
} from '@mui/material/Autocomplete';
import MUICountrySelect, {
  countryList,
  type CountryISO,
  type CountryDetails
} from '@nish1896/mui-components/mui/country-select';
import {
  type FormLabelProps,
  type FormHelperTextProps,
  type AutoCompleteTextFieldProps,
  type MuiChipProps,
  type CustomOnChangeProps,
  type AutocompleteOptionRenderState
} from '@/common';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import type { CustomComponentIds } from '@/types';
import { keepLabelAboveFormField, mergeRefs, mergeSx, useFieldIds } from '@/utils';

type CountrySelectStoredPrimitive = CountryDetails[
  keyof Omit<CountryDetails, 'emoji'>
];

type CountrySelectStoredItem = CountryDetails | CountrySelectStoredPrimitive;

type CountrySelectStoredValue<
  Multiple extends boolean,
  DisableClearable extends boolean
> = [Multiple] extends [true]
  ? CountrySelectStoredItem[]
  : [DisableClearable] extends [true]
    ? CountrySelectStoredItem
    : CountrySelectStoredItem | null;

type OnValueChangeProps<
  Multiple extends boolean,
  DisableClearable extends boolean
> = {
  newValue: CountrySelectStoredValue<Multiple, DisableClearable>;
  event: SyntheticEvent;
  reason: AutocompleteChangeReason;
  details?: AutocompleteChangeDetails<CountryDetails>;
};

type AutoCompleteProps<
  Multiple extends boolean = false,
  DisableClearable extends boolean = false
> = Omit<
  AutocompleteProps<CountryDetails, Multiple, DisableClearable, false>,
  | 'freeSolo'
  | 'multiple'
  | 'fullWidth'
  | 'renderInput'
  | 'renderOption'
  | 'options'
  | 'value'
  | 'defaultValue'
  | 'onChange'
  | 'getOptionLabel'
  | 'isOptionEqualToValue'
  | 'blurOnSelect'
  | 'disableClearable'
  | 'disableCloseOnSelect'
  | 'ChipProps'
  | 'loading'
  | 'ref'
>;

export type RHFCountrySelectProps<
  T extends FieldValues,
  Multiple extends boolean = false,
  DisableClearable extends boolean = false
> = {
  /**
   * Name/path of the React Hook Form field this component controls.
   */
  fieldName: Path<T>;
  /**
   * React Hook Form control object returned by `useForm`.
   */
  control: Control<T>;
  /**
   * Validation rules passed to React Hook Form for this field.
   */
  registerOptions?: RegisterOptions<T, Path<T>>;
  /**
   * List of countries to display in the country selector.
   *
   * Defaults to all countries from `countryList`.
   */
  countries?: CountryDetails[];
  /**
   * When true, allows selecting multiple countries.
   */
  multiple?: Multiple;
  /**
   * List of country ISO codes to pin at the top of the dropdown.
   *
   * Countries are displayed in the same order as provided in this array,
   * followed by the remaining countries sorted in their default order.
   *
   * @example
   * preferredCountries={['US', 'CA', 'IN']}
   */
  preferredCountries?: CountryISO[];
  /**
   * - When `valueKey` is provided, selected value(s) are exposed using the
   *   specified country property.
   * - When `valueKey` is omitted, selected value(s) are exposed as complete
   *   country objects.
   */
  valueKey?: keyof Omit<CountryDetails, 'emoji'>;
  /**
   * Overrides the default country select change handling.
   * Receives the normalized country value plus the raw MUI Autocomplete change metadata.
   * Call `rhfOnChange` with the country value that should be stored; else the form value will not be updated.
   *
   * @param rhfOnChange - React Hook Form field change handler for the stored country value.
   * @param newValue - Normalized country value, or country value array when `multiple` is true.
   * @param event - Original MUI Autocomplete change event.
   * @param reason - MUI Autocomplete reason for the change.
   * @param details - Additional MUI Autocomplete change details, when available.
   */
  customOnChange?: ({
    rhfOnChange,
    newValue,
    event,
    reason,
    details
  }: CustomOnChangeProps<
    OnValueChangeProps<Multiple, DisableClearable>,
    CountrySelectStoredValue<Multiple, DisableClearable>
  >) => void;
  /**
   * Called after the default country select handler stores the normalized country value in React Hook Form.
   *
   * ⚠️ Important:
   * This callback is not called when `customOnChange` is used.
   *
   * @param newValue - Normalized country value, or country value array when `multiple` is true.
   * @param event - Original MUI Autocomplete change event.
   * @param reason - MUI Autocomplete reason for the change.
   * @param details - Additional MUI Autocomplete change details, when available.
   */
  onValueChange?: ({
    newValue,
    event,
    reason,
    details
  }: OnValueChangeProps<Multiple, DisableClearable>) => void;
  /**
   * When true, the selected value cannot be cleared from the input.
   * @default false
   */
  disableClearable?: DisableClearable;
  /**
   * Label content shown for the field. Defaults to a label generated from `fieldName`.
   */
  label?: ReactNode;
  /**
   * When `true`, renders the label above the component instead of within the field layout.
   */
  showLabelAboveFormField?: boolean;
  /**
   * Props forwarded to the internal `FormLabel`. The `id` is managed by the component.
   */
  formLabelProps?: Omit<FormLabelProps, 'id'>;
  /**
   * When true, hides the rendered field label while preserving accessible labeling where possible.
   */
  hideLabel?: boolean;
  /**
   * Customize how each country option is displayed in the dropdown menu.
   * `state` carries MUI's option state (`selected`, `index`, `inputValue`) plus
   * a `disabled` flag, so the label can react to the option's status.
   */
  renderOptionLabel?: (
    option: CountryDetails,
    state: AutocompleteOptionRenderState
  ) => ReactNode;
  /**
   * When true, marks the field as required in the UI and accessibility attributes.
   */
  required?: boolean;
  /**
   * @deprecated
   * Field error message is now automatically derived from form state.
   * Passing this prop is no longer necessary and it will be removed in the next major version.
   *
   * Use `renderError` to customize how the field error is rendered.
   */
  errorMessage?: ReactNode;
  /**
   * Custom renderer for the React Hook Form field error.
   * Receives the current field error and must return renderable content, such as `error.message` or a custom element.
   *
   * @param error - React Hook Form field error for this field.
   */
  renderError?: (error: FieldError) => ReactNode;
  /**
   * If true, hides the error message text while keeping the field in an error state.
   */
  hideErrorMessage?: boolean;
  /**
   * Helper text shown below the field when there is no visible validation error.
   */
  helperText?: ReactNode;
  /**
   * Props forwarded to the internal `FormHelperText`. The `id` is managed by the component.
   */
  formHelperTextProps?: Omit<FormHelperTextProps, 'id'>;
  /**
   * Props forwarded to the internal MUI `TextField`.
   */
  textFieldProps?: AutoCompleteTextFieldProps;
  /**
   * Props forwarded to chips rendered for selected values.
   */
  ChipProps?: MuiChipProps;
  /**
   * Custom ids for generated field, label, helper text, and error elements.
   */
  customIds?: CustomComponentIds;
} & AutoCompleteProps<Multiple, DisableClearable>;

const RHFCountrySelectInner = forwardRef(function RHFCountrySelect<
  T extends FieldValues,
  Multiple extends boolean = false,
  DisableClearable extends boolean = false
>({
  fieldName,
  control,
  registerOptions,
  countries,
  preferredCountries,
  valueKey,
  disabled: muiDisabled,
  autoHighlight,
  customOnChange,
  onValueChange,
  onBlur: muiOnBlur,
  label,
  showLabelAboveFormField,
  formLabelProps,
  hideLabel,
  renderOptionLabel,
  required,
  errorMessage,
  renderError,
  hideErrorMessage,
  helperText,
  formHelperTextProps,
  multiple,
  textFieldProps,
  slotProps,
  ChipProps,
  disableClearable,
  customIds,
  limitTags,
  getLimitTagsText,
  getOptionKey,
  ...otherCountrySelectProps
}: RHFCountrySelectProps<T, Multiple, DisableClearable>,
ref: Ref<HTMLInputElement>) {
  const {
    allLabelsAboveFields,
    defaultFormLabelSx,
    defaultFormHelperTextSx
  } = useContext(RHFMuiConfigContext);
  const { fieldId, labelId, helperTextId, errorId } = useFieldIds(
    fieldName,
    customIds
  );
  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );
  const { sx: formLabelSx, ...otherFormLabelProps } = formLabelProps ?? {};
  const { sx: formHelperTextSx, ...otherFormHelperTextProps }
    = formHelperTextProps ?? {};

  return (
    <Controller
      name={fieldName}
      control={control}
      rules={registerOptions}
      render={({
        field: {
          name: rhfFieldName,
          ref: rhfRef,
          value: rhfValue,
          onChange: rhfOnChange,
          onBlur: rhfOnBlur,
          disabled: rhfDisabled
        },
        fieldState: { error: fieldStateError }
      }) => {
        const isDisabled = muiDisabled || rhfDisabled;
        const fieldErrorMessage = typeof errorMessage === 'string'
          ? errorMessage
          : fieldStateError?.message?.toString();

        return (
          <MUICountrySelect
            {...otherCountrySelectProps}
            fieldName={rhfFieldName}
            ref={mergeRefs(rhfRef, ref)}
            countries={countries}
            preferredCountries={preferredCountries}
            valueKey={valueKey}
            multiple={multiple}
            disableClearable={disableClearable}
            value={rhfValue}
            onValueChange={({ newValue, event, reason, details }) => {
              if (customOnChange) {
                customOnChange({ rhfOnChange, newValue, event, reason, details });
                return;
              }
              rhfOnChange(newValue);
              onValueChange?.({ newValue, event, reason, details });
            }}
            onBlur={blurEvent => {
              rhfOnBlur();
              muiOnBlur?.(blurEvent);
            }}
            disabled={isDisabled}
            autoHighlight={autoHighlight}
            label={label}
            showLabelAboveFormField={isLabelAboveFormField}
            formLabelProps={{
              ...otherFormLabelProps,
              sx: mergeSx(defaultFormLabelSx, formLabelSx)
            }}
            hideLabel={hideLabel}
            renderOptionLabel={renderOptionLabel}
            required={required}
            errorMessage={fieldErrorMessage}
            renderError={() => fieldStateError
              ? renderError?.(fieldStateError)
              : undefined}
            hideErrorMessage={hideErrorMessage}
            helperText={helperText}
            formHelperTextProps={{
              ...otherFormHelperTextProps,
              sx: mergeSx(defaultFormHelperTextSx, formHelperTextSx)
            }}
            textFieldProps={textFieldProps}
            slotProps={slotProps}
            ChipProps={ChipProps}
            limitTags={limitTags}
            getLimitTagsText={getLimitTagsText}
            getOptionKey={getOptionKey}
            customIds={{
              field: fieldId,
              label: labelId,
              helperText: helperTextId,
              error: errorId
            }}
          />
        );
      }}
    />
  );
});

const RHFCountrySelect = RHFCountrySelectInner as <
  T extends FieldValues,
  Multiple extends boolean = false,
  DisableClearable extends boolean = false
>(
  props: RHFCountrySelectProps<T, Multiple, DisableClearable> & {
    ref?: Ref<HTMLInputElement>;
  }
) => JSX.Element;

export type { CountryISO, CountryDetails };
export { countryList };
export default RHFCountrySelect;
