import { useContext, type ReactNode, type ChangeEvent } from 'react';
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
import type { FormLabelProps, FormHelperTextProps, TextFieldProps } from '@/types';
import { fieldNameToLabel, keepLabelAboveFormField, isAboveMuiV5 } from '@/utils';

type TextFieldInputProps = Omit<TextFieldProps, 'type'>;

export type RHFNumberInputProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  onValueChange?: (
    value: number | null,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  showLabelAboveFormField?: boolean;
  showMarkers?: boolean;
  maxDecimalPlaces?: number;
  stepAmount?: number;
  formLabelProps?: FormLabelProps;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
} & TextFieldInputProps;

const RHFNumberInput = <T extends FieldValues>({
  fieldName,
  control,
  registerOptions,
  onValueChange,
  label,
  showLabelAboveFormField,
  showMarkers,
  maxDecimalPlaces,
  stepAmount = 1,
  formLabelProps,
  required,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  sx,
  onBlur,
  autoComplete = defaultAutocompleteValue,
  slotProps,
  inputProps,
  ...rest
}: RHFNumberInputProps<T>) => {
  const { allLabelsAboveFields } = useContext(RHFMuiConfigContext);
  const isError = Boolean(errorMessage);
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );

  return (
    <FormControl error={isError}>
      <FormLabel
        label={fieldLabel}
        isVisible={isLabelAboveFormField}
        required={required}
        error={isError}
        formLabelProps={formLabelProps}
      />
      <Controller
        name={fieldName}
        control={control}
        rules={registerOptions}
        render={({ field }) => {
          const { value, onChange, onBlur: rhfOnBlur, ...otherFieldParams } = field;
          return (
            <MuiTextField
              id={fieldName}
              type="number"
              autoComplete={autoComplete}
              label={
                !isLabelAboveFormField ? (
                  <FormLabelText label={fieldLabel} required={required} />
                ) : undefined
              }
              value={value ?? ''}
              onChange={(event) => {
                const inputValue = event.target.value;
                const decimalPattern =
                  maxDecimalPlaces !== undefined
                    ? new RegExp(`^\\d*(\\.\\d{0,${maxDecimalPlaces}})?$`)
                    : /^\d*(\.\d*)?$/;
                if (inputValue === '' || decimalPattern.test(inputValue)) {
                  const fieldValue =
                    inputValue === '' ? null : Number(inputValue);
                  onChange(fieldValue);
                  onValueChange?.(fieldValue, event);
                }
              }}
              onBlur={(blurEvent) => {
                rhfOnBlur();
                onBlur?.(blurEvent);
              }}
              {...(isAboveMuiV5 ? {
                slotProps: {
                  ...slotProps,
                  htmlInput: {
                    ...slotProps?.htmlInput,
                    step: stepAmount
                  }
                }
              }: {
                inputProps: {
                  ...inputProps,
                  step: stepAmount
                }
              })}
              error={isError}
              sx={{
                ...(!showMarkers && {
                  '& input[type=number]': {
                    MozAppearance: 'textfield',
                    '&::-webkit-outer-spin-button': { display: 'none' },
                    '&::-webkit-inner-spin-button': { display: 'none' }
                  }
                }),
                ...sx
              }}
              {...rest}
              {...otherFieldParams}
            />
          );
        }}
      />
      <FormHelperText
        error={isError}
        errorMessage={errorMessage}
        hideErrorMessage={hideErrorMessage}
        helperText={helperText}
        formHelperTextProps={formHelperTextProps}
      />
    </FormControl>
  );
};

export default RHFNumberInput;
