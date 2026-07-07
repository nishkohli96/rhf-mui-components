'use client';

import {
  useContext,
  useMemo,
  useCallback,
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
import MuiTextField from '@mui/material/TextField';
import {
  FormControl,
  FormLabel,
  FormLabelText,
  FormHelperText,
  defaultAutocompleteValue,
  type FormLabelProps,
  type FormHelperTextProps,
  type TextFieldProps,
  type CustomOnChangeProps
} from '@/common';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import type { CustomComponentIds } from '@/types';
import {
  fieldNameToLabel,
  keepLabelAboveFormField,
  mergeRefs,
  sanitizePastedNumber,
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

function setInputValueAndNotify(input: HTMLInputElement, value: string) {
  const descriptor = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    'value'
  );
  descriptor?.set?.call(input, value);
  input.dispatchEvent(new Event('input', { bubbles: true }));
}

function getSteppedInputValue(
  input: HTMLInputElement,
  step: number,
  direction: 1 | -1,
  nonNegative: boolean
) {
  const currentValue = Number(input.value);
  const resolvedValue = Number.isNaN(currentValue)
    ? 0
    : currentValue;
  const nextValue = resolvedValue + (step * direction);
  return String(nonNegative ? Math.max(0, nextValue) : nextValue);
}

function isNativeNumberMarkerClick(
  input: HTMLInputElement,
  event: MouseEvent
) {
  const rect = input.getBoundingClientRect();
  const markerWidth = Math.min(24, rect.width);

  return event.clientX >= rect.right - markerWidth;
}

/**
 * Builds a pattern for in-progress typing: optional leading `-` when
 * `nonNegative` is false; digits; optional decimal with length limit.
 * @param nonNegative - When `true`, only non-negative values (including 0) match
 *   while typing. When `false` or omitted, `-` and negative numbers are allowed.
 * @param maxDecimalPlaces - The maximum number of decimal places allowed.
 * @returns A RegExp pattern for in-progress typing.
 */
function buildNumberInputDecimalPattern(
  nonNegative: boolean,
  onlyIntegers: boolean,
  maxDecimalPlaces?: number,
): RegExp {
  const sign = nonNegative ? '' : '-?';
  if (onlyIntegers) {
    return new RegExp(`^${sign}\\d+$`);
  }
  if (maxDecimalPlaces !== undefined) {
    const n = Math.max(0, Math.floor(maxDecimalPlaces));
    return new RegExp(`^${sign}\\d*(\\.\\d{0,${n}})?$`);
  }
  return new RegExp(`^${sign}\\d*(\\.\\d*)?$`);
}

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
  onlyIntegers = false,
  nonNegative = false,
  maxDecimalPlaces,
  stepAmount = 1,
  required,
  renderError,
  hideErrorMessage,
  helperText,
  formHelperTextProps,
  sx: muiSx,
  onBlur: muiOnBlur,
  autoComplete = defaultAutocompleteValue,
  slotProps: muiSlotProps,
  customIds,
  onKeyDown,
  onMouseDown,
  onPaste,
  ...otherNumberInputProps
}: RHFNumberInputProps<T>, ref: Ref<HTMLInputElement>) {
  const {
    fieldId,
    labelId,
    helperTextId,
    errorId
  } = useFieldIds(fieldName, customIds);

  const { allLabelsAboveFields } = useContext(RHFMuiConfigContext);
  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );
  const defaultFieldLabel = fieldNameToLabel(fieldName);
  const fieldLabel = label ?? defaultFieldLabel;
  const accessibleFieldLabel = typeof fieldLabel === 'string'
    ? fieldLabel
    : defaultFieldLabel;

  const decimalPattern = useMemo(
    () => buildNumberInputDecimalPattern(nonNegative, onlyIntegers, maxDecimalPlaces),
    [nonNegative, onlyIntegers, maxDecimalPlaces]
  );

  const resolvedStepAmount = onlyIntegers
    ? Math.max(1, Math.floor(stepAmount))
    : stepAmount;

  const handleMouseDown = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const input = e.target instanceof HTMLInputElement ? e.target : null;

      if (showMarkers && input && isNativeNumberMarkerClick(input, e)) {
        const rect = input.getBoundingClientRect();
        e.preventDefault();
        input.focus();
        setInputValueAndNotify(
          input,
          getSteppedInputValue(
            input,
            resolvedStepAmount,
            e.clientY < rect.top + (rect.height / 2) ? 1 : -1,
            nonNegative
          )
        );
      }

      onMouseDown?.(e);
    },
    [nonNegative, onMouseDown, resolvedStepAmount, showMarkers]
  );

  if (onlyIntegers && maxDecimalPlaces !== undefined) {
    console.warn(
      'RHFNumberInput: "onlyIntegers" and "maxDecimalPlaces" props cannot be used together'
    );
  }

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (
        e.key === 'ArrowUp'
        || e.key === 'ArrowDown'
      ) {
        const input = e.target instanceof HTMLInputElement
          ? e.target
          : null;

        if (input) {
          e.preventDefault();
          setInputValueAndNotify(
            input,
            getSteppedInputValue(
              input,
              resolvedStepAmount,
              e.key === 'ArrowUp' ? 1 : -1,
              nonNegative
            )
          );
        }
      }
      if (onlyIntegers && (e.key === '.' || e.code === 'Period' || e.code === 'NumpadDecimal')) {
        e.preventDefault();
      }
      if (e.key === 'e' || e.key === 'E' || e.key === '+') {
        e.preventDefault();
      }
      if (nonNegative) {
        if (
          e.key === '-'
          || e.key === 'Subtract'
          || e.code === 'Minus'
          || e.code === 'NumpadSubtract'
        ) {
          e.preventDefault();
        }
      }
      if (
        e.key === '-'
        || e.code === 'Minus'
        || e.code === 'NumpadSubtract'
      ) {
        /**
         * Allow only one leading minus.
         * Note: selectionStart is always null for type="number" (MDN spec),
         * so cursor-position checks are unavailable. We use two proxy checks:
         *  • input.value !== '' → a valid numeric value already occupies
         *    the field; a minus at any position would be invalid
         *  • input.validity.badInput → the field is in a partial/invalid
         *    in-progress state (e.g. user has only typed "-"); a second
         *    minus would produce "--" or "-23-"
         */
        const input = e.target as HTMLInputElement;
        if (input.value !== '' || input.validity.badInput) {
          e.preventDefault();
        }
      }

      onKeyDown?.(e);
    },
    [nonNegative, onlyIntegers, onKeyDown, resolvedStepAmount]
  );

  const handlePaste = useCallback(
    (e: ClipboardEvent<HTMLInputElement>) => {
      const paste = e.clipboardData.getData('text').trim();
      if (paste !== '' && !decimalPattern.test(paste)) {
        e.preventDefault();
        const sanitized = sanitizePastedNumber(
          paste,
          nonNegative,
          onlyIntegers,
          maxDecimalPlaces
        );
        if (sanitized !== null) {
          const input = e.target instanceof HTMLInputElement ? e.target : null;
          if (input) {
            setInputValueAndNotify(input, sanitized);
          }
        }
      }
      onPaste?.(e);
    },
    [decimalPattern, maxDecimalPlaces, nonNegative, onlyIntegers, onPaste]
  );

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
        const fieldErrorMessage = fieldStateError
          ? renderError?.(fieldStateError) ?? fieldStateError.message?.toString()
          : undefined;
        const isError = !!fieldErrorMessage;
        const showHelperTextElement = !!(
          helperText
          || (isError && !hideErrorMessage)
        );
        return (
          <FormControl error={isError} disabled={isDisabled}>
            {!hideLabel && (
              <FormLabel
                label={fieldLabel}
                isVisible={isLabelAboveFormField}
                required={required}
                error={isError}
                disabled={isDisabled}
                formLabelProps={{
                  ...formLabelProps,
                  id: labelId,
                  htmlFor: fieldId
                }}
              />
            )}
            <MuiTextField
              {...otherNumberInputProps}
              id={fieldId}
              name={rhfFieldName}
              type="number"
              inputRef={mergeRefs(rhfRef, ref)}
              autoComplete={autoComplete}
              label={
                !hideLabel && !isLabelAboveFormField
                  ? <FormLabelText label={fieldLabel} required={required} />
                  : undefined
              }
              value={
                rhfValue === null
                || rhfValue === undefined
                || Number.isNaN(rhfValue)
                  ? ''
                  : rhfValue
              }
              disabled={isDisabled}
              onChange={event => {
                const changeEvent = event as ChangeEvent<HTMLInputElement>;
                const { value: inputValue, validity } = changeEvent.target;

                /**
                 * type="number" reports value="" for ANY invalid input
                 * (e.g. "2.3.4", "-23-", partial states). validity.badInput
                 * is the only reliable way to tell "user typed something wrong"
                 * apart from "user intentionally cleared the field" (MDN).
                 * Returning early protects form state from being wiped to null
                 * when the browser silently discards an invalid intermediate value.
                 */
                if (validity.badInput) {
                  return;
                }

                const safeInputValue = inputValue === '' || decimalPattern.test(inputValue)
                  ? inputValue
                  : sanitizePastedNumber(
                    inputValue,
                    nonNegative,
                    onlyIntegers,
                    maxDecimalPlaces
                  );

                if (
                  safeInputValue !== null
                  && (safeInputValue === '' || decimalPattern.test(safeInputValue))
                ) {
                  const parsed = safeInputValue === ''
                    ? null
                    : (
                      onlyIntegers ? parseInt(safeInputValue, 10) : Number(safeInputValue)
                    );
                  const safeValue = Number.isNaN(parsed) ? null : parsed;
                  if (customOnChange) {
                    customOnChange({ rhfOnChange, newValue: safeValue, event: changeEvent });
                    return;
                  }
                  rhfOnChange(safeValue);
                  onValueChange?.({ newValue: safeValue, event: changeEvent });
                }
              }}
              onBlur={blurEvent => {
                rhfOnBlur();
                muiOnBlur?.(blurEvent as FocusEvent<HTMLInputElement>);
              }}
              onKeyDown={handleKeyDown}
              onMouseDown={handleMouseDown}
              onPaste={handlePaste}
              slotProps={{
                ...muiSlotProps,
                htmlInput: {
                  ...muiSlotProps?.htmlInput,
                  'aria-labelledby':
                    !hideLabel && isLabelAboveFormField ? labelId : undefined,
                  'aria-label': hideLabel ? accessibleFieldLabel : undefined,
                  'aria-describedby': showHelperTextElement
                    ? isError
                      ? errorId
                      : helperTextId
                    : undefined,
                  'aria-required': required,
                  ...(nonNegative ? { min: 0 } : {}),
                  step: resolvedStepAmount
                }
              }}
              error={isError}
              sx={{
                ...muiSx,
                ...(!showMarkers && {
                  '& input[type=number]': {
                    MozAppearance: 'textfield',
                    '&::-webkit-outer-spin-button': { display: 'none' },
                    '&::-webkit-inner-spin-button': { display: 'none' },
                  },
                }),
              }}
              multiline={false}
            />
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
});

const RHFNumberInput = RHFNumberInputInner as <T extends FieldValues>(
  props: RHFNumberInputProps<T> & { ref?: Ref<HTMLInputElement> }
) => JSX.Element;

export default RHFNumberInput;
