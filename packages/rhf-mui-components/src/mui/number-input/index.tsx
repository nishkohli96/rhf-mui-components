'use client';

import {
  useContext,
  forwardRef,
  type ReactNode,
  type JSX,
  type ChangeEvent,
  type ClipboardEvent,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
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
import MUINumberInput from '@nish1896/mui-components/mui/number-input';
import {
  type FormLabelProps,
  type FormHelperTextProps,
  type TextFieldProps,
  type CustomOnChangeProps
} from '@/common';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import type { CustomComponentIds } from '@/types';
import {
  keepLabelAboveFormField,
  mergeRefs,
  mergeSx,
  useFieldIds
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
   * When `true`, renders the label above the component instead of within the field layout.
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
   * When `true`, only integer values are allowed. Decimal input is blocked.
   * Cannot be used together with `maxDecimalPlaces`.
   */
  onlyIntegers?: boolean;
  /**
   * When `true`, negative and exponential values are not allowed
   * while typing or pasting.
   */
  nonNegative?: boolean;
  /**
   * Maximum number of decimal places allowed. When set, the user cannot type
   * or paste more than this number of decimal places. Cannot be used together
   * with `onlyIntegers`.
   */
  maxDecimalPlaces?: number;
  /**
   * Show the increment and decrement markers on number input. Hidden by default.
   */
  showMarkers?: boolean;
  /**
   * The amount to increase/decrease value when using arrow keys or input steppers.
   * @default 1
   */
  stepAmount?: number;
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
   * Props forwarded to the internal `FormHelperText`. The `id` is managed by the component.
   */
  formHelperTextProps?: Omit<FormHelperTextProps, 'id'>;
  /**
   * Custom ids for generated field, label, helper text, and error elements.
   */
  customIds?: CustomComponentIds;
} & TextFieldInputProps;

const RHFNumberInputInner = forwardRef(function RHFNumberInput<T extends FieldValues>({
  fieldName,
  control,
  registerOptions,
  customOnChange,
  onValueChange,
  disabled: muiDisabled,
  label,
  showLabelAboveFormField,
  formLabelProps,
  hideLabel,
  showMarkers,
  onlyIntegers,
  nonNegative,
  maxDecimalPlaces,
  stepAmount,
  required,
  errorMessage,
  renderError,
  hideErrorMessage,
  helperText,
  formHelperTextProps,
  sx: muiSx,
  onBlur: muiOnBlur,
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
  const { fieldId, labelId, helperTextId, errorId } = useFieldIds(
    fieldName,
    customIds
  );
  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );
  const { sx: formLabelSx, ...otherFormLabelProps } = formLabelProps ?? {};
  const { sx: formHelperTextSx, ...otherFormHelperTextProps }
    = formHelperTextProps ?? {};

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
            value={rhfValue ?? null}
            onValueChange={({ newValue, event }) => {
              if (customOnChange) {
                customOnChange({ rhfOnChange, newValue, event });
                return;
              }
              rhfOnChange(newValue);
              onValueChange?.({ newValue, event });
            }}
            disabled={isDisabled}
            label={label}
            showLabelAboveFormField={isLabelAboveFormField}
            formLabelProps={{
              ...otherFormLabelProps,
              sx: mergeSx(defaultFormLabelSx, formLabelSx)
            }}
            hideLabel={hideLabel}
            showMarkers={showMarkers}
            onlyIntegers={onlyIntegers}
            nonNegative={nonNegative}
            maxDecimalPlaces={maxDecimalPlaces}
            stepAmount={stepAmount}
            required={required}
            errorMessage={
              fieldStateError?.message?.toString()
              ?? (typeof errorMessage === 'string' ? errorMessage : undefined)
            }
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
            onBlur={blurEvent => {
              rhfOnBlur();
              muiOnBlur?.(blurEvent as FocusEvent<HTMLInputElement>);
            }}
            autoComplete={autoComplete}
            slotProps={muiSlotProps}
            onKeyDown={onKeyDown as (e: KeyboardEvent<HTMLDivElement>) => void}
            onMouseDown={onMouseDown as (e: MouseEvent<HTMLDivElement>) => void}
            onPaste={onPaste as (e: ClipboardEvent<HTMLInputElement>) => void}
            customIds={{
              field: fieldId,
              label: labelId,
              helperText: helperTextId,
              error: errorId
            }}
          />
        );
      }}
    />
  );
});

const RHFNumberInput = RHFNumberInputInner as <T extends FieldValues>(
  props: RHFNumberInputProps<T> & { ref?: Ref<HTMLInputElement> }
) => JSX.Element;

export default RHFNumberInput;
