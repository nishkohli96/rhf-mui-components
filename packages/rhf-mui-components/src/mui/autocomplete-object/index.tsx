'use client';

import {
  useCallback,
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
import Autocomplete,
{
  type AutocompleteProps,
  type AutocompleteChangeDetails,
  type AutocompleteChangeReason,
  type AutocompleteValue
} from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import {
  FormControl,
  FormLabel,
  FormLabelText,
  FormHelperText,
  defaultAutocompleteValue,
  type FormLabelProps,
  type FormHelperTextProps,
  type AutoCompleteTextFieldProps,
  type MuiChipProps,
  type CustomOnChangeProps
} from '@/common';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import type { KeyValueOption, CustomComponentIds } from '@/types';
import {
  fieldNameToLabel,
  useFieldIds,
  keepLabelAboveFormField,
  mergeRefs
} from '@/utils';

type OmittedAutocompleteProps<
  Option extends KeyValueOption = KeyValueOption,
  Multiple extends boolean = false,
  DisableClearable extends boolean = false
> = Omit<
  AutocompleteProps<Option, Multiple, DisableClearable, false>,
  | 'freeSolo'
  | 'multiple'
  | 'fullWidth'
  | 'renderInput'
  | 'options'
  | 'value'
  | 'defaultValue'
  | 'onChange'
  | 'getOptionKey'
  | 'getOptionLabel'
  | 'isOptionEqualToValue'
  | 'blurOnSelect'
  | 'disableCloseOnSelect'
  | 'ChipProps'
  | 'ref'
  | 'disableClearable'
>;

type OnValueChangeProps<
  Option extends KeyValueOption = KeyValueOption,
  Multiple extends boolean = false,
  DisableClearable extends boolean = false
> = {
  newValue: AutocompleteValue<Option, Multiple, DisableClearable, false>;
  event: SyntheticEvent<Element, Event>;
  reason: AutocompleteChangeReason;
  details?: AutocompleteChangeDetails<Option>;
};

export type RHFAutocompleteObjectProps<
  T extends FieldValues,
  Option extends KeyValueOption = KeyValueOption,
  LabelKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
  ValueKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
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
   * Options rendered by the field.
   */
  options: Option[];
  /**
   * When true, allows selecting multiple values.
   */
  multiple?: Multiple;
  /**
   * Object key used to read the display label from each option.
   */
  labelKey: LabelKey;
  /**
   * Object key used to derive the stored field value when options are an array of objects.
   */
  valueKey: ValueKey;
  /**
   * Overrides the default object autocomplete change handling.
   * Receives the selected object value from MUI without reducing it to `valueKey`.
   * Call `rhfOnChange` with the object, object array, or `null` value that should be stored; else the form value will not be updated.
   *
   * @param rhfOnChange - React Hook Form field change handler for the selected object value.
   * @param newValue - Selected value(s) stored in the form: `object[]` when `multiple` is true, otherwise `object`.
   * Includes `null` only when clearing is allowed (`disableClearable` is false).
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
    OnValueChangeProps<Option, Multiple, DisableClearable>,
    AutocompleteValue<Option, Multiple, DisableClearable, false>
  >) => void;
  /**
   * Called after the default object autocomplete handler stores the selected object value in React Hook Form.
   *
   * ⚠️ Important:
   * This callback is not called when `customOnChange` is used.
   *
   * @param newValue - Selected value(s) stored in the form: `object[]` when `multiple` is true, otherwise `object`.
   * Includes `null` only when clearing is allowed (`disableClearable` is false).
   * @param event - Original MUI Autocomplete change event.
   * @param reason - MUI Autocomplete reason for the change.
   * @param details - Additional MUI Autocomplete change details, when available.
   */
  onValueChange?: ({
    newValue,
    event,
    reason,
    details
  }: OnValueChangeProps<Option, Multiple, DisableClearable>) => void;
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
   * When true, renders the field label above the form field instead of inside or beside it.
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
   * Helper text shown below the field when there is no visible validation error.
   */
  helperText?: ReactNode;
  /**
   * If true, hides the error message text while keeping the field in an error state.
   */
  hideErrorMessage?: boolean;
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
} & OmittedAutocompleteProps<Option, Multiple, DisableClearable>;

const RHFAutocompleteObjectInner = forwardRef(function RHFAutocompleteObject<
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
  Multiple extends boolean = false,
  DisableClearable extends boolean = false
>(
  {
    fieldName,
    control,
    registerOptions,
    options,
    multiple,
    labelKey,
    valueKey,
    disableClearable,
    autoHighlight = true,
    customOnChange,
    onValueChange,
    disabled: muiDisabled,
    label,
    showLabelAboveFormField,
    formLabelProps,
    hideLabel,
    required,
    errorMessage,
    renderError,
    hideErrorMessage,
    helperText,
    formHelperTextProps,
    textFieldProps,
    slotProps,
    ChipProps,
    onBlur: muiOnBlur,
    onFocus,
    loading,
    limitTags = 2,
    getLimitTagsText,
    customIds,
    ...otherAutocompleteObjectProps
  }: RHFAutocompleteObjectProps<
    T,
    Option,
    LabelKey,
    ValueKey,
    Multiple,
    DisableClearable
  >,
  ref: Ref<HTMLInputElement>
) {
  const { allLabelsAboveFields } = useContext(RHFMuiConfigContext);

  const { fieldId, labelId, helperTextId, errorId } = useFieldIds(
    fieldName,
    customIds
  );

  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );
  const defaultFieldLabel = fieldNameToLabel(fieldName);
  const fieldLabel = label ?? defaultFieldLabel;
  const accessibleFieldLabel = typeof fieldLabel === 'string'
    ? fieldLabel
    : defaultFieldLabel;

  const renderOptionLabel = useCallback(
    (option: Option): string => String(option[labelKey]),
    [labelKey]
  );

  return (
    <Controller
      name={fieldName}
      control={control}
      rules={registerOptions}
      render={({
        field: {
          name: rhfFieldName,
          value: rhfValue,
          onChange: rhfOnChange,
          onBlur: rhfOnBlur,
          ref: rhfRef,
          disabled: rhfDisabled
        },
        fieldState: { error: fieldStateError }
      }) => {
        const isDisabled = muiDisabled || rhfDisabled;
        const fieldErrorMessage = fieldStateError
          ? (renderError?.(fieldStateError) ?? errorMessage ?? fieldStateError.message?.toString())
          : undefined;
        const isError = !!fieldErrorMessage;
        const showHelperTextElement = !!(
          helperText
          || (isError && !hideErrorMessage)
        );
        return (
          <FormControl error={isError} disabled={isDisabled}>
            {!hideLabel && (
              <FormLabel
                label={fieldLabel}
                isVisible={isLabelAboveFormField}
                required={required}
                error={isError}
                disabled={isDisabled}
                formLabelProps={{
                  ...formLabelProps,
                  id: labelId,
                  htmlFor: fieldId
                }}
              />
            )}
            <Autocomplete
              {...otherAutocompleteObjectProps}
              id={fieldId}
              options={options}
              multiple={multiple}
              value={
                (rhfValue ?? (multiple ? [] : null)) as AutocompleteValue<
                  Option,
                  Multiple,
                  DisableClearable,
                  false
                >
              }
              disabled={isDisabled}
              onChange={(
                event,
                newValue,
                reason: AutocompleteChangeReason,
                details?: AutocompleteChangeDetails<Option>
              ) => {
                const fieldValue = newValue;
                if (customOnChange) {
                  customOnChange({
                    rhfOnChange,
                    newValue: fieldValue,
                    event,
                    reason,
                    details
                  });
                  return;
                }
                rhfOnChange(newValue);
                onValueChange?.({
                  newValue: fieldValue,
                  event,
                  reason,
                  details
                });
              }}
              onFocus={onFocus}
              onBlur={blurEvent => {
                rhfOnBlur();
                muiOnBlur?.(blurEvent);
              }}
              getOptionLabel={option => renderOptionLabel(option)}
              isOptionEqualToValue={(option, value) =>
                option[valueKey] === value?.[valueKey]}
              renderInput={params => {
                const {
                  InputProps,
                  inputProps,
                  disabled: paramsDisabled,
                  ...otherInputParams
                } = params ?? {};
                const {
                  autoComplete = defaultAutocompleteValue,
                  ...otherTextFieldProps
                } = textFieldProps ?? {};
                const textFieldInputProps = {
                  ...inputProps,
                  'aria-required': required,
                  'aria-invalid': isError,
                  'aria-labelledby': !hideLabel && isLabelAboveFormField
                    ? labelId
                    : undefined,
                  'aria-label': hideLabel ? accessibleFieldLabel : undefined,
                  'aria-describedby': showHelperTextElement
                    ? isError
                      ? errorId
                      : helperTextId
                    : undefined,
                  autoComplete
                };
                return (
                  <TextField
                    name={rhfFieldName}
                    inputRef={mergeRefs(rhfRef, ref)}
                    disabled={paramsDisabled}
                    {...otherTextFieldProps}
                    {...otherInputParams}
                    label={
                      !isLabelAboveFormField
                        ? (
                          <FormLabelText label={fieldLabel} required={required} />
                        )
                        : undefined
                    }
                    error={isError}
                    slotProps={{
                      ...textFieldProps?.slotProps,
                      input: {
                        ...InputProps,
                        ...textFieldProps?.slotProps?.input,
                        endAdornment: (
                          <>
                            {loading && (
                              <CircularProgress color="inherit" size={20} />
                            )}
                            {InputProps?.endAdornment}
                          </>
                        )
                      },
                      htmlInput: textFieldInputProps
                    }}
                  />
                );
              }}
              autoHighlight={autoHighlight}
              blurOnSelect={!multiple}
              disableCloseOnSelect={multiple}
              disableClearable={disableClearable}
              fullWidth
              loading={loading}
              limitTags={limitTags}
              freeSolo={false}
              getLimitTagsText={more => getLimitTagsText?.(more) ?? `+${more} More`}
              slotProps={{
                ...slotProps,
                chip: ChipProps
              }}
            />
            <FormHelperText
              error={isError}
              errorMessage={fieldErrorMessage}
              hideErrorMessage={hideErrorMessage}
              helperText={helperText}
              showHelperTextElement={showHelperTextElement}
              formHelperTextProps={{
                ...formHelperTextProps,
                id: isError ? errorId : helperTextId
              }}
            />
          </FormControl>
        );
      }}
    />
  );
});

/**
 * The component is designed to store complete option object(s) in form state.
 *
 * `freeSolo` is not supported in `RHFAutocompleteObject` as it would introduce
 * string values alongside objects (`Option | string`), making the field value
 * less predictable and type-safe.
 *
 * Use `RHFAutocomplete` instead when `freeSolo` behavior is required.
 */
const RHFAutocompleteObject = RHFAutocompleteObjectInner as <
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
  Multiple extends boolean = false,
  DisableClearable extends boolean = false
>(
  props: RHFAutocompleteObjectProps<
    T,
    Option,
    LabelKey,
    ValueKey,
    Multiple,
    DisableClearable
  > & {
    ref?: Ref<HTMLInputElement>;
  }
) => JSX.Element;

export default RHFAutocompleteObject;
