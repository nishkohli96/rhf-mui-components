import { ReactNode, SyntheticEvent } from 'react';
import { Control, Controller, Path, FieldValues } from 'react-hook-form';
import { FormHelperTextProps } from '@mui/material/FormHelperText';
import { FormLabelProps } from '@mui/material/FormLabel';
import MuiRating, { RatingProps } from '@mui/material/Rating';
import { fieldNameToLabel } from '@/utils';
import { FormControl, FormLabel, FormHelperText } from '../common';

export type RHFRatingProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  onValueChange?: (
    e: SyntheticEvent<Element, Event>,
    newValue: number | null
  ) => void;
  label?: ReactNode;
  showLabelAboveFormField?: boolean;
  formLabelProps?: Omit<FormLabelProps, 'error'>;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: Omit<FormHelperTextProps, 'children' | 'error'>;
} & Omit<RatingProps, 'name' | 'onChange' | 'error' | 'value'>;

const RHFRating = <T extends FieldValues>({
  fieldName,
  control,
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
    <Controller
      name={fieldName}
      control={control}
      render={({ field }) => {
        const { value, onChange, ...otherFieldParams } = field;
        return (
          <FormControl error={isError}>
            <FormLabel
              label={fieldLabel}
              isVisible={showLabelAboveFormField ?? true}
              error={isError}
              formLabelProps={formLabelProps}
            />
            <MuiRating
              {...rest}
              {...otherFieldParams}
              onChange={(e, newValue) => {
                onChange(Number(newValue));
                if(onValueChange) {
                  onValueChange(e, newValue);
                }
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
      }}
    />
  );
}

export default RHFRating;

