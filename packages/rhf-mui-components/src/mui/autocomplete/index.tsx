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
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import Autocomplete, {
  type AutocompleteProps,
  type AutocompleteChangeDetails,
  type AutocompleteChangeReason,
  type AutocompleteValue
} from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import {
  FormControl,
  FormLabel,
  FormLabelText,
  FormHelperText,
  defaultAutocompleteValue
} from '@/common';
import type {
  FormLabelProps,
  FormHelperTextProps,
  KeyValueOption,
  StrObjOption,
  AutoCompleteTextFieldProps,
  MuiChipProps,
  CustomOnChangeProps,
  CustomComponentIds
} from '@/types';
import {
  fieldNameToLabel,
  validateArray,
  isKeyValueOption,
  useFieldIds,
  keepLabelAboveFormField,
  mergeRefs
} from '@/utils';

type OmittedAutocompleteProps<
  Option extends StrObjOption,
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
  | 'autoHighlight'
  | 'blurOnSelect'
  | 'disableCloseOnSelect'
  | 'ChipProps'
  | 'renderTags'
  | 'disableClearable'
>;

type AutocompleteFieldValue<
  Option,
  Multiple extends boolean,
  DisableClearable extends boolean
> = AutocompleteValue<Option, Multiple, DisableClearable, false>;

/**
 * RHF field value this Autocomplete writes (`valueKey` primitive or string option).
 * Mirrors MUI `AutocompleteValue<string, Multiple, DisableClearable, false>` for primitives.
 * Tuple checks avoid distributive `boolean` breaking the conditional.
 */
type RHFAutocompleteNewValue<
  Multiple extends boolean,
  DisableClearable extends boolean
> = [Multiple] extends [true]
  ? [DisableClearable] extends [true]
    ? string[]
    : string[] | null
  : [DisableClearable] extends [true]
    ? string
    : string | null;

type OnValueChangeProps<
  Option,
  Multiple extends boolean,
  DisableClearable extends boolean
> = {
  newValue: RHFAutocompleteNewValue<Multiple, DisableClearable>;
  selectedOption: AutocompleteValue<Option, Multiple, DisableClearable, false>;
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
  DisableClearable extends boolean = false
> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  options: Option[];
  multiple?: Multiple;
  labelKey?: LabelKey;
  valueKey?: ValueKey;
  onValueChange?: ({
    newValue,
    selectedOption,
    event,
    reason,
    details
  }: OnValueChangeProps<Option, Multiple, DisableClearable>
  ) => void;
  /**
   * Custom change handler that overrides the default value update behavior.
   *
   * Use this when you need full control over how the selected value is processed
   * before updating React Hook Form state.
   *
   * ⚠️ Important: You must call `rhfOnChange` manually to update the form state.
   * `onValueChange` is not invoked when using `customOnChange`.
   *
   * @param rhfOnChange - React Hook Form's internal change handler
   * @param newValue - Selected value(s) stored in the form: `string[]` when `multiple` is true, otherwise `string`. Includes `null` only when clearing is allowed (`disableClearable` is false).
   * @param selectedOption - The selected object or string option(s) from MUI
   * @param event - The event that triggered the change
   * @param reason - The reason for the change
   * @param details - The details of the change
   */
  customOnChange?: ({
    rhfOnChange,
    newValue,
    selectedOption,
    event,
    reason,
    details
  }: CustomOnChangeProps<
    OnValueChangeProps<Option, Multiple, DisableClearable>,
    RHFAutocompleteNewValue<Multiple, DisableClearable>
  >) => void;
  /**
   * If true, the input can't be cleared.
   * @default false
   */
  disableClearable?: DisableClearable;
  label?: ReactNode;
  showLabelAboveFormField?: boolean;
  hideLabel?: boolean;
  formLabelProps?: FormLabelProps;
  required?: boolean;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
  textFieldProps?: AutoCompleteTextFieldProps;
  ChipProps?: MuiChipProps;
  customIds?: CustomComponentIds;
} & OmittedAutocompleteProps<Option, Multiple, DisableClearable>;

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
    onValueChange,
    customOnChange,
    disabled: muiDisabled,
    label,
    showLabelAboveFormField,
    hideLabel,
    formLabelProps,
    required,
    helperText,
    errorMessage,
    hideErrorMessage,
    formHelperTextProps,
    textFieldProps,
    slotProps,
    ChipProps,
    onBlur,
    onFocus,
    loading,
    limitTags = 2,
    customIds,
    ...otherAutoCompleteProps
  }: RHFAutocompleteProps<
    T,
    Option,
    LabelKey,
    ValueKey,
    Multiple,
    DisableClearable
  >,
  ref: Ref<HTMLInputElement>
) {
  const { allLabelsAboveFields, skipValidationInEnvs }
    = useContext(RHFMuiConfigContext);

  if (!skipValidationInEnvs.includes(process.env.NODE_ENV ?? 'production')) {
    validateArray('RHFAutocomplete', options, labelKey, valueKey);
  }

  const { fieldId, labelId, helperTextId, errorId } = useFieldIds(
    fieldName,
    customIds
  );

  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );
  const fieldLabel = label ?? fieldNameToLabel(fieldName);

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
    (option: Option | string): string =>
      labelKey && isKeyValueOption(option, labelKey, valueKey)
        ? option[labelKey]
        : (option as string),
    [labelKey, valueKey]
  );

  return (
    <Controller
      name={fieldName}
      control={control}
      rules={registerOptions}
      disabled={muiDisabled}
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
        const fieldErrorMessage
          = fieldStateError?.message?.toString() ?? errorMessage;
        const isError = !!fieldErrorMessage;
        const showHelperTextElement = !!(
          helperText
          || (isError && !hideErrorMessage)
        );

        let selectedOptions: Option | Option[] | null;
        if (multiple) {
          selectedOptions = (rhfValue ?? []).flatMap(val => {
            const option = optionsMap
              ? optionsMap.get(val)
              : options.find(opn => opn === val);
            return option ? [option] : [];
          });
        } else {
          selectedOptions
            = rhfValue === null || rhfValue === undefined
              ? null
              : optionsMap
                ? (optionsMap.get(rhfValue) ?? null)
                : (options.find(opn => opn === rhfValue) ?? null);
        }

        return (
          <FormControl error={isError}>
            {!hideLabel && (
              <FormLabel
                label={fieldLabel}
                isVisible={isLabelAboveFormField}
                required={required}
                error={isError}
                formLabelProps={{
                  id: labelId,
                  htmlFor: fieldId,
                  ...formLabelProps
                }}
              />
            )}
            {/*
             * MUI v7: use `renderValue` so single- and multi-select selections render as chips.
             * MUI v6: use `renderTags` for multi-select chips only, as `renderValue` is not available.
             * MUI v7 deprecates `renderTags` in favor of `renderValue`.
             */}
            <Autocomplete
              id={fieldId}
              options={options}
              multiple={multiple}
              value={
                selectedOptions as AutocompleteFieldValue<
                  Option,
                  Multiple,
                  DisableClearable
                >
              }
              disabled={rhfDisabled}
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
                      ? (newValue ?? []).map(item =>
                        valueKey && isKeyValueOption(item, labelKey, valueKey)
                          ? item[valueKey]
                          : (item as string))
                      : valueKey
                        && isKeyValueOption(newValue, labelKey, valueKey)
                        ? newValue[valueKey]
                        : (newValue as string);
                const storedValue = fieldValue as RHFAutocompleteNewValue<
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
                if (valueKey && isKeyValueOption(option, labelKey, valueKey)) {
                  return (
                    option[valueKey] === (value as KeyValueOption)[valueKey]
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
                  'aria-labelledby': isLabelAboveFormField
                    ? labelId
                    : undefined,
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
                    disabled={paramsDisabled || rhfDisabled}
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
              autoHighlight
              blurOnSelect={!multiple}
              disableCloseOnSelect={multiple}
              disableClearable={disableClearable}
              fullWidth
              loading={loading}
              limitTags={limitTags}
              getLimitTagsText={value => `+${value} More`}
              slotProps={{
                ...slotProps,
                chip: ChipProps
              }}
              {...otherAutoCompleteProps}
            />
            <FormHelperText
              error={isError}
              errorMessage={fieldErrorMessage}
              hideErrorMessage={hideErrorMessage}
              helperText={helperText}
              showHelperTextElement={showHelperTextElement}
              formHelperTextProps={{
                id: isError ? errorId : helperTextId,
                ...formHelperTextProps
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
  Option extends StrObjOption,
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
  props: RHFAutocompleteProps<
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

export default RHFAutocomplete;
