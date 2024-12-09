import { ReactElement } from 'react';
import MuiFormControl from '@mui/material/FormControl';

type Props = {
  children: ReactElement | ReactElement[];
  error: boolean;
}

export function FormControl(props: Props) {
  const { children, error } = props;
  return (
    <MuiFormControl fullWidth error={error}>
      {children}
    </MuiFormControl>
  );
}
