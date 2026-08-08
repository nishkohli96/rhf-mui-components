'use client';

import {
  Fragment,
  useContext,
  forwardRef,
  type ReactNode,
  type JSX,
  type Ref
} from 'react';
import {
  Controller,
  type FieldError,
  type FieldPathValue,
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import { type SliderProps } from '@mui/material/Slider';
import MUISlider from '@nish1896/mui-components/mui/slider';
import {
  type FormLabelProps,
  type FormHelperTextProps,
  type CustomOnChangeProps
} from '@/common';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import type { CustomComponentIds } from '@/types';
import {
  mergeRefs,
  mergeSx,
  resolveLabelAboveControl,
  resolveRequired
} from '@/utils';

type SliderInputProps = Omit<
  SliderProps,
  | 'name'
  | 'value'
  | 'onChange'
>;

type SliderValue = number | number[];

type OnValueChangeProps<Value extends SliderValue> = {
  newValue: Value;
  activeThumb: number;
  event: Event;
};

export type RHFSliderProps<
  T extends FieldValues,
  TName extends Path<T> = Path<T>,
  Value extends SliderValue = FieldPathValue<T, TName> extends SliderValue
    ? FieldPathValue<T, TName>
    : SliderValue
> = {
  /**
   * Name/path of the React Hook Form field this component controls.
   */
  fieldName: TName;
  /**
   * React Hook Form control object returned by `useForm`.
   */
  control: Control<T>;
  /**
   * Validation rules passed to React Hook Form for this field.
   */
  registerOptions?: RegisterOptions<T, TName>;
  /**
   * When true, marks the field as required in the UI and accessibility attributes.
   */
  required?: boolean;
  /**
   * Overrides the default slider change handling.
   * Receives the next slider value, active thumb index, and original slider change event.
   * Call `rhfOnChange` with the number or number array that should be stored; else the form value will not be updated.
   *
   * @param rhfOnChange - React Hook Form field change handler for the slider value.
   * @param newValue - Next slider value, or value array for range sliders.
   * @param activeThumb - Index of the thumb that changed for range sliders.
   * @param event - Original slider change event.
   */
  customOnChange?: ({
    rhfOnChange,
    newValue,
    activeThumb,
    event
  }: CustomOnChangeProps<OnValueChangeProps<Value>, Value>) => void;
  /**
   * Called after the default slider handler stores the next slider value in React Hook Form.
   *
   * ⚠️ Important:
   * This callback is not called when `customOnChange` is used.
   *
   * @param newValue - Next slider value, or value array for range sliders.
   * @param activeThumb - Index of the thumb that changed for range sliders.
   * @param event - Original slider change event.
   */
  onValueChange?: ({
    newValue,
    activeThumb,
    event
  }: OnValueChangeProps<Value>) => void;
  /**
   * Label content shown for the field. Defaults to a label generated from `fieldName`.
   */
  label?: ReactNode;
  /**
   * Renders the label above the component.
   * @default true
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
} & SliderInputProps;

const RHFSliderInner = forwardRef(function RHFSlider<
  T extends FieldValues,
  TName extends Path<T> = Path<T>,
  Value extends SliderValue = FieldPathValue<T, TName> extends SliderValue
    ? FieldPathValue<T, TName>
    : SliderValue
>({
  fieldName,
  control,
  registerOptions,
  required,
  customOnChange,
  onValueChange,
  disabled: muiDisabled,
  label,
  showLabelAboveFormField,
  formLabelProps,
  hideLabel,
  renderError,
  hideErrorMessage,
  helperText,
  formHelperTextProps,
  onBlur: muiOnBlur,
  customIds,
  ...otherSliderProps
}: RHFSliderProps<T, TName, Value>,
ref: Ref<HTMLSpanElement>) {
  const {
    allLabelsAboveFields,
    defaultFormLabelSx,
    defaultFormHelperTextSx
  } = useContext(RHFMuiConfigContext);

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

  return (
    <Controller
      name={fieldName}
      control={control}
      rules={registerOptions}
      render={({
        field: {
          name: rhfFieldName,
          ref: rhfRef,
          value: rhfValue,
          onChange: rhfOnChange,
          onBlur: rhfOnBlur,
          disabled: rhfDisabled
        },
        fieldState: { error: fieldStateError }
      }) => {
        const isDisabled = muiDisabled || rhfDisabled;

        return (
          <Fragment>
            <MUISlider<Value>
              {...otherSliderProps}
              fieldName={rhfFieldName}
              ref={mergeRefs(rhfRef, ref)}
              value={rhfValue}
              onValueChange={({ newValue, activeThumb, event }) => {
                if (customOnChange) {
                  customOnChange({
                    rhfOnChange,
                    newValue,
                    activeThumb,
                    event
                  });
                  return;
                }
                rhfOnChange(newValue);
                onValueChange?.({ newValue, activeThumb, event });
              }}
              onBlur={blurEvent => {
                rhfOnBlur();
                muiOnBlur?.(blurEvent);
              }}
              disabled={isDisabled}
              required={isFieldRequired}
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
              customIds={customIds}
            />
          </Fragment>
        );
      }}
    />
  );
});

const RHFSlider = RHFSliderInner as <
  T extends FieldValues,
  TName extends Path<T> = Path<T>,
  Value extends SliderValue = FieldPathValue<T, TName> extends SliderValue
    ? FieldPathValue<T, TName>
    : SliderValue
>(
  props: RHFSliderProps<T, TName, Value> & { ref?: Ref<HTMLSpanElement> }
) => JSX.Element;

export default RHFSlider;
