import { ReactNode, useContext } from 'react';
import {
  FieldValues,
  Path,
  Controller,
  Control,
  RegisterOptions
} from 'react-hook-form';
import Autocomplete, {
  AutocompleteProps,
  AutocompleteChangeDetails,
  AutocompleteChangeReason
} from '@mui/material/Autocomplete';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { FormControl, FormLabel, FormHelperText } from '@/mui/common';
import {
  FormLabelProps,
  FormHelperTextProps,
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
        render={({ field: { value, onChange, ...otherFieldProps } }) => {
          // 	console.log('value: ', value);

          const selectedOptions = multiple
            ? value ?? []
            : value ?? '';
          return (
            <Autocomplete
              {...otherFieldProps}
              id={fieldName}
              options={autoCompleteOptions}
              multiple={multiple}
              value={selectedOptions}
              autoHighlight
              disableCloseOnSelect={multiple}
              blurOnSelect={!multiple}
              fullWidth
              onChange={(event, newValue, reason, details) => {
                console.log('details: ', details);
                console.log('newValue: ', newValue);
                const newValueKey = Array.isArray(newValue)
                  ? (newValue ?? []).map(item =>
                    valueKey && isKeyValueOption(item, labelKey, valueKey)
                      ? item[valueKey]
                      : item)
                  : valueKey && isKeyValueOption(newValue!, labelKey, valueKey)
                    ? newValue[valueKey]
                    : newValue;
                console.log('newValueKey: ', newValueKey);
                onChange(newValueKey);
                if (onValueChange) {
                  // onValueChange(newValue, event, reason, details);
                }
              }}
              limitTags={3}
              getLimitTagsText={value => `+${value} More`}
              getOptionLabel={option => renderOptionLabel(option)}
              isOptionEqualToValue={(option, value) => {
                const opnValue = valueKey && isKeyValueOption(option, labelKey, valueKey)
                  ? option[valueKey]
                  : option;
                return multiple
                  ? (value as StringArr).includes(opnValue)
                  : value === opnValue;
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
