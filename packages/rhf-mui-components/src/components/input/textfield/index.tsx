import { ReactNode, ChangeEvent } from 'react';
import {
  UseFormRegister,
  Path,
  FieldValues,
  RegisterOptions
} from 'react-hook-form';
import { FormHelperTextProps } from '@mui/material/FormHelperText';
import { FormLabelProps } from '@mui/material/FormLabel';
import MuiTextField, { TextFieldProps } from '@mui/material/TextField';
import { FormControl, FormLabel, FormHelperText } from '../../common';
import withConfigHOC from '../../../config/withConfig';
import { RHFMuiConfig } from '../../../types';
import { fieldNameToLabel } from '../../../utils';

export type RHFTextFieldProps<T extends FieldValues> = {
  fieldName: Path<T>;
  register: UseFormRegister<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  onValueChange?: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  errorMsg?: ReactNode;
  hideErrorMsg?: boolean;
  showLabelAboveFormField?: boolean;
  formLabelProps?: Omit<FormLabelProps, 'error'>;
  formHelperTextProps?: Omit<FormHelperTextProps, 'children' | 'error'>;
} & Omit<TextFieldProps, 'name' | 'onChange' | 'error' | 'value'>;

function TextField<T extends FieldValues>(
  props: RHFTextFieldProps<T> & RHFMuiConfig
) {
  const {
    fieldName,
    register,
    registerOptions,
    onValueChange,
    errorMsg,
    hideErrorMsg,
    showLabelAboveFormField,
    formLabelProps,
    formHelperTextProps,
    label,
    helperText,
    defaultFormLabelSx,
    defaultFormHelperTextSx,
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
      <MuiTextField
        autoComplete={fieldName}
        {...rest}
        onChange={e => {
          onChange(e);
          onValueChange && onValueChange(e);
        }}
        {...otherRegisterProps}
        label={!showLabelAboveFormField ? fieldLabel : undefined}
        error={isError}
      />
      <FormHelperText
        error={isError}
        errorMsg={errorMsg}
        hideErrorMsg={hideErrorMsg}
        helperText={helperText}
        defaultFormHelperTextSx={defaultFormHelperTextSx}
        formHelperTextProps={formHelperTextProps}
      />
    </FormControl>
  );
}

export const RHFTextField = withConfigHOC(TextField);