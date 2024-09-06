import { useState, ChangeEvent, MouseEvent, ReactNode } from 'react';
import {
  UseFormRegister,
  RegisterOptions,
  Path,
  FieldValues
} from 'react-hook-form';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { FormLabelProps } from '@mui/material/FormLabel';
import { FormHelperTextProps } from '@mui/material/FormHelperText';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { FormControl, FormLabel, FormHelperText } from '../../common';
import withConfigHOC from '../../../config/withConfig';
import { RHFMuiConfig } from '../../../types';
import { fieldNameToLabel } from '../../../utils';
;
export type RHFPasswordFieldProps<T extends FieldValues> = {
  fieldName: Path<T>;
  register: UseFormRegister<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  onValueChange?: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  showPasswordIcon?: ReactNode;
  hidePasswordIcon?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  showLabelAboveFormField?: boolean;
  formLabelProps?: Omit<FormLabelProps, 'error'>;
	formHelperTextProps?: Omit<FormHelperTextProps, 'children' | 'error'>;
} & Omit<TextFieldProps, 'name' | 'onChange' | 'error' | 'value'>;

function PasswordField<T extends FieldValues>(
  props: RHFPasswordFieldProps<T> & RHFMuiConfig
) {
  const {
    fieldName,
    register,
    registerOptions,
    onValueChange,
    showPasswordIcon,
    hidePasswordIcon,
    errorMessage,
    hideErrorMessage,
    showLabelAboveFormField,
    formLabelProps,
    formHelperTextProps,
    label,
    helperText,
    defaultFormLabelSx,
    defaultFormHelperTextSx,
    ...rest
  } = props;

  const isError = Boolean(errorMessage);
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const { onChange, ...otherRegisterProps } = register(
    fieldName,
    registerOptions
  );

  const [showPassword, setShowPassword] = useState(false);
  const ShowPasswordIcon = showPasswordIcon ?? <VisibilityOffIcon />;
  const HidePasswordIcon = hidePasswordIcon ?? <VisibilityIcon />;

  const handleClickShowPassword = () => setShowPassword(show => !show);
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <FormControl error={isError}>
      <FormLabel
        label={fieldLabel}
        isVisible={showLabelAboveFormField}
        error={isError}
        formLabelProps={formLabelProps}
        defaultFormLabelSx={defaultFormLabelSx}
      />
      <TextField
        {...rest}
        onChange={e => {
          onChange(e);
          onValueChange && onValueChange(e);
        }}
        {...otherRegisterProps}
        autoComplete={fieldName}
        label={!showLabelAboveFormField ? fieldLabel : undefined}
        error={isError}
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="Toggle Password Visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? HidePasswordIcon : ShowPasswordIcon}
              </IconButton>
            </InputAdornment>
          )
        }}
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

export const RHFPasswordField = withConfigHOC(PasswordField);
