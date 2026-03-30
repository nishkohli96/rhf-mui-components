'use client';

import { useContext, type ReactNode, type ChangeEvent, useMemo, forwardRef, type Ref } from 'react';
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
import type { FormLabelProps, FormHelperTextProps, TextFieldProps, CustomComponentIds } from '@/types';
import { fieldNameToLabel, keepLabelAboveFormField, mergeRefs, useFieldIds } from '@/utils';

type TextFieldInputProps = Omit<
  TextFieldProps,
  'type' | 'multiline' | 'rows' | 'minRows' | 'maxRows'
>;

/**
 * Builds a pattern for in-progress typing: optional
 * leading `-` (unless onlyPositive), digits, optional decimal with
 * length limit.
 * @param onlyPositive - When `true`, only non-negative values (including 0) match
 *   while typing. When `false` or omitted, `-` and negative numbers are allowed.
 * @param maxDecimalPlaces - The maximum number of decimal places allowed.
 * @returns A RegExp pattern for in-progress typing.
 */
export function buildNumberInputDecimalPattern(
  onlyPositive: boolean,
  maxDecimalPlaces?: number
): RegExp {
  const sign = onlyPositive ? '' : '-?';
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
  customOnChange?: (
    rhfOnChange: (value: number | null) => void,
    newValue: number | null,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onValueChange?: (
    value: number | null,
    event: ChangeEvent<HTMLInputElement>
  ) => void;
  showLabelAboveFormField?: boolean;
  hideLabel?: boolean;
  showMarkers?: boolean;
  /** When `true`, only non-negative values (including 0) match while
   * typing. When `false` or omitted, `-` and negative numbers are allowed.
   */
  onlyPositive?: boolean;
  maxDecimalPlaces?: number;
  stepAmount?: number;
  formLabelProps?: FormLabelProps;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
  customIds?: CustomComponentIds;
} & TextFieldInputProps;

const RHFNumberInput = forwardRef(function RHFNumberInput<T extends FieldValues>({
  fieldName,
  control,
  registerOptions,
  customOnChange,
  onValueChange,
  disabled: muiDisabled,
  label,
  showLabelAboveFormField,
  hideLabel,
  showMarkers,
  onlyPositive = false,
  maxDecimalPlaces,
  stepAmount = 1,
  formLabelProps,
  required,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  sx: muiSx,
  onBlur,
  autoComplete = defaultAutocompleteValue,
  slotProps,
  customIds,
  ...rest
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
  const fieldLabel = useMemo(
    () => label ?? fieldNameToLabel(fieldName),
    [label, fieldName]
  );

  const decimalPattern = useMemo(
    () => buildNumberInputDecimalPattern(onlyPositive, maxDecimalPlaces),
    [onlyPositive, maxDecimalPlaces]
  );

  return (
    <Controller
      name={fieldName}
      control={control}
      rules={registerOptions}
      disabled={muiDisabled}
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
              disabled={rhfDisabled}
              onChange={event => {
                const inputValue = event.target.value;
                if (inputValue === '' || decimalPattern.test(inputValue)) {
                  const fieldValue
                    = inputValue === '' ? null : Number(inputValue);
                  const safeValue = Number.isNaN(fieldValue) ? null : fieldValue;
                  if (customOnChange) {
                    customOnChange(rhfOnChange, safeValue, event);
                    return;
                  }
                  rhfOnChange(safeValue);
                  onValueChange?.(safeValue, event as ChangeEvent<HTMLInputElement>);
                }
              }}
              onBlur={blurEvent => {
                rhfOnBlur();
                onBlur?.(blurEvent);
              }}
              slotProps={{
                ...slotProps,
                htmlInput: {
                  ...(onlyPositive ? { min: 0 } : {}),
                  ...slotProps?.htmlInput,
                  step: stepAmount
                }
              }}
              error={isError}
              aria-labelledby={isLabelAboveFormField ? labelId : undefined}
              aria-describedby={
                showHelperTextElement
                  ? isError
                    ? errorId
                    : helperTextId
                  : undefined
              }
              aria-required={required}
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
              {...rest}
            />
            <FormHelperText
              error={isError}
              errorMessage={errorMessage}
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
}) as <T extends FieldValues>(
  props: RHFNumberInputProps<T> & { ref?: Ref<HTMLInputElement> }
) => JSX.Element;

export default RHFNumberInput;
