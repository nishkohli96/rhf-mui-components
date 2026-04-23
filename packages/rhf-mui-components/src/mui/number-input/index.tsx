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
  type Ref
} from 'react';
import {
  Controller,
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import MuiTextField from '@mui/material/TextField';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import {
  FormControl,
  FormLabel,
  FormLabelText,
  FormHelperText,
  defaultAutocompleteValue
} from '@/common';
import type {
  FormLabelProps,
  FormHelperTextProps,
  TextFieldProps,
  CustomComponentIds,
  CustomOnChangeProps
} from '@/types';

type OnValueChangeProps = {
  newValue: number | null;
  event: ChangeEvent<HTMLInputElement>;
};
import { fieldNameToLabel, keepLabelAboveFormField, mergeRefs, useFieldIds } from '@/utils';

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

/**
 * Builds a pattern for in-progress typing: optional leading `-` when
 * `nonNegative` is false; digits; optional decimal with length limit.
 * @param nonNegative - When `true`, only non-negative values (including 0) match
 *   while typing. When `false` or omitted, `-` and negative numbers are allowed.
 * @param maxDecimalPlaces - The maximum number of decimal places allowed.
 * @returns A RegExp pattern for in-progress typing.
 */
export function buildNumberInputDecimalPattern(
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
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  /**
   * Custom change handler that overrides the default numeric value update.
   *
   * Use when you need to intercept or transform the parsed number (or `null`
   * when empty) before updating React Hook Form state.
   *
   * ⚠️ Important: Call `rhfOnChange` manually to update the form state.
   * `onValueChange` is not invoked when this callback is provided.
   *
   * @param rhfOnChange - React Hook Form field change handler
   * @param newValue - Parsed `number` or `null` when the input is empty / invalid
   * @param event - Change event from the underlying `<input>`
   */
  customOnChange?: ({
    rhfOnChange,
    newValue,
    event
  }: CustomOnChangeProps<OnValueChangeProps, number | null>) => void;
  onValueChange?: ({ newValue, event }: OnValueChangeProps) => void;
  showLabelAboveFormField?: boolean;
  formLabelProps?: FormLabelProps;
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
  maxDecimalPlaces?: number;
  /**
   * Show the increment and decrement markers on number input.  Hidden by default.
   */
  showMarkers?: boolean;
  /**
   * The amount to increase/decrease value when using arrow keys or input steppers
   */
  stepAmount?: number;
  /**
   * @deprecated
   * Field error message is now automatically derived from form state.
   * This prop is no longer needed.
   */
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
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
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  sx: muiSx,
  onBlur: muiOnBlur,
  autoComplete = defaultAutocompleteValue,
  slotProps: muiSlotProps,
  customIds,
  onKeyDown,
  onPaste,
  ...otherTextFieldProps
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
  const fieldLabel = label ?? fieldNameToLabel(fieldName);

  const decimalPattern = useMemo(
    () => buildNumberInputDecimalPattern(nonNegative, onlyIntegers, maxDecimalPlaces),
    [nonNegative, onlyIntegers, maxDecimalPlaces]
  );

  const resolvedStepAmount = onlyIntegers
    ? Math.max(1, Math.floor(stepAmount))
    : stepAmount;

  if (onlyIntegers && maxDecimalPlaces !== undefined) {
    console.warn(
      'RHFNumberInput: "onlyIntegers" and "maxDecimalPlaces" props cannot be used together'
    );
  }

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
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
    [nonNegative, onlyIntegers, onKeyDown]
  );

  const handlePaste = useCallback(
    (e: ClipboardEvent<HTMLInputElement>) => {
      const paste = e.clipboardData.getData('text').trim();
      if (paste !== '' && !decimalPattern.test(paste)) {
        e.preventDefault();
        return;
      }
      onPaste?.(e);
    },
    [decimalPattern, onPaste]
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
          ref: rhfRef
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
                isVisible={isLabelAboveFormField}
                required={required}
                error={isError}
                formLabelProps={{
                  id: labelId,
                  htmlFor: fieldId,
                  ...formLabelProps
                }}
              />
            )}
            <MuiTextField
              {...otherTextFieldProps}
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
              disabled={muiDisabled}
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

                if (inputValue === '' || decimalPattern.test(inputValue)) {
                  const parsed = inputValue === ''
                    ? null
                    : (
                      onlyIntegers ? parseInt(inputValue, 10) : Number(inputValue)
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
              onPaste={handlePaste}
              slotProps={{
                ...muiSlotProps,
                htmlInput: {
                  ...muiSlotProps?.htmlInput,
                  'aria-labelledby':
                    !hideLabel && isLabelAboveFormField ? labelId : undefined,
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
                ...(!showMarkers && {
                  '& input[type=number]': {
                    MozAppearance: 'textfield',
                    '&::-webkit-outer-spin-button': { display: 'none' },
                    '&::-webkit-inner-spin-button': { display: 'none' },
                  },
                }),
                ...muiSx,
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
                id: isError ? errorId : helperTextId,
                ...formHelperTextProps
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
