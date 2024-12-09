import { useContext, Fragment, ReactNode, ChangeEvent } from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';
import { FormHelperTextProps } from '@mui/material/FormHelperText';
import MuiCheckbox, { CheckboxProps } from '@mui/material/Checkbox';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { FormHelperText } from '../common';

export type RHFCheckboxProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  onValueChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: ReactNode;
  formControlLabelProps?: Omit<FormControlLabelProps, 'control' | 'label'>;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: Omit<FormHelperTextProps, 'children' | 'error'>;
} & Omit<CheckboxProps, 'name' | 'checked' | 'onChange'>;

export default function RHFCheckbox<T extends FieldValues>({
  fieldName,
  control,
  onValueChange,
  label,
  formControlLabelProps,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  ...rest
}: RHFCheckboxProps<T>) {
  const { defaultFormHelperTextSx, defaultFormControlLabelSx } = useContext(RHFMuiConfigContext);
  const isError = Boolean(errorMessage);

  const { sx, ...otherFormControlLabelProps } = formControlLabelProps ?? {};
  const appliedFormControlLabelSx = {
    ...defaultFormControlLabelSx,
    ...sx,
  };

  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field }) => {
        const { value, onChange, ...otherFieldParams } = field;
        return (
          <Fragment>
            <FormControlLabel
              control={
                <MuiCheckbox
                  {...otherFieldParams}
                  {...rest}
                  checked={value}
                  onChange={e => {
                    onChange(e);
                    if(onValueChange) {
                      onValueChange(e);
                    }
                  }}
                />
              }
              label={label}
              sx={appliedFormControlLabelSx}
              {...otherFormControlLabelProps}
            />
            <FormHelperText
              error={isError}
              errorMessage={errorMessage}
              hideErrorMessage={hideErrorMessage}
              helperText={helperText}
              defaultFormHelperTextSx={defaultFormHelperTextSx}
              formHelperTextProps={formHelperTextProps}
            />
          </Fragment>
        );
      }}
    />
  );
}
