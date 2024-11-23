import { useContext, Fragment, ReactNode } from 'react';
import {
  FieldValues,
  Path,
  Controller,
  Control,
  RegisterOptions
} from 'react-hook-form';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import MuiSelect, { SelectChangeEvent, SelectProps } from '@mui/material/Select';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { FormControl, FormLabel, FormHelperText } from '@/mui/common';
import { FormLabelProps, FormHelperTextProps, OptionType } from '@/types';
import {
  fieldNameToLabel,
  validateArray,
  isKeyValueOption,
  keepLabelAboveFormField,
} from '@/utils';

type SelectValueType = OptionType | OptionType[];

type SelectInputProps = Omit<SelectProps,
| 'name'
| 'id'
| 'labelId'
| 'error'
| 'onChange'
| 'value'
| 'defaultValue'
| 'onBlur'
| 'ref'
>;

export type RHFSelectProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  options: OptionType[];
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
} & SelectInputProps;

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
  const isError = Boolean(errorMessage);

  return (
    <FormControl error={isError}>
      <FormLabel
        label={fieldLabel}
        isVisible={isLabelAboveFormField}
        error={isError}
        formLabelProps={formLabelProps}
      />
      <Fragment>
        {!isLabelAboveFormField && (
          <InputLabel id={fieldName}>
            {fieldLabel}
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
              label={isLabelAboveFormField ? undefined : fieldName}
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
