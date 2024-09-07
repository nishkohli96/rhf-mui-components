import { Fragment, ReactNode } from 'react';
import {
  UseFormRegister,
  RegisterOptions,
  Path,
  FieldValues,
} from 'react-hook-form';
import MenuItem from '@mui/material/MenuItem';
import { FormLabelProps } from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import { FormHelperTextProps } from '@mui/material/FormHelperText';
import MuiSelect, {
  SelectChangeEvent,
  SelectProps,
} from '@mui/material/Select';
import { FormControl, FormLabel, FormHelperText } from '../../common';
import withConfigHOC from '../../../config/withConfig';
import { RHFMuiConfig, OptionType } from '../../../types';
import {
  fieldNameToLabel,
  validateArray,
  isKeyValueOption,
} from '../../../utils';

type SelectValueType = OptionType | OptionType[];

export type RHFSelectProps<T extends FieldValues> = {
  fieldName: Path<T>;
  register: UseFormRegister<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  options: OptionType[];
  labelKey?: string;
  valueKey?: string;
  defaultValue?: SelectValueType;
  showDefaultOption?: boolean;
  defaultOptionText?: string;
  onValueChange?: (e: SelectChangeEvent<SelectValueType>) => void;
  showLabelAboveFormField?: boolean;
  formLabelProps?: Omit<FormLabelProps, 'error'>;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: Omit<FormHelperTextProps, 'children' | 'error'>;
} & Omit<
  SelectProps,
  'name' | 'id' | 'labelId' | 'error' | 'onChange' | 'value' | 'defaultValue'
>;

function Select<T extends FieldValues>({
  fieldName,
  register,
  registerOptions,
  options,
  labelKey,
  valueKey,
  defaultValue,
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
  defaultFormLabelSx,
  defaultFormHelperTextSx,
  ...otherSelectProps
}: RHFSelectProps<T> & RHFMuiConfig) {
  const isError = Boolean(errorMessage);
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  validateArray('RHFSelect', options, labelKey, valueKey);

  const { onChange, ...rest } = register(fieldName, registerOptions);

  return (
    <FormControl error={isError}>
      <FormLabel
        label={fieldLabel}
        isVisible={showLabelAboveFormField}
        error={isError}
        formLabelProps={formLabelProps}
        defaultFormLabelSx={defaultFormLabelSx}
      />
      <Fragment>
        {!showLabelAboveFormField && (
          <InputLabel id={fieldName}>{fieldLabel}</InputLabel>
        )}
      </Fragment>
      <MuiSelect
        id={fieldName}
        labelId={showLabelAboveFormField ? undefined : fieldName}
        label={showLabelAboveFormField ? undefined : fieldName}
        defaultValue={defaultValue ?? ( multiple ? [] : '')}
        error={isError}
        multiple={multiple}
        onChange={(e) => {
          onChange(e);
          onValueChange && onValueChange(e);
        }}
        {...otherSelectProps}
        {...rest}
      >
        <MenuItem
          value=""
          disabled
          sx={{ display: showDefaultOption ? 'block' : 'none' }}
        >
          {showDefaultOption ? defaultOptionText ?? `Select ${fieldLabel}` : ''}
        </MenuItem>
        {options.map((option) => {
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
      <FormHelperText
        error={isError}
        errorMessage={errorMessage}
        hideErrorMessage={hideErrorMessage}
        helperText={helperText}
        defaultFormHelperTextSx={defaultFormHelperTextSx}
        formHelperTextProps={formHelperTextProps}
      />
    </FormControl>
  );
}

export const RHFSelect = withConfigHOC(Select);
