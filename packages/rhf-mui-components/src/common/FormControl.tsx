import type { ReactNode } from 'react';
import MuiFormControl, {
  type FormControlProps as MuiFormControlProps
} from '@mui/material/FormControl';

type OmittedFormControlProps = Omit<MuiFormControlProps, 'children' | 'error'>;

type FormControlProps = {
  children: ReactNode | ReactNode[];
  error: boolean;
} & OmittedFormControlProps;

const FormControl = ({
  children,
  error,
  fullWidth = true,
  ...otherFormControlProps
}: FormControlProps) => {
  return (
    <MuiFormControl
      fullWidth={fullWidth}
      error={error}
      {...otherFormControlProps}
    >
      {children}
    </MuiFormControl>
  );
};

export default FormControl;
