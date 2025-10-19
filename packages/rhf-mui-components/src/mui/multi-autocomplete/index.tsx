import { useContext, useCallback, useMemo, type ReactNode } from 'react';
import {
  Controller,
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import Box from '@mui/material/Box';
import Autocomplete, {
  type AutocompleteProps
} from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
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
  FormControlLabelProps,
  CheckboxProps,
  FormHelperTextProps,
  KeyValueOption,
  StringArr,
  StrObjOption,
  AutoCompleteTextFieldProps,
  MuiChipProps
} from '@/types';
import {
  fieldNameToLabel,
  validateArray,
  isKeyValueOption,
  isAboveMuiV5,
  isMuiV7AndAbove
} from '@/utils';

type MultiAutoCompleteProps<Option> = Omit<
  AutocompleteProps<Option, true, false, false>,
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
  | 'disableCloseOnSelect'
  | 'ChipProps'
>;

export type RHFMultiAutocompleteProps<
  T extends FieldValues,
  Option extends StrObjOption = StrObjOption
> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  options: Option[];
  labelKey?: string;
  valueKey?: string;
  selectAllText?: string;
  onValueChange?: (fieldValue: StringArr, targetValue?: string) => void;
  label?: ReactNode;
  showLabelAboveFormField?: boolean;
  formLabelProps?: FormLabelProps;
  checkboxProps?: CheckboxProps;
  formControlLabelProps?: FormControlLabelProps;
  required?: boolean;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
  textFieldProps?: AutoCompleteTextFieldProps;
  ChipProps?: MuiChipProps;
} & MultiAutoCompleteProps<Option>;

const RHFMultiAutocomplete = <
  T extends FieldValues,
  Option extends StrObjOption = StrObjOption
>({
  fieldName,
  control,
  registerOptions,
  options,
  labelKey,
  valueKey,
  selectAllText = 'Select All',
  onValueChange,
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
  ...otherAutoCompleteProps
}: RHFMultiAutocompleteProps<T, Option>) => {
  validateArray('RHFMultiAutocomplete', options, labelKey, valueKey);

  const { allLabelsAboveFields, defaultFormControlLabelSx }
    = useContext(RHFMuiConfigContext);

  const isLabelAboveFormField = showLabelAboveFormField ?? allLabelsAboveFields;
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isError = Boolean(errorMessage);

  const selectAllOptionValue = '';

  const { sx, ...otherFormControlLabelProps } = formControlLabelProps ?? {};
  const appliedFormControlLabelSx = { ...defaultFormControlLabelSx, ...sx };

  const isSelectAllOption = useCallback(
    (option: Option) => option === selectAllText,
    [selectAllText]
  );

  const getOptionLabelOrValue = useCallback(
    (option: StrObjOption, key?: string) =>
      key && isKeyValueOption(option, labelKey, valueKey)
        ? option[key]
        : (option as string),
    [labelKey, valueKey]
  );

  const renderOptionLabel = useCallback(
    (option: Option, getSelectAllValue?: boolean) =>
      isSelectAllOption(option)
        ? getSelectAllValue
          ? selectAllOptionValue
          : selectAllText
        : getOptionLabelOrValue(option, labelKey),
    [isSelectAllOption, getOptionLabelOrValue, labelKey, selectAllText]
  );

  const autoCompleteOptions: Option[] = useMemo(() => {
    return options.length <= 1
      ? options
      : [selectAllText as Option, ...options];
  }, [options, selectAllText]);

  const renderChips = useCallback(
    (value: Option[], getProps: any) =>
      value.map((option, index) => {
        const { key, ...itemProps } = getProps({ index });
        const optionLabel = getOptionLabelOrValue(option, labelKey);
        return (
          <Chip
            key={key}
            label={optionLabel}
            variant="outlined"
            {...itemProps}
          />
        );
      }),
    [getOptionLabelOrValue, labelKey]
  );

  const isOptionEqualToValue = useCallback(
    (option: Option, value: Option) => {
      if (isSelectAllOption(option)) {
        return false;
      }
      if (valueKey && isKeyValueOption(option, labelKey, valueKey)) {
        return option[valueKey] === (value as KeyValueOption)[valueKey];
      }
      return option === value;
    },
    [isSelectAllOption, valueKey, labelKey]
  );

  const handleCheckboxChange = useCallback(
    (currentValue: StringArr, optionValue: string, checked: boolean) => {
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
    },
    [options, getOptionLabelOrValue, valueKey]
  );

  return (
    <FormControl error={isError}>
      <FormLabel
        label={fieldLabel}
        isVisible={isLabelAboveFormField}
        required={required}
        error={isError}
        formLabelProps={formLabelProps}
      />
      <Controller
        name={fieldName}
        control={control}
        rules={registerOptions}
        render={({
          field: { value, onChange, onBlur: rhfOnBlur, ...otherFieldProps }
        }) => {
          const selectedValues: StringArr = Array.isArray(value) ? value : [];
          const areAllSelected = selectedValues.length === options.length;
          const isIndeterminate = selectedValues.length > 0 && !areAllSelected;

          const selectedOptions = useMemo(
            () =>
              selectedValues
                .map(val =>
                  options.find(op =>
                    valueKey && isKeyValueOption(op, labelKey, valueKey)
                      ? op[valueKey] === val
                      : op === val))
                .filter((op): op is Option => Boolean(op)),
            [selectedValues, options, labelKey, valueKey]
          );

          const changeFieldState = useCallback(
            (newValues: StringArr, selectedValue?: string) => {
              onChange(newValues);
              onValueChange?.(newValues, selectedValue);
            },
            [onChange, onValueChange]
          );

          return (
            <Autocomplete
              {...otherFieldProps}
              id={fieldName}
              options={autoCompleteOptions}
              value={selectedOptions}
              multiple
              fullWidth
              autoHighlight
              disableCloseOnSelect
              onChange={(_, newValue, reason, details) => {
                const valueOfClickedItem = details?.option
                  ? getOptionLabelOrValue(details.option, valueKey) === selectAllText
                    ? selectAllOptionValue
                    : getOptionLabelOrValue(details.option, valueKey)
                  : undefined;

                if (reason === 'clear') {
                  changeFieldState([], valueOfClickedItem);
                }
                /**
                 * "removeOption" reason is being called even after unchecking a checkbox.
                 * This will also be called when a remove chip. I purposely need to check
                 * that if "SelectAll" option is being removed, then the flow should not
                 * go in the if block.
                 */
                if (reason === 'removeOption' && valueOfClickedItem) {
                  const fieldValue = newValue
                    .map(op => getOptionLabelOrValue(op, valueKey))
                    .filter(op => op !== valueOfClickedItem);
                  changeFieldState(fieldValue, valueOfClickedItem);
                }
              }}
              onBlur={blurEvent => {
                rhfOnBlur();
                onBlur?.(blurEvent);
              }}
              limitTags={2}
              getLimitTagsText={v => `+${v} More`}
              getOptionLabel={option => renderOptionLabel(option, true)}
              isOptionEqualToValue={isOptionEqualToValue}
              renderInput={params => {
                const {
                  autoComplete = defaultAutocompleteValue,
                  ...otherTextFieldProps
                } = textFieldProps ?? {};
                const inputProps = { ...params.inputProps, autoComplete };
                return (
                  <TextField
                    {...otherTextFieldProps}
                    {...params}
                    {...(selectedOptions.length > 0 && {
                      placeholder: undefined
                    })}
                    autoComplete={autoComplete}
                    label={
                      !isLabelAboveFormField
                        ? (
                          <FormLabelText label={fieldLabel} required={required} />
                        )
                        : undefined
                    }
                    error={isError}
                    {...(isAboveMuiV5
                      ? { slotProps: { htmlInput: inputProps } }
                      : {})}
                  />
                );
              }}
              renderOption={({ key, ...optionProps }, option) => {
                const isSelectAll = isSelectAllOption(option);
                const optionLabel = renderOptionLabel(option);
                const optionValue = isSelectAll
                  ? selectAllOptionValue
                  : getOptionLabelOrValue(option, valueKey);
                return (
                  <Box component="li" key={key} {...optionProps}>
                    <FormControlLabel
                      label={optionLabel}
                      control={
                        <Checkbox
                          {...checkboxProps}
                          name={fieldName}
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
              {...(isMuiV7AndAbove
                ? ({ renderValue: renderChips } as Partial<
                  AutocompleteProps<Option, true, false, false>
                >)
                : ({ renderTags: renderChips } as Partial<
                  AutocompleteProps<Option, true, false, false>
                >))}
              {...(isAboveMuiV5 ? { slotProps } : { ChipProps })}
              {...otherAutoCompleteProps}
            />
          );
        }}
      />
      <FormHelperText
        error={isError}
        errorMessage={errorMessage}
        hideErrorMessage={hideErrorMessage}
        helperText={helperText}
        formHelperTextProps={formHelperTextProps}
      />
    </FormControl>
  );
};

export default RHFMultiAutocomplete;
