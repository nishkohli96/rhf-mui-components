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
import MUIMultiAutocomplete from '@nish1896/mui-components/mui/multi-autocomplete';
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
import type { StrObjOption, CustomComponentIds } from '@/types';
import {
  keepLabelAboveFormField,
  mergeRefs,
  mergeSx,
  resolveRequired
} from '@/utils';

type MultiAutoCompleteProps<
  Option extends StrObjOption = StrObjOption,
  DisableClearable extends boolean = false,
  FreeSolo extends boolean = false
> = Omit<
  AutocompleteProps<Option, true, DisableClearable, FreeSolo>,
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

type OnValueChangeProps = {
  newValue: string[];
  selectedOption?: string;
};

export type RHFMultiAutocompleteProps<
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
   * When true, the selected value cannot be cleared from the input.
   * @default false
   */
  disableClearable?: DisableClearable;
  /**
   * When true, the user may type any value not present in `options`.
   *
   * The typed string is stored in RHF state as-is. `selectedOption` in
   * callbacks is of type `(Option | string)[]`.
   *
   * To keep things predictable and type-safe, `freeSolo` is not compatible with
   * `selectAllText` and will hide the "Select All" option.
   */
  freeSolo?: FreeSolo;
  /**
   * Overrides the default multi-autocomplete change handling.
   * Receives the next string array and the option value that triggered the change.
   * Call `rhfOnChange` with the string array that should be stored; else the form value will not be updated.
   *
   * @param rhfOnChange - React Hook Form field change handler for the selected value array.
   * @param newValue - Next selected string value array.
   * @param selectedOption - Option value that triggered the change, or the select-all sentinel.
   */
  customOnChange?: ({
    rhfOnChange,
    newValue,
    selectedOption,
  }: CustomOnChangeProps<OnValueChangeProps, string[]>) => void;
  /**
   * Called after the default multi-autocomplete handler stores the next string array in React Hook Form.
   *
   * ⚠️ Important:
   * This callback is not called when `customOnChange` is used.
   *
   * @param newValue - Next selected string value array.
   * @param selectedOption - Option value that triggered the change, or the select-all sentinel.
   */
  onValueChange?: ({ newValue, selectedOption }: OnValueChangeProps) => void;
  /**
   * Text to display for the "Select All" option.
   */
  selectAllText?: string;
  /**
   * When true, hides the select-all option.
   */
  hideSelectAllOption?: boolean;
  /**
   * Label content shown for the field. Defaults to a label generated from `fieldName`.
   */
  label?: ReactNode;
  /**
   * Custom renderer for an option label.
   */
  renderOptionLabel?: (
    option: Option,
    state: AutocompleteRenderOptionState
  ) => ReactNode;
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
} & MultiAutoCompleteProps<Option, DisableClearable, FreeSolo>;

const RHFMultiAutocompleteInner = forwardRef(function RHFMultiAutocomplete<
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
  DisableClearable extends boolean = false,
  FreeSolo extends boolean = false
>({
  fieldName,
  control,
  registerOptions,
  options,
  labelKey,
  valueKey,
  disableClearable,
  freeSolo,
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
  autoSelect,
  ...otherMultiAutoCompleteProps
}: RHFMultiAutocompleteProps<T, Option, LabelKey, ValueKey, DisableClearable, FreeSolo>,
ref: Ref<HTMLInputElement>) {
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

  const {
    sx: formLabelSx,
    ...otherFormLabelProps
  } = formLabelProps ?? {};
  const {
    sx: formHelperTextSx,
    ...otherFormHelperTextProps
  } = formHelperTextProps ?? {};
  const {
    sx: formControlLabelSx,
    ...otherFormControlLabelProps
  } = formControlLabelProps ?? {};

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
          <MUIMultiAutocomplete
            {...otherMultiAutoCompleteProps}
            fieldName={rhfFieldName}
            ref={mergeRefs(rhfRef, ref)}
            options={options}
            labelKey={labelKey}
            valueKey={valueKey}
            freeSolo={freeSolo}
            disableClearable={disableClearable}
            value={rhfValue}
            onValueChange={({ newValue, selectedOption }) => {
              if (customOnChange) {
                customOnChange({ rhfOnChange, newValue, selectedOption });
                return;
              }
              rhfOnChange(newValue);
              onValueChange?.({ newValue, selectedOption });
            }}
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
            autoHighlight={autoHighlight}
            selectAllText={selectAllText}
            hideSelectAllOption={hideSelectAllOption}
            loading={loading}
            circularProgressProps={circularProgressProps}
            customIds={customIds}
            getOptionDisabled={getOptionDisabled}
            limitTags={limitTags}
            getLimitTagsText={getLimitTagsText}
            autoSelect={autoSelect}
          />
        );
      }}
    />
  );
});

const RHFMultiAutocomplete = RHFMultiAutocompleteInner as <
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
  DisableClearable extends boolean = false,
  FreeSolo extends boolean = false
>(
  props: RHFMultiAutocompleteProps<
    T,
    Option,
    LabelKey,
    ValueKey,
    DisableClearable,
    FreeSolo
  > & {
    ref?: Ref<HTMLInputElement>;
  }
) => JSX.Element;

export default RHFMultiAutocomplete;
