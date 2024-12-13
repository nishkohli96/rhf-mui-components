import { ReactNode } from 'react';
import {
  FieldValues,
  Path,
  Controller,
  Control,
  RegisterOptions
} from 'react-hook-form';
import { ColorPicker as ReactColorPicker, IColor, useColor } from 'react-color-palette';
import { FormControl, FormLabel, FormHelperText } from '@/mui/common';
import { FormLabelProps, FormHelperTextProps } from '@/types';
import { fieldNameToLabel, colorToString } from '@/utils';
import 'react-color-palette/css';

type ColorFormat = keyof IColor;

export type RHFColorPickerProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  value?: string;
  valueKey?: ColorFormat;
  defaultColor?: string;
  excludeAlpha?: boolean;
  required?: boolean;
  height?: number;
  hideAlpha?: boolean;
  hideInput?: (keyof IColor)[] | boolean;
  onValueChange?: (color: IColor) => void;
  disabled?: boolean;
  label?: ReactNode;
  showLabelAboveFormField?: boolean;
  formLabelProps?: FormLabelProps;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
};

const RHFColorPicker = <T extends FieldValues>({
  fieldName,
  control,
  registerOptions,
  value,
  valueKey = 'hex',
  defaultColor = '#000000',
  excludeAlpha,
  required,
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
  const [color, setColor] = useColor(value ?? defaultColor);
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isError = Boolean(errorMessage);

  return (
    <FormControl error={isError}>
      <FormLabel
        label={fieldLabel}
        isVisible={showLabelAboveFormField ?? true}
        required={required}
        error={isError}
        formLabelProps={formLabelProps}
      />
      <Controller
        name={fieldName}
        control={control}
        rules={registerOptions}
        render={({ field: { onChange } }) => (
          <ReactColorPicker
            color={color}
            onChange={(color: IColor) => {
              if (!disabled) {
                setColor(color);
                const appliedColor =
                  valueKey === 'hex'
                    ? color.hex
                    : colorToString(color[valueKey], valueKey, excludeAlpha);
                onChange(appliedColor);
                onValueChange?.(color);
              }
            }}
            hideInput={disabled ? true : hideInput}
            {...otherProps}
          />
        )}
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

export default RHFColorPicker;
