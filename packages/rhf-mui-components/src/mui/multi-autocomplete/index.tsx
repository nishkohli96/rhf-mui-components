'use client';

import {
  useContext,
  useCallback,
  useMemo,
  forwardRef,
  type Ref,
  type ReactNode
} from 'react';
import {
  Controller,
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import Box from '@mui/material/Box';
import Autocomplete, {
  type AutocompleteRenderOptionState,
  type AutocompleteProps
} from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import {
  FormControl,
  FormLabel,
  FormLabelText,
  FormHelperText,
  defaultAutocompleteValue,
  defaultSelectAllOptionLabel,
  selectAllOptionValue
} from '@/common';
import type {
  FormLabelProps,
  FormControlLabelProps,
  CheckboxProps,
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

type MultiAutoCompleteProps<
  Option extends StrObjOption = StrObjOption,
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
  | 'autoHighlight'
  | 'blurOnSelect'
  | 'disableClearable'
  | 'disableCloseOnSelect'
  | 'ChipProps'
>;

type OnValueChangeProps = {
  newValue: string[];
  targetValue?: string;
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
  DisableClearable extends boolean = false
> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  options: Option[];
  labelKey?: LabelKey;
  valueKey?: ValueKey;
  selectAllText?: string;
  onValueChange?: ({ newValue, targetValue }: OnValueChangeProps) => void;
  customOnChange?: ({
    rhfOnChange,
    newValue,
    targetValue
  }: CustomOnChangeProps<OnValueChangeProps, string[]>) => void;
  /**
   * If true, the input can't be cleared.
   * @default false
   */
  disableClearable?: DisableClearable;
  label?: ReactNode;
  showLabelAboveFormField?: boolean;
  hideLabel?: boolean;
  formLabelProps?: FormLabelProps;
  checkboxProps?: CheckboxProps;
  renderOptionLabel?: (
    option: Option,
    selectAllText: string,
    state: AutocompleteRenderOptionState
  ) => ReactNode;
  formControlLabelProps?: FormControlLabelProps;
  required?: boolean;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
  textFieldProps?: AutoCompleteTextFieldProps;
  ChipProps?: MuiChipProps;
  hideSelectAllOption?: boolean;
  customIds?: CustomComponentIds;
} & MultiAutoCompleteProps<Option, DisableClearable>;

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
  DisableClearable extends boolean = false
>(
  {
    fieldName,
    control,
    registerOptions,
    options,
    labelKey,
    valueKey,
    disableClearable,
    selectAllText = defaultSelectAllOptionLabel,
    onValueChange,
    customOnChange,
    disabled: muiDisabled,
    label,
    showLabelAboveFormField,
    hideLabel,
    formLabelProps,
    checkboxProps,
    renderOptionLabel,
    formControlLabelProps,
    required,
    helperText,
    errorMessage,
    hideErrorMessage,
    formHelperTextProps,
    textFieldProps,
    slotProps,
    ChipProps,
    onBlur,
    loading,
    hideSelectAllOption,
    customIds,
    getOptionDisabled,
    limitTags = 2,
    ...otherAutoCompleteProps
  }: RHFMultiAutocompleteProps<T, Option, LabelKey, ValueKey, DisableClearable>,
  ref: Ref<HTMLInputElement>
) {
  const {
    allLabelsAboveFields,
    defaultFormControlLabelSx,
    skipValidationInEnvs
  } = useContext(RHFMuiConfigContext);
  if (!skipValidationInEnvs.includes(process.env.NODE_ENV ?? 'production')) {
    validateArray('RHFMultiAutocomplete', options, labelKey, valueKey);
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

  const shouldHideSelectAllOptions
    = hideSelectAllOption || options.length === 0 || options.length === 1;

  const { sx, ...otherFormControlLabelProps } = formControlLabelProps ?? {};
  const appliedFormControlLabelSx = {
    ...defaultFormControlLabelSx,
    ...sx
  };

  const autoCompleteOptions: Option[] = useMemo(() => {
    if (shouldHideSelectAllOptions) {
      return options;
    }
    return [selectAllText as Option, ...options];
  }, [options, selectAllText, shouldHideSelectAllOptions]);

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

  const isSelectAllOption = useCallback(
    (option: Option) => option === selectAllText,
    [selectAllText]
  );

  const getOptionLabelOrValue = useCallback(
    (option: StrObjOption, key?: LabelKey | ValueKey) =>
      key && isKeyValueOption(option, labelKey, valueKey)
        ? option[key]
        : (option as string),
    [labelKey, valueKey]
  );

  const displayOptionLabel = useCallback(
    (option: Option, getSelectAllValue?: boolean) =>
      isSelectAllOption(option)
        ? getSelectAllValue
          ? selectAllOptionValue
          : selectAllText
        : getOptionLabelOrValue(option, labelKey),
    [isSelectAllOption, selectAllText, getOptionLabelOrValue, labelKey]
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
          ref: rhfRef
        },
        fieldState: { error: fieldStateError }
      }) => {
        const selectedValues: string[] = rhfValue ?? [];
        const selectedSet = new Set(selectedValues);

        const selectedOptions = (rhfValue ?? []).flatMap(val => {
          if (optionsMap) {
            const option = optionsMap.get(val);
            return option ? [option] : [];
          }
          const option = options.find(opn => opn === val);
          return option ? [option] : [];
        });

        const areAllSelected =
  options.length > 0 &&
  selectedValues.length === options.length &&
  options.every(option =>
    selectedSet.has(getOptionLabelOrValue(option, valueKey))
  );
        const isIndeterminate = selectedValues.length > 0 && !areAllSelected;

        const fieldErrorMessage
          = fieldStateError?.message?.toString() ?? errorMessage;
        const isError = !!fieldErrorMessage;
        const showHelperTextElement = !!(
          helperText
          || (isError && !hideErrorMessage)
        );

        const changeFieldState = (
          newValues: string[],
          selectedValue?: string
        ) => {
          rhfOnChange(newValues);
          onValueChange?.({
            newValue: newValues,
            targetValue: selectedValue
          });
        };

        const handleCheckboxChange = (
          currentValue: string[],
          optionValue: string,
          checked: boolean
        ): string[] => {
          /* When "Select All" checkbox is toggled. */
          if (!optionValue || optionValue === selectAllOptionValue) {
            return checked
              ? options.map(opt => getOptionLabelOrValue(opt, valueKey))
              : [];
          }
          /* When one of the options is selected */
          return checked
            ? [...currentValue, optionValue]
            : currentValue.filter(val => val !== optionValue);
        };

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
            <Autocomplete
              id={fieldId}
              options={autoCompleteOptions}
              value={selectedOptions}
              loading={loading}
              disabled={muiDisabled}
              onChange={(_, newSelectedOptions, reason, details) => {
                if (reason === 'clear') {
                  if (customOnChange) {
                    customOnChange({
                      rhfOnChange,
                      newValue: [],
                      targetValue: undefined
                    });
                    return;
                  }
                  rhfOnChange([]);
                  onValueChange?.({ newValue: [] });
                  return;
                }
                const isSelectAllSelected
                  = newSelectedOptions.some(isSelectAllOption);
                if (isSelectAllSelected) {
                  const allValues = options.map(option =>
                    getOptionLabelOrValue(option, valueKey));
                  const finalValue = areAllSelected ? [] : allValues;
                  if (customOnChange) {
                    customOnChange({
                      rhfOnChange,
                      newValue: finalValue,
                      targetValue: selectAllOptionValue
                    });
                    return;
                  }
                  rhfOnChange(finalValue);
                  onValueChange?.({
                    newValue: finalValue,
                    targetValue: selectAllOptionValue
                  });
                  return;
                }

                const clickedOption = details?.option;
                const finalValue = newSelectedOptions
                  .filter(option => !isSelectAllOption(option))
                  .map(option => getOptionLabelOrValue(option, valueKey));
                if (customOnChange) {
                  customOnChange({
                    rhfOnChange,
                    newValue: finalValue,
                    targetValue: clickedOption
                      ? getOptionLabelOrValue(clickedOption, valueKey)
                      : undefined
                  });
                  return;
                }
                rhfOnChange(finalValue);
                onValueChange?.({
                  newValue: finalValue,
                  targetValue: clickedOption
                    ? getOptionLabelOrValue(clickedOption, valueKey)
                    : undefined
                });
              }}
              onBlur={blurEvent => {
                rhfOnBlur();
                onBlur?.(blurEvent);
              }}
              getOptionLabel={option => displayOptionLabel(option, true)}
              isOptionEqualToValue={(option, value) => {
                /*
                 * Select All is never stored in `value`; matching it to real values when
                 * `areAllSelected` made MUI remove the first option on the next click.
                 */
                if (isSelectAllOption(option)) {
                  return false;
                }
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
                  placeholder,
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
                    disabled={paramsDisabled || muiDisabled}
                    {...otherTextFieldProps}
                    placeholder={
                      selectedOptions.length > 0 ? undefined : placeholder
                    }
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
                            {InputProps.endAdornment}
                          </>
                        )
                      },
                      htmlInput: textFieldInputProps
                    }}
                  />
                );
              }}
              renderOption={(optionProps, option, state) => {
                const isSelectAll = isSelectAllOption(option);
                const optionLabel = displayOptionLabel(option);
                const optionValue = isSelectAll
                  ? selectAllOptionValue
                  : getOptionLabelOrValue(option, valueKey);
                const isOptionDisabled = getOptionDisabled?.(option) || muiDisabled;
                return (
                  <Box component="li" {...optionProps}>
                    <FormControlLabel
                      label={
                        renderOptionLabel?.(option, selectAllText, state)
                        ?? optionLabel
                      }
                      disabled={isOptionDisabled}
                      control={
                        <Checkbox
                          {...checkboxProps}
                          id={`${fieldName}_${optionValue}`}
                          name={`${fieldName}_${optionValue}`}
                          value={optionValue}
                          checked={
                            isSelectAll
                              ? areAllSelected
                              : selectedValues.includes(optionValue)
                          }
                          indeterminate={
                            isSelectAll ? isIndeterminate : undefined
                          }
                        />
                      }
                      sx={{ ...appliedFormControlLabelSx, width: '100%' }}
                      onClick={e => {
                        e.preventDefault();
                        const checked = isSelectAll
                          ? !areAllSelected
                          : !selectedValues.includes(optionValue);
                        changeFieldState(
                          handleCheckboxChange(
                            selectedValues,
                            optionValue,
                            checked
                          ),
                          optionValue
                        );
                      }}
                      {...otherFormControlLabelProps}
                    />
                  </Box>
                );
              }}
              limitTags={limitTags}
              getLimitTagsText={value => `+${value} More`}
              autoHighlight
              disableCloseOnSelect
              disableClearable={disableClearable}
              blurOnSelect={false}
              fullWidth
              multiple
              slotProps={{
                ...slotProps,
                chip: ChipProps,
                listbox: {
                  ...slotProps?.listbox,
                  'aria-multiselectable': true
                }
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
  DisableClearable extends boolean = false
>(
  props: RHFMultiAutocompleteProps<
    T,
    Option,
    LabelKey,
    ValueKey,
    DisableClearable
  > & {
    ref?: Ref<HTMLInputElement>;
  }
) => JSX.Element;

export default RHFMultiAutocomplete;
