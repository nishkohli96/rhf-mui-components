import type { ReactElement } from 'react';
import MuiFormControl, {
  type FormControlProps as MuiFormControlProps
} from '@mui/material/FormControl';

type OmittedFormControlProps = Omit<MuiFormControlProps, 'children' | 'error'>;

type FormControlProps = {
  children: ReactElement | ReactElement[];
  error: boolean;
  disabled?: boolean;
} & OmittedFormControlProps;

const FormControl = ({
  children,
  fullWidth = true,
  error,
  disabled,
  ...otherFormControlProps
}: FormControlProps) => {
  return (
    <MuiFormControl
      fullWidth={fullWidth}
      error={error}
      disabled={disabled}
      {...otherFormControlProps}
    >
      {children}
    </MuiFormControl>
  );
};

export default FormControl;
