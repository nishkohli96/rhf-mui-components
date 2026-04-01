'use client';

import { Dispatch, Fragment, SetStateAction, useContext, type ReactNode } from 'react';
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
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import type { FormLabelProps, FormHelperTextProps, CustomComponentIds } from '@/types';
import { fieldNameToLabel, colorToString, useFieldIds, resolveLabelAboveControl } from '@/utils';
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
  /**
   * Override the default `onChange` behavior of the color picker.
   * You must pass the updated `color` to the **setColor** function to update the field value.
   * 
   * ⚠️ Important: `onValueChange` is not invoked when using `customOnChange`.
   *
   * @param setColor - react-color-palette `setColor` function
   * @param color - Current color value
   */
  customOnChange?: (
    setColor: Dispatch<SetStateAction<IColor>>,
    color: IColor
  ) => void;
  disabled?: boolean;
  label?: ReactNode;
  showLabelAboveFormField?: boolean;
  hideLabel?: boolean;
  formLabelProps?: FormLabelProps;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
  customIds?: CustomComponentIds;
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
  customOnChange,
  disabled: muiDisabled,
  label,
  showLabelAboveFormField,
  hideLabel,
  formLabelProps,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  height = 200,
  customIds,
  ...otherProps
}: RHFColorPickerProps<T>) => {
  const { allLabelsAboveFields } = useContext(RHFMuiConfigContext);
  const {
    labelId,
    helperTextId,
    errorId
  } = useFieldIds(fieldName, customIds);
  const [color, setColor] = useColor(value ?? defaultColor);
  const renderHSLView = valueKey === 'hsv';
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isLabelAboveControl = resolveLabelAboveControl(
    showLabelAboveFormField,
    allLabelsAboveFields
  );

  const getFormattedColor = (color: IColor) =>
    valueKey === 'hex'
      ? color.hex
      : colorToString(color[valueKey], excludeAlpha);

  return (
    <Controller
      name={fieldName}
      control={control}
      rules={registerOptions}
      disabled={muiDisabled}
      render={({
        field: {
          onChange: rhfOnChange,
          disabled: rhfDisabled
        },
        fieldState: { error: fieldStateError }
      }) => {
        const fieldErrorMessage
          = fieldStateError?.message?.toString() ?? errorMessage;
        const isError = !!fieldErrorMessage;
        const showHelperTextElement = !!(
          helperText
          || (isError && !hideErrorMessage)
        );
        return (
          <FormControl error={isError}>
            {!hideLabel && (
              <FormLabel
                label={fieldLabel}
                isVisible={isLabelAboveControl}
                required={required}
                error={isError}
                formLabelProps={{
                  id: labelId,
                  ...formLabelProps
                }}
              />
            )}
            {renderHSLView
              ? (
                <Fragment>
                  <Saturation
                    height={height}
                    color={color}
                    disabled={rhfDisabled}
                    onChange={color => {
                      if(customOnChange) {
                        customOnChange(setColor, color);
                        return;
                      }
                      setColor(color);
                      const appliedColor = getFormattedColor(color);
                      rhfOnChange(appliedColor);
                      onValueChange?.(color);
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
                  disabled={rhfDisabled}
                  onChange={color => {
                    if(customOnChange) {
                      customOnChange(setColor, color);
                      return;
                    }
                    setColor(color);
                    const appliedColor = getFormattedColor(color);
                    rhfOnChange(appliedColor);
                    onValueChange?.(color);
                  }}
                  height={height}
                  hideInput={rhfDisabled ? true : hideInput}
                  {...otherProps}
                />
              )}
            <FormHelperText
              error={isError}
              errorMessage={fieldErrorMessage}
              hideErrorMessage={hideErrorMessage}
              helperText={helperText}
              showHelperTextElement={showHelperTextElement}
              formHelperTextProps={{
                id: isError ? errorId : helperTextId,
                ...formHelperTextProps
              }}
            />
          </FormControl>
        );
      }}
    />
  );
};

export default RHFColorPicker;
