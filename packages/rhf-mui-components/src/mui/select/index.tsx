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
  FormHelperText
} from '@/mui/common';
import type {
  FormLabelProps,
  FormHelperTextProps,
  StrNumObjOption,
  SelectProps
} from '@/types';
import {
  fieldNameToLabel,
  validateArray,
  isKeyValueOption,
  keepLabelAboveFormField,
} from '@/utils';

type SelectValueType = StrNumObjOption | StrNumObjOption[];

export type RHFSelectProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  options: StrNumObjOption[];
  labelKey?: string;
  valueKey?: string;
  showDefaultOption?: boolean;
  defaultOptionText?: string;
  onValueChange?: (
    newValue: SelectValueType,
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

const RHFSelect = <T extends FieldValues>({
  fieldName,
  control,
  registerOptions,
  options,
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
  ...otherSelectProps
}: RHFSelectProps<T>) => {
  validateArray('RHFSelect', options, labelKey, valueKey);

  const { allLabelsAboveFields } = useContext(RHFMuiConfigContext);
  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const SelectFormLabel = <FormLabelText label={fieldLabel} required={required} />;
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
          <InputLabel id={fieldName} >
            {SelectFormLabel}
          </InputLabel>
        )}
      </Fragment>
      <Controller
        name={fieldName}
        control={control}
        rules={registerOptions}
        render={({ field: { value, onChange, ...otherFieldProps } }) => {
          return (
            <MuiSelect
              {...otherFieldProps}
              id={fieldName}
              labelId={isLabelAboveFormField ? undefined : fieldName}
              label={isLabelAboveFormField ? undefined : SelectFormLabel}
              value={value ?? (multiple ? [] : '')}
              error={isError}
              multiple={multiple}
              onChange={(event, child) => {
                const selectedValue = event.target.value;
                onChange(selectedValue);
                if (onValueChange) {
                  onValueChange(selectedValue, event, child);
                }
              }}
              {...otherSelectProps}
            >
              <MenuItem
                value=""
                disabled
                sx={{ display: showDefaultOption ? 'block' : 'none' }}
              >
                {showDefaultOption ? defaultOptionText ?? `Select ${fieldLabel}` : ''}
              </MenuItem>
              {options.map(option => {
                const isObject = isKeyValueOption(option, labelKey, valueKey);
                const opnValue = isObject ? `${option[valueKey ?? '']}` : option;
                const opnLabel = isObject ? `${option[labelKey ?? '']}` : option;
                return (
                  <MenuItem key={opnValue} value={opnValue}>
                    {opnLabel}
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
