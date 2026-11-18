'use client';

import {
  useContext,
  forwardRef,
  type ReactNode,
  type JSX,
  type ChangeEvent,
  type FocusEvent,
  type Ref
} from 'react';
import {
  Controller,
  type FieldError,
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import MUINumberStepper, { type MUINumberStepperProps } from '@nish1896/mui-components/mui/number-stepper';
import {
  type TextFieldProps,
  type CustomOnChangeProps
} from '@/common';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import {
  keepLabelAboveFormField,
  mergeRefs,
  mergeSx,
  resolveRequired
} from '@/utils';

type OnValueChangeProps = {
  newValue: number | null;
  event: ChangeEvent<HTMLInputElement>;
};

type TextFieldInputProps = Omit<
  TextFieldProps,
  | 'type'
  | 'variant'
  | 'multiline'
  | 'rows'
  | 'minRows'
  | 'maxRows'
  | 'onChange'
  | 'onBlur'
> & {
  /** Always an `<input>`; multiline / textarea are not supported. */
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
};

export type RHFNumberStepperProps<T extends FieldValues> = {
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
   * Overrides the default number stepper change handling.
   * Receives the next numeric value (or `null` when empty) and the original input change event.
   * Call `rhfOnChange` with the value that should be stored; else the form value will not be updated.
   *
   * @param rhfOnChange - React Hook Form field change handler for the numeric value.
   * @param newValue - Next number, or `null` when the field is empty.
   * @param event - Original input change event.
   */
  customOnChange?: ({
    rhfOnChange,
    newValue,
    event
  }: CustomOnChangeProps<OnValueChangeProps, number | null>) => void;
  /**
   * Called after the default number stepper handler stores the next value in React Hook Form.
   *
   * ⚠️ Important:
   * This callback is not called when `customOnChange` is used.
   *
   * @param newValue - Next number, or `null` when the field is empty.
   * @param event - Original input change event.
   */
  onValueChange?: ({ newValue, event }: OnValueChangeProps) => void;
  /**
   * Lower bound. Stepping stops at it, and an out-of-range value is clamped on blur.
   */
  min?: MUINumberStepperProps['min'];
  /**
   * Upper bound. Stepping stops at it, and an out-of-range value is clamped on blur.
   */
  max?: MUINumberStepperProps['max'];
  /**
   * When true, only whole numbers are accepted.
   */
  onlyIntegers?: MUINumberStepperProps['onlyIntegers'];
  /**
   * When true, negative numbers are not accepted.
   */
  nonNegative?: MUINumberStepperProps['nonNegative'];
  /**
   * Maximum number of digits allowed after the decimal point.
   */
  maxDecimalPlaces?: MUINumberStepperProps['maxDecimalPlaces'];
  /**
   * The amount to increase/decrease the value by with the stepper buttons and arrow keys.
   * @default 1
   */
  stepAmount?: MUINumberStepperProps['stepAmount'];
  /**
   * Formats the number for display while the field is not focused.
   */
  renderValue?: MUINumberStepperProps['renderValue'];
  /**
   * Custom icon for the decrement (`-`) button.
   */
  decrementIcon?: MUINumberStepperProps['decrementIcon'];
  /**
   * Custom icon for the increment (`+`) button.
   */
  incrementIcon?: MUINumberStepperProps['incrementIcon'];
  /**
   * Swaps the icons and behavior of the two buttons: the left button increments
   * and the right button decrements.
   */
  swapButtons?: MUINumberStepperProps['swapButtons'];
  /**
   * Props forwarded to both the decrement and increment `IconButton`s.
   */
  iconButtonProps?: MUINumberStepperProps['iconButtonProps'];
  /**
   * Content rendered under the value, e.g. a unit label.
   */
  caption?: MUINumberStepperProps['caption'];
  /**
   * Props forwarded to the `Box` wrapping `caption`.
   */
  captionProps?: MUINumberStepperProps['captionProps'];
  /**
   * When `true`, renders the label above the component instead of within the field layout.
   */
  showLabelAboveFormField?: MUINumberStepperProps['showLabelAboveFormField'];
  /**
   * Props forwarded to the internal `FormLabel`. The `id` is managed by the component.
   */
  formLabelProps?: MUINumberStepperProps['formLabelProps'];
  /**
   * When true, hides the rendered field label while preserving accessible labeling where possible.
   */
  hideLabel?: MUINumberStepperProps['hideLabel'];
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
  hideErrorMessage?: MUINumberStepperProps['hideErrorMessage'];
  /**
   * Props forwarded to the internal `FormHelperText`. The `id` is managed by the component.
   */
  formHelperTextProps?: MUINumberStepperProps['formHelperTextProps'];
  /**
   * Custom ids for generated field, label, helper text, and error elements.
   */
  customIds?: MUINumberStepperProps['customIds'];
} & TextFieldInputProps;

const RHFNumberStepperInner = forwardRef(function RHFNumberStepper<T extends FieldValues>({
  fieldName,
  control,
  registerOptions,
  customOnChange,
  onValueChange,
  onBlur: muiOnBlur,
  disabled: muiDisabled,
  min,
  max,
  onlyIntegers,
  nonNegative,
  maxDecimalPlaces,
  stepAmount,
  renderValue,
  decrementIcon,
  incrementIcon,
  swapButtons,
  iconButtonProps,
  caption,
  captionProps,
  label,
  showLabelAboveFormField,
  formLabelProps,
  hideLabel,
  required,
  renderError,
  hideErrorMessage,
  helperText,
  formHelperTextProps,
  autoComplete,
  slotProps: muiSlotProps,
  customIds,
  ...otherNumberStepperProps
}: RHFNumberStepperProps<T>, ref: Ref<HTMLInputElement>) {
  const {
    allLabelsAboveFields,
    defaultFormLabelSx,
    defaultFormHelperTextSx
  } = useContext(RHFMuiConfigContext);

  const isLabelAboveFormField = keepLabelAboveFormField(
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
          value: rhfValue,
          onChange: rhfOnChange,
          onBlur: rhfOnBlur,
          ref: rhfRef,
          disabled: rhfDisabled
        },
        fieldState: { error: fieldStateError }
      }) => {
        const isDisabled = muiDisabled || rhfDisabled;

        return (
          <MUINumberStepper
            {...otherNumberStepperProps}
            fieldName={rhfFieldName}
            inputRef={mergeRefs(rhfRef, ref)}
            value={rhfValue}
            onValueChange={({ newValue, event }) => {
              if (customOnChange) {
                customOnChange({ rhfOnChange, newValue, event });
                return;
              }
              rhfOnChange(newValue);
              onValueChange?.({ newValue, event });
            }}
            onBlur={blurEvent => {
              rhfOnBlur();
              muiOnBlur?.(blurEvent);
            }}
            disabled={isDisabled}
            min={min}
            max={max}
            onlyIntegers={onlyIntegers}
            nonNegative={nonNegative}
            maxDecimalPlaces={maxDecimalPlaces}
            stepAmount={stepAmount}
            renderValue={renderValue}
            decrementIcon={decrementIcon}
            incrementIcon={incrementIcon}
            swapButtons={swapButtons}
            iconButtonProps={iconButtonProps}
            caption={caption}
            captionProps={captionProps}
            label={label}
            showLabelAboveFormField={isLabelAboveFormField}
            formLabelProps={{
              ...otherFormLabelProps,
              sx: mergeSx(defaultFormLabelSx, formLabelSx)
            }}
            hideLabel={hideLabel}
            required={isFieldRequired}
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
            autoComplete={autoComplete}
            slotProps={muiSlotProps}
            customIds={customIds}
          />
        );
      }}
    />
  );
});

/**
 * Controlled number input with always-visible `-` / `+` stepper buttons,
 * wired to a React Hook Form field via `control`.
 *
 * Parsing, sanitizing and clamping come from `RHFNumberInput`'s rules
 * (`onlyIntegers`, `nonNegative`, `maxDecimalPlaces`, `min`, `max`,
 * `stepAmount`). The stored value is a `number`, or `null` when empty.
 *
 * Docs: [RHFNumberStepper](https://rhf-mui-components.vercel.app/components/mui/RHFNumberStepper)
 *
 * API: [RHFNumberStepperProps](https://rhf-mui-components.vercel.app/components/mui/RHFNumberStepper#api)
 */
const RHFNumberStepper = RHFNumberStepperInner as <T extends FieldValues>(
  props: RHFNumberStepperProps<T> & { ref?: Ref<HTMLInputElement> }
) => JSX.Element;

export default RHFNumberStepper;
