import { useContext, ReactNode } from 'react';
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
  TimePicker as MuiTimePicker,
  TimePickerProps,
  PickerValidDate
} from '@mui/x-date-pickers';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { FormControl, FormLabel, FormHelperText } from '@/mui/common';
import { fieldNameToLabel, keepLabelAboveFormField } from '@/utils';

export type RHFTimePickerProps<T extends FieldValues> = {
  fieldName: Path<T>;
  register: UseFormRegister<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  setValue: UseFormSetValue<T>;
  onValueChange?: (newValue: PickerValidDate | null) => void;
  showLabelAboveFormField?: boolean;
  formLabelProps?: Omit<FormLabelProps, 'error'>;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: Omit<FormHelperTextProps, 'children' | 'error'>;
} & Omit<TimePickerProps<PickerValidDate>, 'value' | 'onChange'>;

const RHFTimePicker = <T extends FieldValues>({
  fieldName,
  register,
  registerOptions,
  setValue,
  onValueChange,
  label,
  showLabelAboveFormField,
  formLabelProps,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  ...rest
}: RHFTimePickerProps<T>) => {
  const {
    defaultFormHelperTextSx,
    defaultFormLabelSx,
    dateAdapter,
    allLabelsAboveFormField
  } = useContext(RHFMuiConfigContext);
  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFormField
  );
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isError = Boolean(errorMessage);

  const { onChange, ...otherRegisterProps } = register(fieldName, registerOptions);

  return (
    <FormControl error={isError}>
      <FormLabel
        label={fieldLabel}
        isVisible={isLabelAboveFormField}
        error={isError}
        formLabelProps={formLabelProps}
        defaultFormLabelSx={defaultFormLabelSx}
      />
      <LocalizationProvider dateAdapter={dateAdapter}>
        <MuiTimePicker
          onChange={newValue => {
            setValue(fieldName, newValue as T[typeof fieldName]);
            onValueChange?.(newValue);
          }}
          label={!isLabelAboveFormField ? fieldLabel : undefined}
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
        formHelperTextProps={formHelperTextProps}
      />
    </FormControl>
  );
}

export default RHFTimePicker;
