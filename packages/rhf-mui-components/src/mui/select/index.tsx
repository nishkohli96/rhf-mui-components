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
  SelectProps
} from '@/types';
import {
  fieldNameToLabel,
  validateArray,
  isKeyValueOption,
  keepLabelAboveFormField,
} from '@/utils';

export type BaseOption = StringOrNumber | Record<string, any>;
type SelectValueType = BaseOption | BaseOption[];

export type RHFSelectProps<
  T extends FieldValues,
  Option extends BaseOption = BaseOption
> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  options: Option[];
  renderOption?: (option: Option) => ReactNode;
  shouldDisableOption?: (option: Option) => boolean;
  labelKey?: string;
  valueKey?: string;
  showDefaultOption?: boolean;
  defaultOptionText?: string;
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
} & SelectProps;

const RHFSelect = <
  T extends FieldValues,
  Option extends BaseOption = BaseOption
>({
  fieldName,
  control,
  registerOptions,
  options,
  renderOption,
  shouldDisableOption,
  labelKey,
  valueKey,
  showDefaultOption,
  defaultOptionText,
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
      <Fragment>
        {!isLabelAboveFormField && (
          <InputLabel id={fieldName}>{SelectFormLabel}</InputLabel>
        )}
      </Fragment>
      <Controller
        name={fieldName}
        control={control}
        rules={registerOptions}
        render={({
          field: { value, onChange, onBlur: rhfOnBlur, ...otherFieldProps }
        }) => {
          return (
            <MuiSelect
              {...otherFieldProps}
              id={fieldName}
              autoComplete={autoComplete}
              labelId={isLabelAboveFormField ? undefined : fieldName}
              label={isLabelAboveFormField ? undefined : SelectFormLabel}
              value={value ?? (multiple ? [] : '')}
              error={isError}
              multiple={multiple}
              onChange={(event, child) => {
                const selectedValue = event.target.value as StringOrNumber | StringOrNumber[];
                onChange(selectedValue);
                if (onValueChange) {
                  onValueChange(selectedValue, event, child);
                }
              }}
              {...otherSelectProps}
              onBlur={(blurEvent) => {
                rhfOnBlur();
                onBlur?.(blurEvent);
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
                  ? `${option[valueKey ?? '']}`
                  : option;
                const opnLabel = isObject
                  ? `${option[labelKey ?? '']}`
                  : String(option);
                return (
                  <MenuItem
                    key={opnValue}
                    value={opnValue}
                    disabled={shouldDisableOption?.(option)}
                  >
                    {renderOption?.(option) ?? opnLabel}
                  </MenuItem>
                );
              })}
            </MuiSelect>
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
