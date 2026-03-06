import type { ReactNode } from 'react';
import MuiFormControl from '@mui/material/FormControl';

type FormControlProps = {
  children: ReactNode | ReactNode[];
  error: boolean;
  fullWidth?: boolean;
};

const FormControl = ({
  children,
  error,
  fullWidth = true
}: FormControlProps) => {
  return (
    <MuiFormControl fullWidth={fullWidth} error={error}>
      {children}
    </MuiFormControl>
  );
};

export default FormControl;
