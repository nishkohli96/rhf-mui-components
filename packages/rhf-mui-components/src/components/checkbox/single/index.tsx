import { Fragment, ReactNode, ChangeEvent } from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import FormControlLabel, {
  FormControlLabelProps
} from '@mui/material/FormControlLabel';
import { FormHelperTextProps } from '@mui/material/FormHelperText';
import MuiCheckbox, { CheckboxProps } from '@mui/material/Checkbox';
import withConfigHOC from '../../../config/withConfig';
import { RHFMuiConfig } from '../../../types';
import { FormHelperText } from '../../common';

export type RHFCheckboxProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  onValueChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  errorMsg?: ReactNode;
  hideErrorMsg?: boolean;
  label?: ReactNode;
  helperText?: ReactNode;
  formControlLabelProps?: Omit<FormControlLabelProps, 'control' | 'label'>;
  formHelperTextProps?: Omit<FormHelperTextProps, 'children' | 'error'>;
} & Omit<CheckboxProps, 'name' | 'checked' | 'onChange'>;

function Checkbox<T extends FieldValues>({
  fieldName,
  control,
  onValueChange,
  errorMsg,
  hideErrorMsg,
  label,
  formControlLabelProps,
  helperText,
  formHelperTextProps,
  defaultFormHelperTextSx,
  ...rest
}: RHFCheckboxProps<T> & RHFMuiConfig) {
  const isError = Boolean(errorMsg);

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
                  onChange={(e) => {
                    onChange(e);
                    onValueChange && onValueChange(e);
                  }}
                />
              }
              label={label}
              {...formControlLabelProps}
            />
            <FormHelperText
              error={isError}
              errorMsg={errorMsg}
              hideErrorMsg={hideErrorMsg}
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

export const RHFCheckbox = withConfigHOC(Checkbox);
