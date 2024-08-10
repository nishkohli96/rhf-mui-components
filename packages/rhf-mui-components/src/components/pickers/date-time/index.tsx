import { ReactNode } from 'react';
import {
  UseFormRegister,
  UseFormSetValue,
  Path,
  FieldValues,
  RegisterOptions
} from 'react-hook-form';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { FormHelperTextProps } from '@mui/material/FormHelperText';
import { FormLabelProps } from '@mui/material/FormLabel';
import { 
	DateTimePicker as MuiDateTimePicker,
	DateTimePickerProps
} from '@mui/x-date-pickers/DateTimePicker';
import { PickerValidDate } from '@mui/x-date-pickers';
import { FormControl, FormLabel, FormHelperText } from '../../common';
import withConfigHOC from '../../../config/withConfig';
import { RHFMuiConfig } from '../../../types';
import { fieldNameToLabel } from '../../../utils';

export type RHFDateTimePickerProps<T extends FieldValues> = {
  fieldName: Path<T>;
  register: UseFormRegister<T>;
  registerOptions?: RegisterOptions;
  setValue: UseFormSetValue<T>;
  onValueChange?: (newValue: unknown) => void;
  errorMsg?: ReactNode;
  hideErrorMsg?: boolean;
  helperText?: ReactNode;
  showLabelAboveFormField?: boolean;
  formLabelProps: Omit<FormLabelProps, 'error'>;
  formHelperTextProps?: Omit<FormHelperTextProps, 'children' | 'error'>;
} & Omit<DateTimePickerProps<PickerValidDate>, 'value' | 'onChange'>;

export function DateTimePicker<T extends FieldValues>(
  props: RHFDateTimePickerProps<T> & RHFMuiConfig
) {
  const {
    fieldName,
    register,
    setValue,
    onValueChange,
    registerOptions,
    errorMsg,
    hideErrorMsg,
    showLabelAboveFormField,
    formLabelProps,
    formHelperTextProps,
    label,
    helperText,
    defaultFormHelperTextSx,
    defaultFormLabelSx,
    dateAdapter,
    ...rest
  } = props;
  const isError = Boolean(errorMsg);
  const fieldLabel = label ?? fieldNameToLabel(fieldName);

  const { onChange, ...otherRegisterProps } = register(
    fieldName,
    registerOptions
  );

  return (
    <FormControl error={isError}>
      <FormLabel
        label={fieldLabel}
        isVisible={showLabelAboveFormField}
        error={isError}
        formLabelProps={formLabelProps}
        defaultFormLabelSx={defaultFormLabelSx}
      />
      {/* @ts-ignore */}
      <LocalizationProvider dateAdapter={dateAdapter}>
        <MuiDateTimePicker
          onChange={(newValue) => {
            setValue(fieldName, newValue as T[typeof fieldName]);
            onValueChange && onValueChange(newValue);
          }}
          label={!showLabelAboveFormField ? fieldLabel : undefined}
          {...otherRegisterProps}
          {...rest}
        />
      </LocalizationProvider>
      <FormHelperText
        error={isError}
        errorMsg={errorMsg}
        hideErrorMsg={hideErrorMsg}
        helperText={helperText}
        defaultFormHelperTextSx={defaultFormHelperTextSx}
      />
    </FormControl>
  );
}

export const RHFDateTimePicker = withConfigHOC(DateTimePicker);
