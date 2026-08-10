'use client';

import {
  forwardRef,
  useContext,
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
import type {
  AutocompleteProps,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteValue
} from '@mui/material/Autocomplete';
import MUIAutocomplete from '@nish1896/mui-components/mui/autocomplete';
import type { StrObjOption, CustomComponentIds } from '@nish1896/mui-components/types';
import {
  type FormLabelProps,
  type FormHelperTextProps,
  type AutoCompleteTextFieldProps,
  type MuiChipProps,
  type CircularProgressProps,
  type AutocompleteNewValue,
  type CustomOnChangeProps
} from '@/common';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import {
  keepLabelAboveFormField,
  mergeRefs,
  mergeSx,
  resolveRequired
} from '@/utils';

type OmittedAutocompleteProps<
  Option extends StrObjOption = StrObjOption,
  Multiple extends boolean = false,
  DisableClearable extends boolean = false,
  FreeSolo extends boolean = false
> = Omit<
  AutocompleteProps<Option, Multiple, DisableClearable, FreeSolo>,
  | 'freeSolo'
  | 'multiple'
  | 'fullWidth'
  | 'renderInput'
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
  | 'ref'
>;

type OnValueChangeProps<
  Option,
  Multiple extends boolean,
  DisableClearable extends boolean,
  FreeSolo extends boolean
> = {
  newValue: AutocompleteNewValue<Multiple, DisableClearable>;
  selectedOption: AutocompleteValue<
    Option,
    Multiple,
    DisableClearable,
    FreeSolo
  >;
  event: SyntheticEvent<Element, Event>;
  reason: AutocompleteChangeReason;
  details?: AutocompleteChangeDetails<Option>;
};

export type RHFAutocompleteProps<
  T extends FieldValues,
  Option extends StrObjOption = StrObjOption,
  LabelKey extends Extract<keyof Option, string> = Extract<
    keyof Option,
    string
  >,
  ValueKey extends Extract<keyof Option, string> = Extract<
    keyof Option,
    string
  >,
  Multiple extends boolean = false,
  DisableClearable extends boolean = false,
  FreeSolo extends boolean = false
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
   * A list of options that will be shown in the Autocomplete.
   */
  options: Option[];
  /**
   * Object key used to read the display label from each option.
   */
  labelKey?: LabelKey;
  /**
   * Object key used to derive the stored field value when options are an array of objects.
   */
  valueKey?: ValueKey;
  /**
   * When true, allows selecting multiple values.
   */
  multiple?: Multiple;
  /**
   * When true, the selected value cannot be cleared from the input.
   * @default false
   */
  disableClearable?: DisableClearable;
  /**
   * When true, the user may type any value not present in `options`.
   *
   * The typed string is stored in RHF state as-is. `selectedOption` in
   * callbacks reflects `Option | string` for single selection, or
   * `(Option | string)[]` when `multiple` is true.
   */
  freeSolo?: FreeSolo;
  /**
   * Overrides the default autocomplete change handling.
   * Receives the normalized RHF value plus the raw MUI selected option/value for the change.
   * Call `rhfOnChange` with the string, string array, or `null` value that should be stored; else the form value will not be updated.
   *
   * @param rhfOnChange - React Hook Form field change handler for the stored autocomplete value.
   * @param newValue - Selected value(s) stored in the form: `string[]` when `multiple` is true,
   * otherwise `string`. Includes `null` only when clearing is allowed (`disableClearable` is false).
   * @param selectedOption - Raw MUI selected option/value, including free-solo strings when enabled.
   * @param event - Original MUI Autocomplete change event.
   * @param reason - MUI Autocomplete reason for the change.
   * @param details - Additional MUI Autocomplete change details, when available.
   */
  customOnChange?: ({
    rhfOnChange,
    newValue,
    selectedOption,
    event,
    reason,
    details
  }: CustomOnChangeProps<
    OnValueChangeProps<Option, Multiple, DisableClearable, FreeSolo>,
    AutocompleteNewValue<Multiple, DisableClearable>
  >) => void;
  /**
   * Called after the default autocomplete handler stores the normalized value in React Hook Form.
   *
   * ⚠️ Important:
   * This callback is not called when `customOnChange` is used.
   *
   * @param newValue - Selected value(s) stored in the form: `string[]` when `multiple` is true,
   * otherwise `string`. Includes `null` only when clearing is allowed (`disableClearable` is false).
   * @param selectedOption - Raw MUI selected option/value, including free-solo strings when enabled.
   * @param event - Original MUI Autocomplete change event.
   * @param reason - MUI Autocomplete reason for the change.
   * @param details - Additional MUI Autocomplete change details, when available.
   */
  onValueChange?: ({
    newValue,
    selectedOption,
    event,
    reason,
    details
  }: OnValueChangeProps<Option, Multiple, DisableClearable, FreeSolo>) => void;
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
   * When true, marks the field as required in the UI and accessibility attributes.
   */
  required?: boolean;
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
   * Props forwarded to the `CircularProgress` shown in the input
   * while `loading` is `true`.
   */
  circularProgressProps?: CircularProgressProps;
  /**
   * Props forwarded to chips rendered for selected values.
   */
  ChipProps?: MuiChipProps;
  /**
   * Custom ids for generated field, label, helper text, and error elements.
   */
  customIds?: CustomComponentIds;
} & OmittedAutocompleteProps<Option, Multiple, DisableClearable, FreeSolo>;

const RHFAutocompleteInner = forwardRef(function RHFAutocomplete<
  T extends FieldValues,
  Option extends StrObjOption = StrObjOption,
  LabelKey extends Extract<keyof Option, string> = Extract<
    keyof Option,
    string
  >,
  ValueKey extends Extract<keyof Option, string> = Extract<
    keyof Option,
    string
  >,
  Multiple extends boolean = false,
  DisableClearable extends boolean = false,
  FreeSolo extends boolean = false
>({
  fieldName,
  control,
  registerOptions,
  options,
  labelKey,
  valueKey,
  multiple,
  disableClearable,
  freeSolo,
  autoHighlight,
  customOnChange,
  onValueChange,
  onFocus: muiOnFocus,
  onBlur: muiOnBlur,
  disabled: muiDisabled,
  label,
  showLabelAboveFormField,
  formLabelProps,
  hideLabel,
  required,
  renderError,
  hideErrorMessage,
  helperText,
  formHelperTextProps,
  textFieldProps,
  slotProps,
  ChipProps,
  loading,
  circularProgressProps,
  limitTags,
  customIds,
  autoSelect,
  getLimitTagsText,
  ...otherAutoCompleteProps
}: RHFAutocompleteProps<
  T,
  Option,
  LabelKey,
  ValueKey,
  Multiple,
  DisableClearable,
  FreeSolo
>,
ref: Ref<HTMLInputElement>) {
  const {
    allLabelsAboveFields,
    defaultFormLabelSx,
    defaultFormHelperTextSx
  } = useContext(RHFMuiConfigContext);

  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );
  const isFieldRequired = resolveRequired(required, registerOptions?.required);

  const {
    sx: formLabelSx,
    ...otherFormLabelProps
  } = formLabelProps ?? {};
  const {
    sx: formHelperTextSx,
    ...otherFormHelperTextProps
  } = formHelperTextProps ?? {};

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

        return (
          <MUIAutocomplete
            {...otherAutoCompleteProps}
            fieldName={rhfFieldName}
            ref={mergeRefs(rhfRef, ref)}
            options={options}
            labelKey={labelKey}
            valueKey={valueKey}
            multiple={multiple}
            disableClearable={disableClearable}
            freeSolo={freeSolo}
            autoHighlight={autoHighlight}
            value={rhfValue}
            onValueChange={({ newValue, selectedOption, event, reason, details }) => {
              if (customOnChange) {
                customOnChange({
                  rhfOnChange,
                  newValue,
                  selectedOption,
                  event,
                  reason,
                  details
                });
                return;
              }
              rhfOnChange(newValue);
              onValueChange?.({ newValue, selectedOption, event, reason, details });
            }}
            onFocus={muiOnFocus}
            onBlur={blurEvent => {
              rhfOnBlur();
              muiOnBlur?.(blurEvent);
            }}
            disabled={isDisabled}
            label={label}
            showLabelAboveFormField={isLabelAboveFormField}
            formLabelProps={{
              ...otherFormLabelProps,
              sx: mergeSx(defaultFormLabelSx, formLabelSx)
            }}
            hideLabel={hideLabel}
            required={isFieldRequired}
            errorMessage={fieldStateError?.message?.toString()}
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
            loading={loading}
            circularProgressProps={circularProgressProps}
            limitTags={limitTags}
            autoSelect={autoSelect}
            getLimitTagsText={getLimitTagsText}
            customIds={customIds}
          />
        );
      }}
    />
  );
});

const RHFAutocomplete = RHFAutocompleteInner as <
  T extends FieldValues,
  Option extends StrObjOption = StrObjOption,
  LabelKey extends Extract<keyof Option, string> = Extract<
    keyof Option,
    string
  >,
  ValueKey extends Extract<keyof Option, string> = Extract<
    keyof Option,
    string
  >,
  Multiple extends boolean = false,
  DisableClearable extends boolean = false,
  FreeSolo extends boolean = false
>(
  props: RHFAutocompleteProps<
    T,
    Option,
    LabelKey,
    ValueKey,
    Multiple,
    DisableClearable,
    FreeSolo
  > & {
    ref?: Ref<HTMLInputElement>;
  }
) => JSX.Element;

export default RHFAutocomplete;
