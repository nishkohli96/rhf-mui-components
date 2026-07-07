'use client';

import {
  useCallback,
  useContext,
  useMemo,
  forwardRef,
  type JSX,
  type Ref,
  type ReactNode,
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
  type AutocompleteNewValue,
  type CustomOnChangeProps
} from '@/common';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import type { StrObjOption, CustomComponentIds } from '@/types';
import {
  fieldNameToLabel,
  isKeyValueOption,
  useFieldIds,
  keepLabelAboveFormField,
  mergeRefs
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
  | 'getOptionKey'
  | 'getOptionLabel'
  | 'isOptionEqualToValue'
  | 'blurOnSelect'
  | 'disableClearable'
  | 'disableCloseOnSelect'
  | 'ChipProps'
  | 'ref'
>;

type AutocompleteFieldValue<
  Option,
  Multiple extends boolean,
  DisableClearable extends boolean,
  FreeSolo extends boolean
> = AutocompleteValue<Option, Multiple, DisableClearable, FreeSolo>;

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
   * Options rendered by the field.
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
>(
  {
    fieldName,
    control,
    registerOptions,
    options,
    labelKey,
    valueKey,
    multiple,
    disableClearable,
    freeSolo,
    autoHighlight = true,
    onValueChange,
    customOnChange,
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
    onBlur,
    onFocus,
    loading,
    limitTags = 2,
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

  const optionsMap = useMemo(() => {
    if (!valueKey) {
      return null;
    }

    const map = new Map<Option[ValueKey], Option>();
    for (const option of options) {
      if (isKeyValueOption(option, labelKey, valueKey)) {
        map.set(option[valueKey], option);
      }
    }
    return map;
  }, [options, valueKey, labelKey]);

  const renderOptionLabel = useCallback(
    (option: Option | string): string => {
      if (typeof option === 'string') {
        return option;
      }
      if (labelKey && isKeyValueOption(option, labelKey, valueKey)) {
        return String(option[labelKey]);
      }
      return String(option);
    },
    [labelKey, valueKey]
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

        let selectedOptions: AutocompleteFieldValue<
          Option,
          Multiple,
          DisableClearable,
          FreeSolo
        >;
        if (multiple) {
          const multiValue: (Option | string)[] = [];

          for (const val of Array.isArray(rhfValue) ? rhfValue : []) {
            const option = optionsMap
              ? optionsMap.get(val)
              : options.find(opn => opn === val);
            if (option) {
              multiValue.push(option);
            } else if (freeSolo) {
              multiValue.push(String(val));
            }
          }

          selectedOptions = multiValue as AutocompleteFieldValue<
            Option,
            Multiple,
            DisableClearable,
            FreeSolo
          >;
        } else {
          const singleOption
            = rhfValue === null || rhfValue === undefined
              ? null
              : optionsMap
                ? optionsMap.get(rhfValue)
                ?? (freeSolo ? (rhfValue) : null)
                : options.find(opn => opn === rhfValue)
                  ?? (freeSolo ? (rhfValue) : null);

          selectedOptions = singleOption as AutocompleteFieldValue<
            Option,
            Multiple,
            DisableClearable,
            FreeSolo
          >;
        }

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
            {/*
             * MUI v7: use `renderValue` so single- and multi-select selections render as chips.
             * MUI v6: use `renderTags` for multi-select chips only, as `renderValue` is not available.
             * MUI v7 deprecates `renderTags` in favor of `renderValue`.
             */}
            <Autocomplete
              {...otherAutoCompleteProps}
              id={fieldId}
              options={options}
              multiple={multiple}
              freeSolo={freeSolo}
              autoSelect={freeSolo ? autoSelect ?? true : autoSelect}
              value={selectedOptions}
              disabled={isDisabled}
              onChange={(
                event,
                newValue,
                reason: AutocompleteChangeReason,
                details?: AutocompleteChangeDetails<Option>
              ) => {
                const fieldValue
                  = newValue === null
                    ? null
                    : Array.isArray(newValue)
                      ? newValue.map(item =>
                        typeof item !== 'string'
                        && valueKey
                        && isKeyValueOption(item, labelKey, valueKey)
                          ? item[valueKey]
                          : (item as string))
                      : typeof newValue !== 'string'
                        && valueKey
                        && isKeyValueOption(newValue, labelKey, valueKey)
                        ? newValue[valueKey]
                        : (newValue as string);

                const storedValue = fieldValue as AutocompleteNewValue<
                  Multiple,
                  DisableClearable
                >;

                if (customOnChange) {
                  customOnChange({
                    rhfOnChange,
                    newValue: storedValue,
                    selectedOption: newValue,
                    event,
                    reason,
                    details
                  });
                  return;
                }
                rhfOnChange(storedValue);
                onValueChange?.({
                  newValue: storedValue,
                  selectedOption: newValue,
                  event,
                  reason,
                  details
                });
              }}
              onFocus={onFocus}
              onBlur={blurEvent => {
                rhfOnBlur();
                onBlur?.(blurEvent);
              }}
              getOptionLabel={renderOptionLabel}
              isOptionEqualToValue={(option, value) => {
                if (!value) {
                  return false;
                }
                if (typeof option === 'string') {
                  return option === (
                    typeof value === 'string' ? value : String(value)
                  );
                }
                if (valueKey && isKeyValueOption(option, labelKey, valueKey)) {
                  return (
                    option[valueKey] === (typeof value === 'object' && value !== null
                      ? value[valueKey]
                      : value)
                  );
                }
                return option === value;
              }}
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
                          <FormLabelText
                            label={fieldLabel}
                            required={required}
                          />
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
