'use client';

import {
  useContext,
  forwardRef,
  type JSX,
  type ReactNode,
  type Ref
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
  type AutocompleteRenderOptionState,
  type AutocompleteProps
} from '@mui/material/Autocomplete';
import MUIMultiAutocompleteObject from '@nish1896/mui-components/mui/multi-autocomplete-object';
import { type selectAllOptionValue } from '@nish1896/mui-components/mui';
import {
  type FormLabelProps,
  type FormControlLabelProps,
  type CheckboxProps,
  type FormHelperTextProps,
  type AutoCompleteTextFieldProps,
  type MuiChipProps,
  type CircularProgressProps,
  type CustomOnChangeProps
} from '@/common';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import type { KeyValueOption, CustomComponentIds } from '@/types';
import {
  keepLabelAboveFormField,
  mergeSx,
  mergeRefs,
  resolveRequired
} from '@/utils';

type MultiAutoCompleteProps<
  Option extends KeyValueOption = KeyValueOption,
  DisableClearable extends boolean = false
> = Omit<
  AutocompleteProps<Option, true, DisableClearable, false>,
  | 'freeSolo'
  | 'fullWidth'
  | 'renderInput'
  | 'renderOption'
  | 'options'
  | 'value'
  | 'defaultValue'
  | 'multiple'
  | 'onChange'
  | 'getOptionKey'
  | 'getOptionLabel'
  | 'isOptionEqualToValue'
  | 'blurOnSelect'
  | 'disableClearable'
  | 'disableCloseOnSelect'
  | 'ChipProps'
  | 'ref'
>;

type OnValueChangeProps<Option extends KeyValueOption = KeyValueOption> = {
  newValue: Option[];
  selectedOption?: Option | typeof selectAllOptionValue;
};

export type RHFMultiAutocompleteObjectProps<
  T extends FieldValues,
  Option extends KeyValueOption = KeyValueOption,
  LabelKey extends Extract<keyof Option, string> = Extract<
    keyof Option,
    string
  >,
  ValueKey extends Extract<keyof Option, string> = Extract<
    keyof Option,
    string
  >,
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
   * An array of options displayed in the autocomplete dropdown for multiple selection.
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
   * Text to display for the "Select All" option.
   */
  selectAllText?: string;
  /**
   * When true, hides the select-all option.
   */
  hideSelectAllOption?: boolean;
  /**
   * Overrides the default object multi-autocomplete change handling.
   * Receives the next selected object array and the option that triggered the change.
   * Call `rhfOnChange` with the object array that should be stored; else the form value will not be updated.
   *
   * @param rhfOnChange - React Hook Form field change handler for the selected object array.
   * @param newValue - Next selected option object array.
   * @param selectedOption - Option object that triggered the change, or the select-all sentinel.
   */
  customOnChange?: ({
    rhfOnChange,
    newValue,
    selectedOption
  }: CustomOnChangeProps<OnValueChangeProps<Option>, Option[]>) => void;
  /**
   * Called after the default object multi-autocomplete handler stores the next selected object array in React Hook Form.
   *
   * ⚠️ Important:
   * This callback is not called when `customOnChange` is used.
   *
   * @param newValue - Next selected option object array.
   * @param selectedOption - Option object that triggered the change, or the select-all sentinel.
   */
  onValueChange?: ({ newValue, selectedOption }: OnValueChangeProps<Option>) => void;
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
   * Props forwarded to each internal MUI `Checkbox`.
   */
  checkboxProps?: CheckboxProps;
  /**
   * Custom renderer for an option label.
   */
  renderOptionLabel?: (
    option: Option,
    state: AutocompleteRenderOptionState
  ) => ReactNode;
  /**
   * Props forwarded to each internal MUI `FormControlLabel`.
   */
  formControlLabelProps?: FormControlLabelProps;
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
} & MultiAutoCompleteProps<Option, DisableClearable>;

const RHFMultiAutocompleteObjectInner = forwardRef(function RHFMultiAutocompleteObject<
  T extends FieldValues,
  Option extends KeyValueOption = KeyValueOption,
  LabelKey extends Extract<keyof Option, string> = Extract<
    keyof Option,
    string
  >,
  ValueKey extends Extract<keyof Option, string> = Extract<
    keyof Option,
    string
  >,
  DisableClearable extends boolean = false
>({
  fieldName,
  control,
  registerOptions,
  options,
  labelKey,
  valueKey,
  disableClearable,
  autoHighlight,
  selectAllText,
  hideSelectAllOption,
  customOnChange,
  onValueChange,
  onBlur: muiOnBlur,
  disabled: muiDisabled,
  label,
  showLabelAboveFormField,
  formLabelProps,
  hideLabel,
  checkboxProps,
  renderOptionLabel,
  formControlLabelProps,
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
  customIds,
  getOptionDisabled,
  limitTags,
  getLimitTagsText,
  ...otherMultiAutocompleteObjectProps
}: RHFMultiAutocompleteObjectProps<T, Option, LabelKey, ValueKey, DisableClearable>,
ref: Ref<HTMLInputElement>): JSX.Element {
  const {
    allLabelsAboveFields,
    defaultFormLabelSx,
    defaultFormHelperTextSx,
    defaultFormControlLabelSx
  } = useContext(RHFMuiConfigContext);

  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );
  const isFieldRequired = resolveRequired(required, registerOptions?.required);

  const { sx: formLabelSx, ...otherFormLabelProps } = formLabelProps ?? {};
  const { sx: formHelperTextSx, ...otherFormHelperTextProps }
    = formHelperTextProps ?? {};
  const { sx: formControlLabelSx, ...otherFormControlLabelProps }
    = formControlLabelProps ?? {};

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
          <MUIMultiAutocompleteObject
            {...otherMultiAutocompleteObjectProps}
            fieldName={rhfFieldName}
            ref={mergeRefs(rhfRef, ref)}
            options={options}
            labelKey={labelKey}
            valueKey={valueKey}
            disableClearable={disableClearable}
            autoHighlight={autoHighlight}
            selectAllText={selectAllText}
            hideSelectAllOption={hideSelectAllOption}
            value={(rhfValue ?? [])}
            onValueChange={({ newValue, selectedOption }) => {
              if (customOnChange) {
                customOnChange({ rhfOnChange, newValue, selectedOption });
                return;
              }
              rhfOnChange(newValue);
              onValueChange?.({ newValue, selectedOption });
            }}
            disabled={isDisabled}
            label={label}
            showLabelAboveFormField={isLabelAboveFormField}
            formLabelProps={{
              ...otherFormLabelProps,
              sx: mergeSx(defaultFormLabelSx, formLabelSx)
            }}
            hideLabel={hideLabel}
            checkboxProps={checkboxProps}
            renderOptionLabel={renderOptionLabel}
            formControlLabelProps={{
              ...otherFormControlLabelProps,
              sx: mergeSx(defaultFormControlLabelSx, formControlLabelSx)
            }}
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
            onBlur={blurEvent => {
              rhfOnBlur();
              muiOnBlur?.(blurEvent);
            }}
            loading={loading}
            circularProgressProps={circularProgressProps}
            customIds={customIds}
            getOptionDisabled={getOptionDisabled}
            limitTags={limitTags}
            getLimitTagsText={getLimitTagsText}
          />
        );
      }}
    />
  );
});

const RHFMultiAutocompleteObject = RHFMultiAutocompleteObjectInner as <
  T extends FieldValues,
  Option extends KeyValueOption = KeyValueOption,
  LabelKey extends Extract<keyof Option, string> = Extract<
    keyof Option,
    string
  >,
  ValueKey extends Extract<keyof Option, string> = Extract<
    keyof Option,
    string
  >,
  DisableClearable extends boolean = false
>(
  props: RHFMultiAutocompleteObjectProps<
    T,
    Option,
    LabelKey,
    ValueKey,
    DisableClearable
  > & {
    ref?: Ref<HTMLInputElement>;
  }
) => JSX.Element;

export default RHFMultiAutocompleteObject;
