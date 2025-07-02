import {
  useState,
  useContext,
  type ChangeEvent,
  type MouseEvent,
  type ReactNode
} from 'react';
import {
  Controller,
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { FormControl, FormLabel, FormLabelText, FormHelperText } from '@/mui/common';
import type { FormLabelProps, FormHelperTextProps, TextFieldProps } from '@/types';
import { fieldNameToLabel, keepLabelAboveFormField, isAboveMuiV5 } from '@/utils';

type InputPasswordProps = Omit<
  TextFieldProps,
  | 'type'
  | 'InputProps'
>;

export type RHFPasswordInputProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
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
  formHelperTextProps?: FormHelperTextProps;
} & InputPasswordProps;

const RHFPasswordInput = <T extends FieldValues>({
  fieldName,
  control,
  registerOptions,
  onValueChange,
  label,
  showLabelAboveFormField,
  formLabelProps,
  showPasswordIcon,
  hidePasswordIcon,
  required,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  slotProps,
  onBlur,
  ...rest
}: RHFPasswordInputProps<T>) => {
  const { allLabelsAboveFields } = useContext(RHFMuiConfigContext);
  const isError = Boolean(errorMessage);
  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );
  const fieldLabel = label ?? fieldNameToLabel(fieldName);

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
        required={required}
        error={isError}
        formLabelProps={formLabelProps}
      />
      <Controller
        name={fieldName}
        control={control}
        rules={registerOptions}
        render={({ field }) => {
          const { value, onChange, onBlur:rhfOnBlur, ...otherFieldParams } = field;
          const endAdornment = (
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
          );

          return (
            <TextField
              id={fieldName}
              autoComplete={fieldName}
              type={showPassword ? 'text' : 'password'}
              label={
                !isLabelAboveFormField
                  ? (
                    <FormLabelText label={fieldLabel} required={required} />
                  )
                  : undefined
              }
              value={value ?? ''}
              onChange={event => {
                onChange(event);
                onValueChange?.(event.target.value, event);
              }}
              onBlur={blurEvent => {
                rhfOnBlur();
                onBlur?.(blurEvent);
              }}
              error={isError}
              {...(isAboveMuiV5
                ? {
                  slotProps: {
                    ...slotProps,
                    input: { endAdornment }
                  }
                }
                : { InputProps: { endAdornment } }
              )}
              {...rest}
              {...otherFieldParams}
            />
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

export default RHFPasswordInput;
