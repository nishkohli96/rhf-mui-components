import { ReactNode, SyntheticEvent, useContext } from 'react';
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
import TextField from '@mui/material/TextField';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { FormControl, FormLabel, FormLabelText, FormHelperText } from '@/mui/common';
import {
  FormLabelProps,
  FormHelperTextProps,
  KeyValueOption,
  TrueOrFalse,
  StrObjOption,
  AutoCompleteTextFieldProps
} from '@/types';
import {
  fieldNameToLabel,
  validateArray,
  isKeyValueOption,
  isMuiV6
} from '@/utils';

type OmittedAutocompleteProps = Omit<
  AutocompleteProps<StrObjOption, TrueOrFalse, TrueOrFalse, TrueOrFalse>,
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
  | 'blurOnSelect'
  | 'disableCloseOnSelect'
>;

export type RHFAutocompleteProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  options: StrObjOption[];
  labelKey?: string;
  valueKey?: string;
  onValueChange?: (
    fieldValue: string | string[] | null,
    event: SyntheticEvent<Element, Event>,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<StrObjOption>
  ) => void;
  label?: ReactNode;
  showLabelAboveFormField?: boolean;
  formLabelProps?: FormLabelProps;
  required?: boolean;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
  textFieldProps?: AutoCompleteTextFieldProps;
} & OmittedAutocompleteProps;

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
  required,
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

  const renderOptionLabel = (option: StrObjOption): string =>
    labelKey && isKeyValueOption(option, labelKey, valueKey)
      ? option[labelKey]
      : (option as string);

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
        render={({ field: { value, onChange, ...otherFieldProps } }) => {
          /**
					 * When considering for the case when options is an array of objects,
					 * the values would be an array or a single "valueKey" from these options.
					 * So, I need to get back the selected options using these values and then
					 * pass back these list of options as the value prop for Autocomplete.
					 */
          const selectedOptions = multiple
            ? (value ?? []).map(val =>
              options.find(opn =>
                valueKey && isKeyValueOption(opn, labelKey, valueKey)
                  ? opn[valueKey] === val
                  : opn === val))
            : options.find(opn =>
              valueKey && isKeyValueOption(opn, labelKey, valueKey)
                ? opn[valueKey] === value
                : opn === value) ?? null;
          return (
            <Autocomplete
              {...otherFieldProps}
              id={fieldName}
              options={options}
              multiple={multiple}
              value={selectedOptions}
              autoHighlight
              blurOnSelect={!multiple}
              disableCloseOnSelect={multiple}
              fullWidth
              onChange={(
                event,
                newValue,
                reason: AutocompleteChangeReason,
                details?: AutocompleteChangeDetails<StrObjOption>
              ) => {
                const fieldValue = newValue === null
                  ? null
                  : Array.isArray(newValue)
                    ? (newValue ?? []).map(item =>
                      valueKey && isKeyValueOption(item, labelKey, valueKey)
                        ? item[valueKey]
                        : item)
                    : valueKey && isKeyValueOption(newValue, labelKey, valueKey)
                      ? newValue[valueKey]
                      : newValue;
                onChange(fieldValue);
                onValueChange?.(fieldValue, event, reason, details);
              }}
              limitTags={3}
              getLimitTagsText={value => `+${value} More`}
              getOptionLabel={renderOptionLabel}
              isOptionEqualToValue={(option, value) => {
                if (valueKey && isKeyValueOption(option, labelKey, valueKey)) {
                  return (
                    option[valueKey] === (value as KeyValueOption)[valueKey]
                  );
                }
                return option === value;
              }}
              renderInput={params => (
                <TextField
                  {...textFieldProps}
                  {...params}
                  label={
                    !isLabelAboveFormField ? (
                      <FormLabelText label={fieldLabel} required={required} />
                    ) : undefined
                  }
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
