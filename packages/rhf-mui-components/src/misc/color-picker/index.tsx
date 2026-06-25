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
  /**
   * Name/path of the React Hook Form field this component controls.
   */
  fieldName: Path<T>;
  /**
   * React Hook Form control object returned by `useForm`.
   */
  control: Control<T>;
  /**
   * Validation rules passed to React Hook Form for this field.
   */
  registerOptions?: RegisterOptions<T, Path<T>>;
  /** Initial color value used by the color picker. */
  value?: string;
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
   * When true, omits alpha from emitted color values.
   */
  excludeAlpha?: boolean;
  /**
   * When true, marks the field as required in the UI and accessibility attributes.
   */
  required?: boolean;
  /**
   * Height, in pixels, of the color picker control.
   * @default 200
   */
  height?: number;
  /**
   * When true, hides alpha controls in the color picker.
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
   * Callback fired after the picker changes and the formatted color is stored in the field.
   * @param color - Full color object from `react-color-palette`.
   */
  onValueChange?: (color: IColor) => void;
  /**
   * When true, disables the field and associated controls.
   */
  disabled?: boolean;
  /**
   * Label content shown for the field. Defaults to a label generated from `fieldName`.
   */
  label?: ReactNode;
  /**
   * When true, renders the field label above the form field instead of inside or beside it.
   */
  showLabelAboveFormField?: boolean;
  /**
   * Props forwarded to the internal `FormLabel`. The `id` is managed by the component.
   */
  formLabelProps?: Omit<FormLabelProps, 'id'>;
  /**
   * Helper text shown below the field when there is no visible validation error.
   */
  helperText?: ReactNode;
  /**
   * Validation error message displayed in the `FormHelperText` component.
   * When provided, it takes precedence over `helperText` unless
   * `hideErrorMessage` is set to `true`.
   */
  errorMessage?: ReactNode;
  /**
   * If true, hides the error message text while keeping the field in an error state.
   */
  hideErrorMessage?: boolean;
  /**
   * Props forwarded to the internal `FormHelperText`. The `id` is managed by the component.
   */
  formHelperTextProps?: Omit<FormHelperTextProps, 'id'>;
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
  ...otherColorPickerProps
}: RHFColorPickerProps<T>) => {
  const {
    labelId,
    helperTextId,
    errorId
  } = useFieldIds(fieldName);
  const [color, setColor] = useColor(value ?? defaultColor);
  const renderHSLView = valueKey === 'hsv';
  const fieldLabel = label ?? fieldNameToLabel(fieldName);

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
        }
      }) => {
        const isDisabled = muiDisabled || rhfDisabled;
        const isError = !!errorMessage;
        const showHelperTextElement = (!!helperText) || (isError && !hideErrorMessage);

        return (
          <FormControl error={isError} disabled={isDisabled}>
            <FormLabel
              label={fieldLabel}
              isVisible={showLabelAboveFormField ?? true}
              required={required}
              error={isError}
              disabled={isDisabled}
              formLabelProps={{
                ...formLabelProps,
                id: labelId
              }}
            />
            <Fragment>
              {renderHSLView
                ? (
                  <Fragment>
                    <Saturation
                      height={height}
                      color={color}
                      disabled={isDisabled}
                      onChange={color => {
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
                    {...otherColorPickerProps}
                    color={color}
                    disabled={isDisabled}
                    onChange={color => {
                      setColor(color);
                      const appliedColor = getFormattedColor(color);
                      rhfOnChange(appliedColor);
                      onValueChange?.(color);
                    }}
                    height={height}
                    hideInput={isDisabled ? true : hideInput}
                  />
                )}
            </Fragment>
            <FormHelperText
              error={isError}
              errorMessage={errorMessage}
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
