import { ReactNode, SyntheticEvent } from 'react';
import { Control, Controller, RegisterOptions, Path, FieldValues } from 'react-hook-form';
import { FormHelperTextProps } from '@mui/material/FormHelperText';
import { FormLabelProps } from '@mui/material/FormLabel';
import MuiRating, { RatingProps } from '@mui/material/Rating';
import { fieldNameToLabel } from '@/utils';
import { FormControl, FormLabel, FormHelperText } from '../common';

type OmittedRatingprops = Omit<
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
  onValueChange?: (
    newValue: number | null,
    event: SyntheticEvent<Element, Event>
  ) => void;
  label?: ReactNode;
  showLabelAboveFormField?: boolean;
  formLabelProps?: Omit<FormLabelProps, 'error'>;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: Omit<FormHelperTextProps, 'children' | 'error'>;
} & OmittedRatingprops;

const RHFRating = <T extends FieldValues>({
  fieldName,
  control,
  registerOptions,
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

