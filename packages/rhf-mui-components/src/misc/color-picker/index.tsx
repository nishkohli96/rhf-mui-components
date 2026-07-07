'use client';

import {
  useContext,
  Fragment,
  type ReactNode
} from 'react';
import {
  useWatch,
  Controller,
  type FieldError,
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
import {
  FormControl,
  FormLabel,
  FormHelperText,
  type FormLabelProps,
  type FormHelperTextProps
} from '@/common';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import type { CustomComponentIds } from '@/types';
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
   * Overrides the default color picker change handling.
   * Receives the raw `IColor` from react-color-palette and a `setColor` helper that commits the formatted value to React Hook Form.
   * Call `setColor` with the color that should be stored; else the form value will not be updated.
   *
   * @param color - New `IColor` emitted by react-color-palette.
   * @param setColor - Commit helper that updates local picker state and the RHF field value.
   */
  customOnChange?: ({
    color,
    setColor
  }: RHFColorPickerCustomOnChangeProps) => void;
  /**
   * Called after the default color picker handler stores the formatted color value in React Hook Form.
   *
   * ⚠️ Important:
   * This callback is not called when `customOnChange` is used.
   *
   * @param color - New `IColor` emitted by react-color-palette.
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
   * When true, hides the rendered field label while preserving accessible labeling where possible.
   */
  hideLabel?: boolean;
  /**
   * @deprecated
   * Field error message is now automatically derived from form state.
   * Passing this prop is no longer necessary and it will be removed in the next major version.
   *
   * Use `renderError` to customize how the field error is rendered.
   */
  errorMessage?: ReactNode;
  /**
   * Custom renderer for the React Hook Form field error.
   * Receives the current field error and must return renderable content, such as `error.message` or a custom element.
   *
   * @param error - React Hook Form field error for this field.
   */
  renderError?: (error: FieldError) => ReactNode;
  /**
   * If true, hides the error message text while keeping the field in an error state.
   */
  hideErrorMessage?: boolean;
  /**
   * Helper text shown below the field when there is no visible validation error.
   */
  helperText?: ReactNode;
  /**
   * Props forwarded to the internal `FormHelperText`. The `id` is managed by the component.
   */
  formHelperTextProps?: Omit<FormHelperTextProps, 'id'>;
  /**
   * Custom ids for generated field, label, helper text, and error elements.
   */
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
  customOnChange,
  onValueChange,
  disabled: muiDisabled,
  label,
  showLabelAboveFormField,
  formLabelProps,
  hideLabel,
  errorMessage,
  renderError,
  hideErrorMessage,
  helperText,
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

  const defaultFieldLabel = fieldNameToLabel(fieldName);
  const fieldLabel = label ?? defaultFieldLabel;
  const accessibleFieldLabel = typeof fieldLabel === 'string'
    ? fieldLabel
    : defaultFieldLabel;
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
        const fieldErrorMessage = fieldStateError
          ? (renderError?.(fieldStateError) ?? errorMessage ?? fieldStateError.message?.toString())
          : undefined;
        const isError = !!fieldErrorMessage;
        const showHelperTextElement = !!(
          helperText
          || (isError && !hideErrorMessage)
        );

        const wrappedSetColor = (newColor: IColor) => {
          setColor(newColor);
          rhfOnChange(getFormattedColor(newColor));
        };

        const handleColorChange = (newColor: IColor) => {
          if(customOnChange) {
            customOnChange({
              color: newColor,
              setColor: wrappedSetColor
            });
            return;
          }
          setColor(newColor);
          const appliedColor = getFormattedColor(newColor);
          rhfOnChange(appliedColor);
          onValueChange?.(newColor);
        };

        return (
          <FormControl
            component="fieldset"
            error={isError}
            disabled={isDisabled}
            aria-labelledby={!hideLabel && isLabelAboveControl ? labelId : undefined}
            aria-label={
              hideLabel || !isLabelAboveControl
                ? accessibleFieldLabel
                : undefined
            }
            aria-describedby={
              showHelperTextElement
                ? isError
                  ? errorId
                  : helperTextId
                : undefined
            }
          >
            {!hideLabel && (
              <FormLabel
                label={fieldLabel}
                required={required}
                error={isError}
                isVisible={isLabelAboveControl}
                disabled={isDisabled}
                formLabelProps={{
                  ...formLabelProps,
                  id: labelId,
                  component: 'legend'
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
                    onChange={handleColorChange}
                  />
                  <Hue
                    color={color}
                    disabled={isDisabled}
                    onChange={handleColorChange}
                  />
                </Fragment>
              )
              : (
                <ReactColorPicker
                  color={color}
                  disabled={isDisabled}
                  onChange={handleColorChange}
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
