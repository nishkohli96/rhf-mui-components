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
import MUINumberInput, { type MUINumberInputProps } from '@nish1896/mui-components/mui/number-input';
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

export type RHFNumberInputProps<T extends FieldValues> = {
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
   * Overrides the default number input change handling.
   * Receives the parsed numeric value and the original input change event.
   * Call `rhfOnChange` with the number or `null` value that should be stored; else the form value will not be updated.
   *
   * @param rhfOnChange - React Hook Form field change handler for the numeric value.
   * @param newValue - Parsed number value, or `null` when the input is empty.
   * @param event - Original input change event.
   */
  customOnChange?: ({
    rhfOnChange,
    newValue,
    event
  }: CustomOnChangeProps<OnValueChangeProps, number | null>) => void;
  /**
   * Called after the default number input handler stores the parsed numeric value in React Hook Form.
   *
   * ⚠️ Important:
   * This callback is not called when `customOnChange` is used.
   *
   * @param newValue - Parsed number value, or `null` when the input is empty.
   * @param event - Original input change event.
   */
  onValueChange?: ({ newValue, event }: OnValueChangeProps) => void;
  /**
   * Lower bound for the value. Stepping (native steppers / arrow keys) clamps
   * to this and the value is clamped on blur. `nonNegative` sets the lower
   * bound to `0`, but an explicit `min` overrides it.
   */
  min?: MUINumberInputProps['min'];
  /**
   * Upper bound for the value. Stepping (native steppers / arrow keys) clamps
   * to this and the value is clamped on blur.
   */
  max?: MUINumberInputProps['max'];
  /**
   * When `true`, only integer values are allowed. Decimal input is blocked.
   * Cannot be used together with `maxDecimalPlaces`.
   */
  onlyIntegers?: MUINumberInputProps['onlyIntegers'];
  /**
   * When `true`, negative and exponential values are not allowed
   * while typing or pasting.
   */
  nonNegative?: MUINumberInputProps['nonNegative'];
  /**
   * Maximum number of decimal places allowed. When set, the user cannot type
   * or paste more than this number of decimal places. Cannot be used together
   * with `onlyIntegers`.
   */
  maxDecimalPlaces?: MUINumberInputProps['maxDecimalPlaces'];
  /**
   * The amount to increase/decrease value when using arrow keys or input steppers.
   * @default 1
   */
  stepAmount?: MUINumberInputProps['stepAmount'];
  /**
   * Show the increment and decrement markers on number input. Hidden by default.
   */
  showMarkers?: MUINumberInputProps['showMarkers'];
  /**
   * Formats the numeric value for display — e.g. thousands separators, a
   * currency prefix, or fixed decimals: `value => value?.toLocaleString() ?? ''`.
   *
   * When set, the input switches from `type="number"` to `type="text"` (which
   * cannot show grouping characters). The formatted string is shown only while
   * the field is **not** focused; on focus it reverts to the raw numeric string
   * and all the normal typing / paste / `min` / `max` constraints still apply.
   * `value` stays a real `number | null` throughout.
   */
  renderValue?: MUINumberInputProps['renderValue'];
  /**
   * When `true`, renders the label above the component instead of within the field layout.
   */
  showLabelAboveFormField?: MUINumberInputProps['showLabelAboveFormField'];
  /**
   * Props forwarded to the internal `FormLabel`. The `id` is managed by the component.
   */
  formLabelProps?: MUINumberInputProps['formLabelProps'];
  /**
   * When true, hides the rendered field label while preserving accessible labeling where possible.
   */
  hideLabel?: MUINumberInputProps['hideLabel'];
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
  hideErrorMessage?: MUINumberInputProps['hideErrorMessage'];
  /**
   * Props forwarded to the internal `FormHelperText`. The `id` is managed by the component.
   */
  formHelperTextProps?: MUINumberInputProps['formHelperTextProps'];
  /**
   * Custom ids for generated field, label, helper text, and error elements.
   */
  customIds?: MUINumberInputProps['customIds'];
} & TextFieldInputProps;

const RHFNumberInputInner = forwardRef(function RHFNumberInput<T extends FieldValues>({
  fieldName,
  control,
  registerOptions,
  customOnChange,
  onValueChange,
  min,
  max,
  onlyIntegers,
  nonNegative,
  maxDecimalPlaces,
  stepAmount,
  showMarkers,
  renderValue,
  onBlur: muiOnBlur,
  disabled: muiDisabled,
  label,
  showLabelAboveFormField,
  formLabelProps,
  hideLabel,
  required,
  renderError,
  hideErrorMessage,
  helperText,
  formHelperTextProps,
  sx: muiSx,
  autoComplete,
  slotProps: muiSlotProps,
  customIds,
  onKeyDown,
  onMouseDown,
  onPaste,
  ...otherNumberInputProps
}: RHFNumberInputProps<T>, ref: Ref<HTMLInputElement>) {
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
          <MUINumberInput
            {...otherNumberInputProps}
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
            label={label}
            showLabelAboveFormField={isLabelAboveFormField}
            formLabelProps={{
              ...otherFormLabelProps,
              sx: mergeSx(defaultFormLabelSx, formLabelSx)
            }}
            hideLabel={hideLabel}
            min={min}
            max={max}
            onlyIntegers={onlyIntegers}
            nonNegative={nonNegative}
            maxDecimalPlaces={maxDecimalPlaces}
            stepAmount={stepAmount}
            showMarkers={showMarkers}
            renderValue={renderValue}
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
            sx={muiSx}
            autoComplete={autoComplete}
            slotProps={muiSlotProps}
            onKeyDown={onKeyDown}
            onMouseDown={onMouseDown}
            onPaste={onPaste}
            customIds={customIds}
          />
        );
      }}
    />
  );
});

/**
 * Controlled numeric Material UI `TextField`, wired to a React Hook Form
 * field via `control`.
 *
 * Supports integer/decimal-place limits, a non-negative constraint, and
 * configurable stepping.
 *
 * Docs: [RHFNumberInput](https://rhf-mui-components.vercel.app/components/mui/RHFNumberInput)
 *
 * API: [RHFNumberInputProps](https://rhf-mui-components.vercel.app/components/mui/RHFNumberInput#api)
 */
const RHFNumberInput = RHFNumberInputInner as <T extends FieldValues>(
  props: RHFNumberInputProps<T> & { ref?: Ref<HTMLInputElement> }
) => JSX.Element;

export default RHFNumberInput;
