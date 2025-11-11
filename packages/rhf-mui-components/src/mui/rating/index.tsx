import type { ReactNode, SyntheticEvent } from 'react';
import {
  Controller,
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import MuiRating, { type RatingProps } from '@mui/material/Rating';
import { FormControl, FormLabel, FormHelperText } from '@/common';
import type { FormLabelProps, FormHelperTextProps } from '@/types';
import { fieldNameToLabel } from '@/utils';

type InputRatingProps = Omit<
  RatingProps,
  | 'name'
  | 'onChange'
  | 'error'
  | 'value'
  | 'defaultValue'
>;

export type RHFRatingProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  required?: boolean;
  customOnChange?: (
    rhfOnChange: (newValue: number | null) => void,
    newValue: number | null,
    event: SyntheticEvent<Element, Event>
  ) => void;
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
  customOnChange,
  onValueChange,
  label,
  showLabelAboveFormField,
  formLabelProps,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  onBlur,
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
          const { value, onChange, onBlur: rhfOnBlur, ...otherFieldParams } = field;
          return (
            <MuiRating
              {...rest}
              {...otherFieldParams}
              value={value ?? 0}
              onChange={(event, newValue) => {
                if(customOnChange) {
                  customOnChange(onChange, newValue, event);
                  return;
                }
                onChange(newValue);
                if(onValueChange) {
                  onValueChange(newValue, event);
                }
              }}
              onBlur={blurEvent => {
                rhfOnBlur();
                onBlur?.(blurEvent);
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

