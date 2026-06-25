'use client';

import {
  useContext,
  useCallback,
  useMemo,
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
  type AutocompleteProps,
  type AutocompleteValue
} from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import {
  FormControl,
  FormLabel,
  FormLabelText,
  FormHelperText,
  defaultAutocompleteValue,
  selectAllOptionValue
} from '@/common';
import type {
  FormLabelProps,
  FormControlLabelProps,
  CheckboxProps,
  FormHelperTextProps,
  KeyValueOption,
  AutoCompleteTextFieldProps,
  MuiChipProps
} from '@/types';
import {
  fieldNameToLabel,
  validateArray,
  isKeyValueOption,
  isAboveMuiV5,
  useFieldIds,
  keepLabelAboveFormField
} from '@/utils';

type MultiAutoCompleteProps<
  Option,
  DisableClearable extends boolean = false,
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
  | 'disableClearable'
  | 'disableCloseOnSelect'
  | 'ChipProps'
>;

type AutocompleteFieldValue<
  Option,
  DisableClearable extends boolean,
> = AutocompleteValue<Option, true, DisableClearable, false>;

export type RHFMultiAutocompleteObjectProps<
  T extends FieldValues,
  Option extends KeyValueOption = KeyValueOption,
  LabelKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
  ValueKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
  DisableClearable extends boolean = false,
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
  labelKey: LabelKey;
  /**
   * Object key used to derive the stored field value when options are an array of objects.
   */
  valueKey: ValueKey;
  /**
   * Text to display for the "Select All" option.
   */
  selectAllText?: string;
  /**
   * When true, hides the select-all option.
   */
  hideSelectAllOption?: boolean;
  /**
   * When true, the selected values cannot be cleared from the input clear button.
   * @default false
   */
  disableClearable?: DisableClearable;
  /**
   * Callback fired after the selected option objects are stored in the field.
   * @param fieldValue - Updated array of selected option objects.
   * @param targetValue - Option object that triggered the change, or the Select All option.
   */
  onValueChange?: (fieldValue: Option[], targetValue?: Option) => void;
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
   * Helper text shown below the field when there is no visible validation error.
   */
  helperText?: ReactNode;
  /**
   * Validation error message displayed in the `FormHelperText` component.
   * When provided, it takes precedence over `helperText` unless
   * `hideErrorMessage` is set to `true`.
   */
  errorMessage?: ReactNode;
  /**
   * If true, hides the error message text while keeping the field in an error state.
   */
  hideErrorMessage?: boolean;
  /**
   * Props forwarded to the internal `FormHelperText`. The `id` is managed by the component.
   */
  formHelperTextProps?: Omit<FormHelperTextProps, 'id'>;
  /**
   * Props forwarded to the internal MUI `TextField` used to render the input.
   */
  textFieldProps?: AutoCompleteTextFieldProps;
  /**
   * Props forwarded to chips rendered for selected values.
   */
  ChipProps?: MuiChipProps;
} & MultiAutoCompleteProps<Option, DisableClearable>;

const RHFMultiAutocompleteObject = <
  T extends FieldValues,
  Option extends KeyValueOption = KeyValueOption,
  LabelKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
  ValueKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
  DisableClearable extends boolean = false,
>({
  fieldName,
  control,
  registerOptions,
  options,
  labelKey,
  valueKey,
  selectAllText = 'Select All',
  hideSelectAllOption,
  disableClearable,
  onValueChange,
  disabled: muiDisabled,
  label,
  showLabelAboveFormField,
  formLabelProps,
  checkboxProps,
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
  ...otherAutoCompleteProps
}: RHFMultiAutocompleteObjectProps<
  T,
  Option,
  LabelKey,
  ValueKey,
  DisableClearable
>) => {
  validateArray('RHFMultiAutocompleteObject', options, labelKey, valueKey);

  const {
    fieldId,
    labelId,
    helperTextId,
    errorId
  } = useFieldIds(fieldName);

  const {
    allLabelsAboveFields,
    defaultFormControlLabelSx
  } = useContext(RHFMuiConfigContext);
  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );
  const fieldLabel = label ?? fieldNameToLabel(fieldName);

  const { sx, ...otherFormControlLabelProps } = formControlLabelProps ?? {};
  const appliedFormControlLabelSx = {
    ...defaultFormControlLabelSx,
    ...sx
  };

  const shouldHideSelectAllOptions
    = hideSelectAllOption || (options.length === 0 || options.length === 1);

  const selectAllOption = useMemo(
    (): Option =>
      ({
        [labelKey]: selectAllText,
        [valueKey]: selectAllOptionValue
      }) as Option,
    [labelKey, valueKey, selectAllText]
  );

  const autoCompleteOptions: Option[] = useMemo(() => {
    if (shouldHideSelectAllOptions) {
      return options;
    }
    return [selectAllOption, ...options];
  }, [options, selectAllOption, shouldHideSelectAllOptions]);

  const isSelectAllOption = useCallback(
    (option: Option) => {
      return (
        option[valueKey] === selectAllOptionValue
      );
    },
    [valueKey]
  );

  const getOptionLabelOrValue = useCallback(
    (option: Option, key: LabelKey | ValueKey): string => {
      return String(option[key]);
    },
    []
  );

  const renderOptionLabel = useCallback(
    (option: Option, getSelectAllValue?: boolean): string =>
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
      render={({
        field: {
          name: rhfFieldName,
          value: rhfValue,
          onChange: rhfOnChange,
          onBlur: rhfOnBlur,
          ref: rhfRef,
          disabled: rhfDisabled
        }
      }) => {
        const isDisabled = muiDisabled || rhfDisabled;
        const isError = !!errorMessage;
        const showHelperTextElement = (!!helperText) || (isError && !hideErrorMessage);

        const selectedValues: Option[] = rhfValue ?? [];
        const selectedOptions = selectedValues.filter(
          option => !isSelectAllOption(option)
        ) as AutocompleteFieldValue<Option, DisableClearable>;

        const areAllSelected
          = options.length > 0
            && selectedOptions.length === options.length;
        const isIndeterminate = selectedValues.length > 0 && !areAllSelected;

        return (
          <FormControl error={isError} disabled={isDisabled}>
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
            <Autocomplete
              {...otherAutoCompleteProps}
              id={fieldId}
              options={autoCompleteOptions}
              value={selectedOptions}
              loading={loading}
              fullWidth
              multiple
              disableClearable={disableClearable}
              autoHighlight
              disableCloseOnSelect
              disabled={isDisabled}
              onChange={(_, newSelectedOptions, reason, details) => {
                if (reason === 'clear') {
                  rhfOnChange([]);
                  onValueChange?.([]);
                  return;
                }
                const isSelectAllSelected = newSelectedOptions.some(isSelectAllOption);
                if (isSelectAllSelected) {
                  const finalValue = areAllSelected ? [] : options;
                  rhfOnChange(finalValue);
                  onValueChange?.(finalValue, selectAllOption);
                  return;
                }

                const clickedOption = details?.option;
                const finalValue = newSelectedOptions
                  .filter(option => !isSelectAllOption(option));
                rhfOnChange(finalValue);
                onValueChange?.(
                  finalValue,
                  clickedOption
                );
              }}
              onBlur={blurEvent => {
                rhfOnBlur();
                onBlur?.(blurEvent);
              }}
              limitTags={2}
              getLimitTagsText={value => `+${value} More`}
              getOptionLabel={option => renderOptionLabel(option, true)}
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
                    option[valueKey] === value[valueKey]
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
                  'aria-labelledby': isLabelAboveFormField ? labelId : undefined,
                  'aria-describedby': showHelperTextElement
                    ? (isError ? errorId : helperTextId)
                    : undefined,
                  autoComplete
                };
                return (
                  <TextField
                    {...otherTextFieldProps}
                    {...otherInputParams}
                    name={rhfFieldName}
                    inputRef={rhfRef}
                    disabled={paramsDisabled || isDisabled}
                    placeholder={
                      selectedOptions.length > 0
                        ? undefined
                        : placeholder
                    }
                    label={
                      !isLabelAboveFormField
                        ? (
                          <FormLabelText label={fieldLabel} required={required} />
                        )
                        : undefined
                    }
                    error={isError}
                    {...(isAboveMuiV5
                      ? {
                        slotProps: {
                          ...textFieldProps?.slotProps,
                          input: {
                            ...InputProps,
                            ...textFieldProps?.slotProps?.input,
                            endAdornment: (
                              <>
                                {loading && (
                                  <CircularProgress color="inherit"
                                    size={20}
                                  />
                                )}
                                {InputProps.endAdornment}
                              </>
                            )
                          },
                          htmlInput: textFieldInputProps
                        }
                      }
                      : {
                        InputProps: {
                          ...InputProps,
                          ...textFieldProps?.InputProps,
                          endAdornment: (
                            <>
                              {loading && (
                                <CircularProgress color="inherit" size={20} />
                              )}
                              {InputProps.endAdornment}
                            </>
                          )
                        },
                        inputProps: textFieldInputProps
                      })}
                  />
                );
              }}
              renderOption={(optionProps, option) => {
                const isSelectAll = isSelectAllOption(option);
                const opnLabel = renderOptionLabel(option);
                const opnValue = isSelectAll
                  ? selectAllOptionValue
                  : getOptionLabelOrValue(option, valueKey);
                return (
                  <Box component="li" {...optionProps}>
                    <FormControlLabel
                      {...otherFormControlLabelProps}
                      label={opnLabel}
                      disabled={isDisabled}
                      onClick={e => e.preventDefault()}
                      control={
                        <Checkbox
                          {...checkboxProps}
                          id={`${fieldName}_${opnValue}`}
                          name={`${fieldName}_${opnValue}`}
                          value={opnValue}
                          checked={
                            isSelectAll
                              ? areAllSelected
                              : selectedOptions.some(
                                selected =>
                                  getOptionLabelOrValue(
                                    selected,
                                    valueKey
                                  ) === opnValue
                              )
                          }
                          indeterminate={
                            isSelectAll ? isIndeterminate : undefined
                          }
                          disabled={isDisabled}
                        />
                      }
                      sx={{ ...appliedFormControlLabelSx, width: '100%' }}
                    />
                  </Box>
                );
              }}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => {
                  const { key, ...otherChipProps } = getTagProps({ index });
                  return (
                    <Chip
                      key={key}
                      {...otherChipProps}
                      label={renderOptionLabel(option)}
                      {...ChipProps}
                    />
                  );
                })}
              {...(isAboveMuiV5 ? { slotProps } : { ChipProps })}
            />
            <FormHelperText
              error={isError}
              errorMessage={errorMessage}
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
};

export default RHFMultiAutocompleteObject;
