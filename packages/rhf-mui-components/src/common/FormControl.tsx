import type { ReactElement } from 'react';
import MuiFormControl from '@mui/material/FormControl';

type Props = {
  children: ReactElement | ReactElement[];
  error: boolean;
  fullWidth?: boolean;
};

const FormControl = (props: Props) => {
  const { children, error, fullWidth = true } = props;
  return (
    <MuiFormControl fullWidth={fullWidth} error={error}>
      {children}
    </MuiFormControl>
  );
};

export default FormControl;
