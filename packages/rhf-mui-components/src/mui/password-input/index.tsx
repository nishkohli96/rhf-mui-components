import { useState, useContext, ChangeEvent, MouseEvent, ReactNode } from 'react';
import {
  UseFormRegister,
  RegisterOptions,
  Path,
  FieldValues
} from 'react-hook-form';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { FormHelperTextProps } from '@mui/material/FormHelperText';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { FormLabelProps } from '@/types';
import { fieldNameToLabel, keepLabelAboveFormField } from '@/utils';
import { FormControl, FormLabel, FormHelperText } from '../common';

export type RHFPasswordInputProps<T extends FieldValues> = {
  fieldName: Path<T>;
  register: UseFormRegister<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  onValueChange?: (
    value: string,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  showLabelAboveFormField?: boolean;
  formLabelProps?: FormLabelProps;
  showPasswordIcon?: ReactNode;
  hidePasswordIcon?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: Omit<FormHelperTextProps, 'children' | 'error'>;
} & Omit<TextFieldProps, 'name' | 'onChange' | 'error' | 'value'>;

const RHFPasswordInput = <T extends FieldValues>({
  fieldName,
  register,
  registerOptions,
  onValueChange,
  label,
  showLabelAboveFormField,
  formLabelProps,
  showPasswordIcon,
  hidePasswordIcon,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  ...rest
}: RHFPasswordInputProps<T>) => {
  const { allLabelsAboveFormField } = useContext(RHFMuiConfigContext);
  const isError = Boolean(errorMessage);
  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFormField
  );
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
        isVisible={isLabelAboveFormField}
        error={isError}
        formLabelProps={formLabelProps}
      />
      <TextField
        {...rest}
        onChange={event => {
          onChange(event);
          if(onValueChange) {
            onValueChange(event.target.value, event);
          }
        }}
        {...otherRegisterProps}
        autoComplete={fieldName}
        label={!isLabelAboveFormField ? fieldLabel : undefined}
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
        formHelperTextProps={formHelperTextProps}
      />
    </FormControl>
  );
};

export default RHFPasswordInput;
