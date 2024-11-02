import { useContext, ReactNode, ChangeEvent } from 'react';
import {
  UseFormRegister,
  Path,
  FieldValues,
  RegisterOptions
} from 'react-hook-form';
import { FormLabelProps } from '@mui/material/FormLabel';
import { FormHelperTextProps } from '@mui/material/FormHelperText';
import MuiTextField, { TextFieldProps } from '@mui/material/TextField';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { fieldNameToLabel, keepLabelAboveFormField } from '@/utils';
import { FormControl, FormLabel, FormHelperText } from '../common';

export type RHFTextFieldProps<T extends FieldValues> = {
  fieldName: Path<T>;
  register: UseFormRegister<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  onValueChange?: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  showLabelAboveFormField?: boolean;
  formLabelProps?: Omit<FormLabelProps, 'error'>;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: Omit<FormHelperTextProps, 'children' | 'error'>;
} & Omit<TextFieldProps, 'name' | 'onChange' | 'error' | 'value'>;

const RHFTextField = <T extends FieldValues>({
  fieldName,
  register,
  registerOptions,
  onValueChange,
  label,
  showLabelAboveFormField,
  formLabelProps,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  ...rest
}: RHFTextFieldProps<T>) => {
  const { defaultFormLabelSx, defaultFormHelperTextSx, allLabelsAboveFormField } = useContext(RHFMuiConfigContext);
  const isError = Boolean(errorMessage);
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isLabelAboveFormField = keepLabelAboveFormField(showLabelAboveFormField, allLabelsAboveFormField);

  const { onChange, ...otherRegisterProps } = register(
    fieldName,
    registerOptions
  );

  return (
    <FormControl error={isError}>
      <FormLabel
        label={fieldLabel}
        isVisible={isLabelAboveFormField}
        error={isError}
        formLabelProps={formLabelProps}
        defaultFormLabelSx={defaultFormLabelSx}
      />
      <MuiTextField
        autoComplete={fieldName}
        {...rest}
        onChange={e => {
          onChange(e);
          if(onValueChange) {
            onValueChange(e);
          }
        }}
        {...otherRegisterProps}
        label={!isLabelAboveFormField ? fieldLabel : undefined}
        error={isError}
      />
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

export default RHFTextField;
