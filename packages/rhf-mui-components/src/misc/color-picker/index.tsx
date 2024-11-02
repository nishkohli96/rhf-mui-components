import { ReactNode } from 'react';
import { FieldValues, Path } from 'react-hook-form';
import { ColorPicker as ReactColorPicker, IColor, useColor } from 'react-color-palette';
import { FormHelperTextProps } from '@mui/material/FormHelperText';
import { FormLabelProps } from '@mui/material/FormLabel';
import { FormControl, FormLabel, FormHelperText } from '@/mui/common';
import { fieldNameToLabel } from '@/utils';
import 'react-color-palette/css';

export type RHFColorPickerProps<T extends FieldValues> = {
  fieldName: Path<T>;
  value?: string;
  height?: number;
  hideAlpha?: boolean;
  hideInput?: (keyof IColor)[] | boolean;
  onValueChange: (color: IColor) => void;
  disabled?: boolean;
  label?: ReactNode;
  showLabelAboveFormField?: boolean;
  formLabelProps?: Omit<FormLabelProps, 'error'>;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: Omit<FormHelperTextProps, 'children' | 'error'>;
};

const RHFColorPicker = <T extends FieldValues>({
  fieldName,
  value,
  hideInput,
  onValueChange,
  disabled,
  label,
  showLabelAboveFormField,
  formLabelProps,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  ...otherProps
}: RHFColorPickerProps<T>) => {
  const [color, setColor] = useColor(value ?? '#000000');
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isError = Boolean(errorMessage);

  const handleColorChange = (color: IColor) => {
    if (!disabled) {
      setColor(color);
      onValueChange(color);
    }
  };

  return (
    <FormControl error={isError}>
      <FormLabel
        label={fieldLabel}
        isVisible={showLabelAboveFormField ?? true}
        error={isError}
        formLabelProps={formLabelProps}
      />
      <ReactColorPicker
        color={color}
        onChange={handleColorChange}
        hideInput={disabled ? true : hideInput}
        {...otherProps}
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
}

export default RHFColorPicker;
