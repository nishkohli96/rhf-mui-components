'use client';

import { Fragment, type ReactNode } from 'react';
import {
  Controller,
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import {
  ColorPicker as ReactColorPicker,
  Saturation,
  Hue,
  useColor,
  type IColor
} from 'react-color-palette';
import { FormControl, FormLabel, FormHelperText } from '@/common';
import type { FormLabelProps, FormHelperTextProps } from '@/types';
import { fieldNameToLabel, colorToString, useFieldIds } from '@/utils';
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
  disabled: muiDisabled,
  label,
  showLabelAboveFormField,
  formLabelProps,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  height = 200,
  ...otherProps
}: RHFColorPickerProps<T>) => {
  const {
    fieldId,
    labelId,
    helperTextId,
    errorId
  } = useFieldIds(fieldName);
  const [color, setColor] = useColor(value ?? defaultColor);
  const renderHSLView = valueKey === 'hsv';
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isError = Boolean(errorMessage);

  return (
    <FormControl error={isError}>
      <FormLabel
        label={fieldLabel}
        isVisible={showLabelAboveFormField ?? true}
        required={required}
        error={isError}
        formLabelProps={{
          id: labelId,
          htmlFor: fieldId,
          ...formLabelProps
        }}
      />
      <Controller
        name={fieldName}
        control={control}
        rules={registerOptions}
        disabled={muiDisabled}
        render={({
          field: {
            onChange: rhfOnChange,
            disabled: rhfDisabled
          }
        }) => (
          <Fragment>
            {renderHSLView
              ? (
                <Fragment>
                  <Saturation
                    height={height}
                    color={color}
                    disabled={rhfDisabled}
                    onChange={color => {
                      if (!rhfDisabled) {
                        setColor(color);
                        const appliedColor = colorToString(
                          color[valueKey],
                          excludeAlpha
                        );
                        rhfOnChange(appliedColor);
                        onValueChange?.(color);
                      }
                    }}
                  />
                  <Hue
                    color={color}
                    disabled={rhfDisabled}
                    onChange={setColor}
                  />
                </Fragment>
              )
              : (
                <ReactColorPicker
                  color={color}
                  onChange={color => {
                    if (!rhfDisabled) {
                      setColor(color);
                      const appliedColor
                        = valueKey === 'hex'
                          ? color.hex
                          : colorToString(color[valueKey], excludeAlpha);
                      rhfOnChange(appliedColor);
                      onValueChange?.(color);
                    }
                  }}
                  height={height}
                  hideInput={rhfDisabled ? true : hideInput}
                  {...otherProps}
                />
              )}
          </Fragment>
        )}
      />
      <FormHelperText
        error={isError}
        errorMessage={errorMessage}
        hideErrorMessage={hideErrorMessage}
        helperText={helperText}
        formHelperTextProps={{
          id: isError ? errorId : helperTextId,
          ...formHelperTextProps
        }}
      />
    </FormControl>
  );
};

export default RHFColorPicker;
