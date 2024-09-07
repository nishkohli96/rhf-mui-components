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
  DatePicker as MuiDatePicker,
  DatePickerProps
} from '@mui/x-date-pickers/DatePicker';
import { PickerValidDate } from '@mui/x-date-pickers';
import { FormControl, FormLabel, FormHelperText } from '../../common';
import withConfigHOC from '../../../config/withConfig';
import { RHFMuiConfig } from '../../../types';
import { fieldNameToLabel } from '../../../utils';

export type RHFDatePickerProps<T extends FieldValues> = {
  fieldName: Path<T>;
  register: UseFormRegister<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  setValue: UseFormSetValue<T>;
  onValueChange?: (newValue: unknown) => void;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  showLabelAboveFormField?: boolean;
  formLabelProps: Omit<FormLabelProps, 'error'>;
  formHelperTextProps?: Omit<FormHelperTextProps, 'children' | 'error'>;
} & Omit<DatePickerProps<PickerValidDate>, 'value' | 'onChange'>;

export function DatePicker<T extends FieldValues>(
  props: RHFDatePickerProps<T> & RHFMuiConfig
) {
  const {
    fieldName,
    register,
    registerOptions,
    setValue,
    onValueChange,
    helperText,
    errorMessage,
    hideErrorMessage,
    showLabelAboveFormField,
    formLabelProps,
    formHelperTextProps,
    label,
    defaultFormHelperTextSx,
    defaultFormLabelSx,
    dateAdapter,
    ...rest
  } = props;
  const isError = Boolean(errorMessage);
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
        <MuiDatePicker
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
        errorMessage={errorMessage}
        hideErrorMessage={hideErrorMessage}
        helperText={helperText}
        defaultFormHelperTextSx={defaultFormHelperTextSx}
      />
    </FormControl>
  );
}

export const RHFDatePicker = withConfigHOC(DatePicker);
