'use client';

import { useContext, type ReactNode } from 'react';
import {
  useWatch,
  Controller,
  type FieldError,
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import { type IColor } from 'react-color-palette';
import MUIColorPicker, { type MUIColorPickerProps } from '@nish1896/mui-components/misc/color-picker';
import { colorToString } from '@nish1896/mui-components/form-helpers';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import {
  mergeSx,
  resolveLabelAboveControl,
  resolveRequired
} from '@/utils';

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
   * When true, marks the field as required in the UI and accessibility attributes.
   */
  required?: MUIColorPickerProps['required'];
  /**
   * Color format stored in the React Hook Form field.
   *
   * `hex` stores the color hex string. Other formats are converted to a CSS color string.
   * @default 'hex'
   * Options: `hex`, `rgb`, `hsv`
   */
  valueKey?: MUIColorPickerProps['valueKey'];
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
  disabled?: MUIColorPickerProps['disabled'];
  /**
   * Initial color used by the picker when the field does not already have a value.
   * @default '#000000'
   */
  defaultColor?: MUIColorPickerProps['defaultColor'];
  /**
   * When true, omits alpha from emitted color values.
   */
  excludeAlpha?: MUIColorPickerProps['excludeAlpha'];
  /**
   * Height, in pixels, of the color picker control.
   * @default 200
   */
  height?: MUIColorPickerProps['height'];
  /**
   * When true, hides alpha controls in the color picker.
   */
  hideAlpha?: MUIColorPickerProps['hideAlpha'];
  /**
   * Hides picker input fields rendered by `react-color-palette`.
   *
   * Pass `true` to hide all inputs, or pass specific `IColor` keys to hide only
   * those inputs.
   */
  hideInput?: MUIColorPickerProps['hideInput'];
  /**
   * Label content shown for the field. Defaults to a label generated from `fieldName`.
   */
  label?: MUIColorPickerProps['label'];
  /**
   * Renders the label above the component.
   * @default true
   */
  showLabelAboveFormField?: MUIColorPickerProps['showLabelAboveFormField'];
  /**
   * Props forwarded to the internal `FormLabel`. The `id` is managed by the component.
   */
  formLabelProps?: MUIColorPickerProps['formLabelProps'];
  /**
   * When true, hides the rendered field label while preserving accessible labeling where possible.
   */
  hideLabel?: MUIColorPickerProps['hideLabel'];
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
  hideErrorMessage?: MUIColorPickerProps['hideErrorMessage'];
  /**
   * Helper text shown below the field when there is no visible validation error.
   */
  helperText?: MUIColorPickerProps['helperText'];
  /**
   * Props forwarded to the internal `FormHelperText`. The `id` is managed by the component.
   */
  formHelperTextProps?: MUIColorPickerProps['formHelperTextProps'];
  /**
   * Custom ids for generated field, label, helper text, and error elements.
   */
  customIds?: MUIColorPickerProps['customIds'];
};

/**
 * Controlled color picker built on `react-color-palette`, wired to a React
 * Hook Form field via `control`.
 *
 * The selected color is stored and read directly from React Hook Form state.
 *
 * Docs: [RHFColorPicker](https://rhf-mui-components.vercel.app/components/misc/RHFColorPicker)
 *
 * API: [RHFColorPickerProps](https://rhf-mui-components.vercel.app/components/misc/RHFColorPicker#api)
 */
const RHFColorPicker = <T extends FieldValues>({
  fieldName,
  control,
  registerOptions,
  required,
  valueKey = 'hex',
  customOnChange,
  onValueChange,
  disabled: muiDisabled,
  defaultColor = '#000000',
  excludeAlpha,
  hideInput,
  label,
  showLabelAboveFormField,
  formLabelProps,
  hideLabel,
  renderError,
  hideErrorMessage,
  helperText,
  formHelperTextProps,
  height = 200,
  customIds,
  hideAlpha
}: RHFColorPickerProps<T>) => {
  const {
    allLabelsAboveFields,
    defaultFormLabelSx,
    defaultFormHelperTextSx
  } = useContext(RHFMuiConfigContext);
  const watchedValue = useWatch({ control, name: fieldName });

  const isLabelAboveControl = resolveLabelAboveControl(
    showLabelAboveFormField,
    allLabelsAboveFields
  );
  const isFieldRequired = resolveRequired(required, registerOptions?.required);

  const {
    sx: formLabelSx,
    ...otherFormLabelProps
  } = formLabelProps ?? {};
  const {
    sx: formHelperTextSx,
    ...otherFormHelperTextProps
  } = formHelperTextProps ?? {};

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

        return (
          <MUIColorPicker
            fieldName={fieldName}
            required={isFieldRequired}
            valueKey={valueKey}
            value={watchedValue}
            onValueChange={({ color, setColor }) => {
              const wrappedSetColor = (newColor: IColor) => {
                setColor(newColor);
                rhfOnChange(getFormattedColor(newColor));
              };
              if (customOnChange) {
                customOnChange({ color, setColor: wrappedSetColor });
                return;
              }
              setColor(color);
              rhfOnChange(getFormattedColor(color));
              onValueChange?.(color);
            }}
            disabled={isDisabled}
            defaultColor={defaultColor}
            excludeAlpha={excludeAlpha}
            hideInput={hideInput}
            label={label}
            showLabelAboveFormField={isLabelAboveControl}
            formLabelProps={{
              ...otherFormLabelProps,
              sx: mergeSx(defaultFormLabelSx, formLabelSx)
            }}
            hideLabel={hideLabel}
            errorMessage={fieldStateError?.message?.toString()}
            renderError={() => fieldStateError
              ? renderError?.(fieldStateError)
              : undefined}
            hideErrorMessage={hideErrorMessage}
            helperText={helperText}
            formHelperTextProps={{
              ...otherFormHelperTextProps,
              sx: mergeSx(defaultFormHelperTextSx, formHelperTextSx)
            }}
            height={height}
            hideAlpha={hideAlpha}
            customIds={customIds}
          />
        );
      }}
    />
  );
};

export default RHFColorPicker;
