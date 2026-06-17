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
  StrObjOption,
  AutocompleteNewValue,
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
  | 'autoHighlight'
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
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  options: Option[];
  multiple?: Multiple;
  labelKey?: LabelKey;
  valueKey?: ValueKey;
  /**
   * When true, the user may type any value not present in `options`.
   *
   * The typed string is stored in RHF state as-is. `selectedOption` in
   * callbacks reflects `Option | string` for single selection, or
   * `(Option | string)[]` when `multiple` is true.
   */
  freeSolo?: FreeSolo;
  onValueChange?: ({
    newValue,
    selectedOption,
    event,
    reason,
    details
  }: OnValueChangeProps<Option, Multiple, DisableClearable, FreeSolo>) => void;
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
    OnValueChangeProps<Option, Multiple, DisableClearable, FreeSolo>,
    AutocompleteNewValue<Multiple, DisableClearable>
  >) => void;
  /**
   * If true, the input cannot be cleared.
   * @default false
   */
  disableClearable?: DisableClearable;
  label?: ReactNode;
  showLabelAboveFormField?: boolean;
  formLabelProps?: FormLabelProps;
  hideLabel?: boolean;
  required?: boolean;
  helperText?: ReactNode;
  /**
   * @deprecated
   * Field error message is now automatically derived from form state.
   * Passing this prop is no longer necessary and it will be removed in the next major version.
   */
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
  textFieldProps?: AutoCompleteTextFieldProps;
  ChipProps?: MuiChipProps;
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
    multiple,
    labelKey,
    valueKey,
    freeSolo,
    disableClearable,
    onValueChange,
    customOnChange,
    disabled: muiDisabled,
    label,
    showLabelAboveFormField,
    formLabelProps,
    hideLabel,
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
  const {
    allLabelsAboveFields,
    skipValidationInEnvs
  } = useContext(RHFMuiConfigContext);

  if (
    options.length
    && !skipValidationInEnvs.includes(process?.env?.NODE_ENV ?? 'production')
  ) {
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
          ref: rhfRef
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
              {...otherAutoCompleteProps}
              id={fieldId}
              options={options}
              multiple={multiple}
              freeSolo={freeSolo}
              autoSelect={freeSolo || autoSelect}
              value={selectedOptions}
              disabled={muiDisabled}
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
                    disabled={paramsDisabled || muiDisabled}
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
              autoHighlight
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
