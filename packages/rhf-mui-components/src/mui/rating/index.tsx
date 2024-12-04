import { ReactNode, SyntheticEvent } from 'react';
import {
  FieldValues,
  Path,
  Controller,
  Control,
  RegisterOptions
} from 'react-hook-form';
import MuiRating, { RatingProps } from '@mui/material/Rating';
import { FormControl, FormLabel, FormHelperText } from '@/mui/common';
import { FormLabelProps, FormHelperTextProps } from '@/types';
import { fieldNameToLabel } from '@/utils';

type InputRatingProps = Omit<
  RatingProps,
  | 'name'
  | 'onChange'
  | 'error'
  | 'value'
  | 'defaultValue'
>

export type RHFRatingProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  required?: boolean;
  onValueChange?: (
    newValue: number | null,
    event: SyntheticEvent<Element, Event>
  ) => void;
  label?: ReactNode;
  showLabelAboveFormField?: boolean;
  formLabelProps?: FormLabelProps;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
} & InputRatingProps;

const RHFRating = <T extends FieldValues>({
  fieldName,
  control,
  registerOptions,
  required,
  onValueChange,
  label,
  showLabelAboveFormField,
  formLabelProps,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  ...rest
}: RHFRatingProps<T>) => {
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isError = Boolean(errorMessage);

  return (
    <FormControl error={isError}>
      <FormLabel
        label={fieldLabel}
        isVisible={showLabelAboveFormField ?? true}
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
            <MuiRating
              {...rest}
              {...otherFieldParams}
              value={value ?? 0}
              onChange={(event, newValue) => {
                onChange(Number(newValue));
                if(onValueChange) {
                  onValueChange(newValue, event);
                }
              }}
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

export default RHFRating;

