import { ReactNode, SyntheticEvent } from 'react';
import { Control, Controller, Path, FieldValues } from 'react-hook-form';
import { FormHelperTextProps } from '@mui/material/FormHelperText';
import { FormLabelProps } from '@mui/material/FormLabel';
import MuiRating, { RatingProps } from '@mui/material/Rating';
import { FormControl, FormLabel, FormHelperText } from '../../common';
import withConfigHOC from '../../../config/withConfig';
import { RHFMuiConfig } from '../../../types';
import { fieldNameToLabel } from '../../../utils';

export type RHFRatingProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  onValueChange?: (
    e: SyntheticEvent<Element, Event>,
    newValue: number | null
  ) => void;
  label?: ReactNode;
  showLabelAboveFormField?: boolean;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formLabelProps?: Omit<FormLabelProps, 'error'>;
  formHelperTextProps?: Omit<FormHelperTextProps, 'children' | 'error'>;
} & Omit<RatingProps, 'name' | 'onChange' | 'error' | 'value'>;

function Rating<T extends FieldValues>(
  props: RHFRatingProps<T> & RHFMuiConfig
) {
  const {
    fieldName,
    control,
    onValueChange,
    label,
    showLabelAboveFormField,
    helperText,
    errorMessage,
    hideErrorMessage,
    formLabelProps,
    formHelperTextProps,
    defaultFormLabelSx,
    defaultFormHelperTextSx,
    ...rest
  } = props;
  const isError = Boolean(errorMessage);
  const fieldLabel = label ?? fieldNameToLabel(fieldName);

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
              isVisible={showLabelAboveFormField}
              error={isError}
              formLabelProps={formLabelProps}
              defaultFormLabelSx={defaultFormLabelSx}
            />
            <MuiRating
              {...rest}
              {...otherFieldParams}
              onChange={(e, newValue) => {
                onChange(e);
                onValueChange && onValueChange(e, newValue);
              }}
            />
            <FormHelperText
              error={isError}
              errorMessage={errorMessage}
              hideErrorMessage={hideErrorMessage}
              helperText={helperText}
              defaultFormHelperTextSx={defaultFormHelperTextSx}
              formHelperTextProps={formHelperTextProps}
            />
          </FormControl>
        );
      }}
    />
  );
}

export const RHFRating = withConfigHOC(Rating);