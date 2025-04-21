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
  FormHelperText
} from '@/mui/common';
import type { FormLabelProps, FormHelperTextProps, TextFieldProps } from '@/types';
import { fieldNameToLabel, keepLabelAboveFormField } from '@/utils';

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
  formLabelProps,
  required,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  sx,
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
          const { value, onChange, ...otherFieldParams } = field;
          return (
            <MuiTextField
              id={fieldName}
              type="number"
              autoComplete={fieldName}
              label={
                !isLabelAboveFormField
                  ? (
                    <FormLabelText label={fieldLabel} required={required} />
                  )
                  : undefined
              }
              value={value ?? ''}
              onChange={event => {
                const fieldValue
                  = event.target.value === '' ? null : Number(event.target.value);
                onChange(fieldValue);
                if (onValueChange) {
                  onValueChange(fieldValue, event);
                }
              }}
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
