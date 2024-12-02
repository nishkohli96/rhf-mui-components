import { ReactNode, useState, useContext, useCallback } from 'react';
import {
  FieldValues,
  Path,
  Controller,
  Control,
  RegisterOptions
} from 'react-hook-form';
import Box from '@mui/material/Box';
import Autocomplete, {
  AutocompleteProps,
  AutocompleteChangeDetails,
  AutocompleteChangeReason
} from '@mui/material/Autocomplete';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { FormControl, FormLabel, FormHelperText } from '@/mui/common';
import {
  FormLabelProps,
  FormControlLabelProps,
  FormHelperTextProps,
  KeyValueOption,
	StringArr,
	TrueOrFalse,
	AutocompleteOptionType
} from '@/types';
import {
  fieldNameToLabel,
  validateArray,
  isKeyValueOption,
  isMuiV6
} from '@/utils';

type AutoCompleteProps = Omit<
  AutocompleteProps<AutocompleteOptionType, TrueOrFalse, TrueOrFalse, TrueOrFalse>,
  | 'freeSolo'
  | 'fullWidth'
  | 'renderInput'
  | 'renderOption'
  | 'options'
  | 'value'
  | 'defaultValue'
  | 'onChange'
  | 'getOptionKey'
  | 'getOptionLabel'
  | 'isOptionEqualToValue'
  | 'autoHighlight'
  | 'disableCloseOnSelect'
>;

type AutoCompleteTextFieldProps = Omit<
  TextFieldProps,
  | 'value'
  | 'onChange'
  | 'disabled'
  | 'inputProps'
  | 'slotProps'
  | 'label'
  | 'error'
>;

export type RHFAutocompleteProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  options: AutocompleteOptionType[];
  labelKey?: string;
  valueKey?: string;
  onValueChange?: (
    fieldValue: StringArr,
    targetValue?: string
  ) => void;
  label?: ReactNode;
  showLabelAboveFormField?: boolean;
  formLabelProps?: FormLabelProps;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
  textFieldProps?: AutoCompleteTextFieldProps;
} & AutoCompleteProps;

const RHFAutocomplete = <T extends FieldValues>({
  fieldName,
  control,
  registerOptions,
  options,
	multiple,
  labelKey,
  valueKey,
  onValueChange,
  label,
  showLabelAboveFormField,
  formLabelProps,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  textFieldProps,
  ...otherAutoCompleteProps
}: RHFAutocompleteProps<T>) => {
  validateArray('RHFAutocomplete', options, labelKey, valueKey);

  const [selectedValues, setSelectedValues] = useState<StringArr>([]);
  const { allLabelsAboveFields } = useContext(RHFMuiConfigContext);

  const isLabelAboveFormField = showLabelAboveFormField ?? allLabelsAboveFields;
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isError = Boolean(errorMessage);

  const autoCompleteOptions: AutocompleteOptionType[] = [
    ...options,
  ];

  const renderOptionLabel = (option: AutocompleteOptionType): string =>
    labelKey && isKeyValueOption(option, labelKey, valueKey)
      ? option[labelKey]
      : (option as string);

  return (
    <FormControl error={isError}>
      <FormLabel
        label={fieldLabel}
        isVisible={isLabelAboveFormField}
        error={isError}
        formLabelProps={formLabelProps}
      />
      <Controller
        name={fieldName}
        control={control}
        rules={registerOptions}
        render={({ field: { onChange, ...otherFieldProps } }) => {
					// const selectedOptions = multiple
          //   ? (value ?? [])
					// 	.map(val => countrySelectOptions.find(country => country[valueKey] === val))
					// 	.filter((country): country is CountryDetails => Boolean(country))
					// : countrySelectOptions.find(country => country[valueKey] === value) || null;

          return (
            <Autocomplete
              {...otherFieldProps}
              id={fieldName}
              options={autoCompleteOptions}
              multiple={multiple}
              value={selectedValues}
              autoHighlight
              disableCloseOnSelect={multiple}
							fullWidth
              // onChange={(_, newValue, reason, details) => {
              //   const valueOfClickedItem = details?.option as string | undefined;  
              //   if (reason === 'clear') {
              //     changeFieldState([], valueOfClickedItem);
              //   }
              //   if (reason === 'removeOption') {
              //     changeFieldState(newValue as StringArr, valueOfClickedItem);
              //   }
              // }}
              limitTags={3}
              getLimitTagsText={value => `+${value} More`}
              getOptionLabel={option => renderOptionLabel(option)}
              isOptionEqualToValue={(option, value) => {
                const opnValue = valueKey && isKeyValueOption(option, labelKey, valueKey)
                  ? option[valueKey]
                  : option;
                return (value as StringArr).includes(opnValue);
              }}
              renderInput={params => (
                <TextField
                  {...textFieldProps}
                  {...params}
                  label={!isLabelAboveFormField ? fieldLabel : undefined}
                  error={isError}
                  {...(isMuiV6
                    ? {
                      slotProps: {
                        htmlInput: {
                          ...params.inputProps,
                          autoComplete: fieldName
                        }
                      }
                    }
                    : {
                      inputProps: {
                        ...params.inputProps,
                        autoComplete: fieldName
                      }
                    })}
                />
              )}
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

export default RHFAutocomplete;
