import { useContext, Fragment, type ReactNode } from 'react';
import {
  Controller,
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import MuiSelect, { type SelectChangeEvent } from '@mui/material/Select';
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
  StringOrNumber,
  SelectProps,
  StrNumObjOption,
  SelectValueType
} from '@/types';
import {
  fieldNameToLabel,
  validateArray,
  isKeyValueOption,
  keepLabelAboveFormField,
} from '@/utils';

export type RHFSelectProps<
  T extends FieldValues,
  Option extends StrNumObjOption = StrNumObjOption
> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  options: Option[];
  renderOption?: (option: Option) => ReactNode;
  getOptionDisabled?: (option: Option) => boolean;
  labelKey?: string;
  valueKey?: string;
  showDefaultOption?: boolean;
  defaultOptionText?: string;
  customOnChange?: (
    rhfOnChange: (value: Option | Option[]) => void,
    event: SelectChangeEvent<SelectValueType>,
    child: ReactNode
  ) => void;
  onValueChange?: (
    newValue: StringOrNumber | StringOrNumber[],
    event: SelectChangeEvent<SelectValueType>,
    child: ReactNode
  ) => void;
  showLabelAboveFormField?: boolean;
  formLabelProps?: FormLabelProps;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
  placeholder?: string;
} & SelectProps;

const RHFSelect = <
  T extends FieldValues,
  Option extends StrNumObjOption = StrNumObjOption
>({
  fieldName,
  control,
  registerOptions,
  options,
  renderOption,
  getOptionDisabled,
  labelKey,
  valueKey,
  showDefaultOption,
  defaultOptionText,
  customOnChange,
  onValueChange,
  label,
  showLabelAboveFormField,
  formLabelProps,
  multiple,
  required,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  onBlur,
  autoComplete = defaultAutocompleteValue,
  renderValue,
  placeholder,
  ...otherSelectProps
}: RHFSelectProps<T, Option>) => {
  validateArray('RHFSelect', options, labelKey, valueKey);

  const { allLabelsAboveFields } = useContext(RHFMuiConfigContext);
  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );
  const fieldLabelText = fieldNameToLabel(fieldName);
  const fieldLabel = label ?? fieldLabelText;
  const SelectFormLabel = (
    <FormLabelText label={fieldLabel} required={required} />
  );
  const isError = Boolean(errorMessage);

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
          const isValueEmpty
            = !value
              || value === ''
              || (multiple && Array.isArray(value) && !value.length);
          const showPlaceholder = isValueEmpty && Boolean(placeholder);
          const selectLabelProp = isLabelAboveFormField || isValueEmpty
            ? undefined
            : SelectFormLabel;
          const labelId = isLabelAboveFormField ? undefined : fieldName;
          return (
            <Fragment>
              {!isLabelAboveFormField && !showPlaceholder && (
                <InputLabel id={fieldName}>
                  {SelectFormLabel}
                </InputLabel>
              )}
              <MuiSelect
                {...otherFieldProps}
                id={fieldName}
                autoComplete={autoComplete}
                labelId={labelId}
                label={selectLabelProp}
                value={value ?? (multiple ? [] : '')}
                error={isError}
                multiple={multiple}
                onChange={(event, child) => {
                  if(customOnChange) {
                    customOnChange(onChange, event, child);
                    return;
                  }
                  const selectedValue = event.target.value as StringOrNumber | StringOrNumber[];
                  onChange(selectedValue);
                  if (onValueChange) {
                    onValueChange(selectedValue, event, child);
                  }
                }}
                {...otherSelectProps}
                onBlur={blurEvent => {
                  rhfOnBlur();
                  onBlur?.(blurEvent);
                }}
                renderValue={(value: SelectValueType) => {
                  if (showPlaceholder) {
                    return placeholder;
                  }
                  /* For multiple options */
                  if (Array.isArray(value)) {
                    const labels = value.map(val => {
                      const match = options.find(op =>
                        isKeyValueOption(op, labelKey, valueKey)
                          ? `${op[valueKey!]}` === `${val}`
                          : op === val);
                      return isKeyValueOption(match!, labelKey, valueKey)
                        ? match[labelKey!]
                        : match;
                    });
                    return renderValue?.(value) ?? labels.join(', ');
                  }

                  /* For single option */
                  const match = options.find(op =>
                    isKeyValueOption(op, labelKey, valueKey)
                      ? `${op[valueKey!]}` === `${value}`
                      : op === value);
                  const optionLabel = isKeyValueOption(
                    match!,
                    labelKey,
                    valueKey
                  )
                    ? match[labelKey!]
                    : match;
                  return renderValue?.(value) ?? optionLabel;
                }}
              >
                <MenuItem
                  value=""
                  disabled
                  sx={{ display: showDefaultOption ? 'block' : 'none' }}
                >
                  {defaultOptionText ?? `Select ${fieldLabelText}`}
                </MenuItem>
                {options.map(option => {
                  const isObject = isKeyValueOption(option, labelKey, valueKey);
                  const opnValue: StringOrNumber = isObject
                    ? `${option[valueKey!]}`
                    : option;
                  const opnLabel = isObject
                    ? `${option[labelKey!]}`
                    : String(option);
                  return (
                    <MenuItem
                      key={opnValue}
                      value={opnValue}
                      disabled={getOptionDisabled?.(option)}
                    >
                      {renderOption?.(option) ?? opnLabel}
                    </MenuItem>
                  );
                })}
              </MuiSelect>
            </Fragment>
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

export default RHFSelect;
