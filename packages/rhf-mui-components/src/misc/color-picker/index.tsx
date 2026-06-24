'use client';

import {
  useContext,
  Fragment,
  type ReactNode
} from 'react';
import {
  useWatch,
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
import type {
  FormLabelProps,
  FormHelperTextProps,
  CustomComponentIds
} from '@/types';
import {
  fieldNameToLabel,
  colorToString,
  useFieldIds,
  resolveLabelAboveControl
} from '@/utils';
import 'react-color-palette/css';

type ColorFormat = keyof IColor;

type RHFColorPickerCustomOnChangeProps = {
  color: IColor;
  setColor: (newColor: IColor) => void;
};

export type RHFColorPickerProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  /**
   * Color format stored in the React Hook Form field.
   *
   * `hex` stores the color hex string. Other formats are converted to a CSS color string.
   * @default 'hex'
   * Options: `hex`, `rgb`, `hsv`
   */
  valueKey?: ColorFormat;
  /**
   * Initial color used by the picker when the field does not already have a value.
   * @default '#000000'
   */
  defaultColor?: string;
  /**
   * Excludes the alpha channel when storing non-hex color formats.
   */
  excludeAlpha?: boolean;
  required?: boolean;
  /**
   * Height, in pixels, of the color picker saturation area.
   * @default 200
   */
  height?: number;
  /**
   * Hides the alpha input/control rendered by `react-color-palette`.
   */
  hideAlpha?: boolean;
  /**
   * Hides picker input fields rendered by `react-color-palette`.
   *
   * Pass `true` to hide all inputs, or pass specific `IColor` keys to hide only
   * those inputs.
   */
  hideInput?: (keyof IColor)[] | boolean;
  /**
   * Fired after the picker value changes and the formatted value is stored in the field.
   */
  onValueChange?: (color: IColor) => void;
  /**
   * Override the default `onChange` behavior of the color picker.
   * You must pass the updated `color` to the **setColor** function to update the field value.
   *
   * ⚠️ Important: `onValueChange` is not invoked when using `customOnChange`.
   *
   * @param color - Newly selected color value
   * @param setColor - react-color-palette `setColor` function
   */
  customOnChange?: ({
    color,
    setColor
  }: RHFColorPickerCustomOnChangeProps) => void;
  disabled?: boolean;
  label?: ReactNode;
  showLabelAboveFormField?: boolean;
  formLabelProps?: Omit<FormLabelProps, 'id'>;
  hideLabel?: boolean;
  helperText?: ReactNode;
  /**
   * @deprecated
   * Field error message is now automatically derived from form state.
   * Passing this prop is no longer necessary and it will be removed in the next major version.
   */
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: Omit<FormHelperTextProps, 'id'>;
  customIds?: CustomComponentIds;
};

const RHFColorPicker = <T extends FieldValues>({
  fieldName,
  control,
  registerOptions,
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
  formLabelProps,
  hideLabel,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  height = 200,
  customIds,
  hideAlpha,
}: RHFColorPickerProps<T>) => {
  const { allLabelsAboveFields } = useContext(RHFMuiConfigContext);
  const {
    labelId,
    helperTextId,
    errorId
  } = useFieldIds(fieldName, customIds);

  const watchedValue = useWatch({ control, name: fieldName });
  const [color, setColor] = useColor(watchedValue ?? defaultColor);
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
      render={({
        field: {
          onChange: rhfOnChange,
          disabled: rhfDisabled
        },
        fieldState: { error: fieldStateError }
      }) => {
        const isDisabled = muiDisabled || rhfDisabled;
        const fieldErrorMessage
          = fieldStateError?.message?.toString() ?? errorMessage;
        const isError = !!fieldErrorMessage;
        const showHelperTextElement = !!(
          helperText
          || (isError && !hideErrorMessage)
        );

        const wrappedSetColor = (newColor: IColor) => {
          setColor(newColor);
          rhfOnChange(getFormattedColor(newColor));
        };

        return (
          <FormControl error={isError} disabled={isDisabled}>
            {!hideLabel && (
              <FormLabel
                label={fieldLabel}
                required={required}
                error={isError}
                isVisible={isLabelAboveControl}
                disabled={isDisabled}
                formLabelProps={{
                  ...formLabelProps,
                  id: labelId
                }}
              />
            )}
            {renderHSLView
              ? (
                <Fragment>
                  <Saturation
                    height={height}
                    color={color}
                    disabled={isDisabled}
                    onChange={color => {
                      if(customOnChange) {
                        customOnChange({ color, setColor: wrappedSetColor });
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
                    disabled={isDisabled}
                    onChange={setColor}
                  />
                </Fragment>
              )
              : (
                <ReactColorPicker
                  color={color}
                  disabled={isDisabled}
                  onChange={color => {
                    if(customOnChange) {
                      customOnChange({ color, setColor: wrappedSetColor });
                      return;
                    }
                    setColor(color);
                    const appliedColor = getFormattedColor(color);
                    rhfOnChange(appliedColor);
                    onValueChange?.(color);
                  }}
                  height={height}
                  hideInput={isDisabled ? true : hideInput}
                  hideAlpha={hideAlpha}
                />
              )}
            <FormHelperText
              error={isError}
              errorMessage={fieldErrorMessage}
              hideErrorMessage={hideErrorMessage}
              helperText={helperText}
              showHelperTextElement={showHelperTextElement}
              formHelperTextProps={{
                ...formHelperTextProps,
                id: isError ? errorId : helperTextId
              }}
            />
          </FormControl>
        );
      }}
    />
  );
};

export default RHFColorPicker;
