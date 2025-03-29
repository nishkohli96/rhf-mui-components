import type { ReactNode } from 'react';
import Button from '@mui/material/Button';

type UploadButtonProps = {
  label: ReactNode;
  fieldName: string;
  disabled?: boolean;
  children?: ReactNode;
};

const UploadButton = ({
  label,
  fieldName,
  disabled,
  children
}: UploadButtonProps) => {
  return (
    <Button
      id={fieldName}
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      disabled={disabled}
      sx={{ textTransform: 'none' }}
    >
      {label}
      {children}
    </Button>
  );
};
export default UploadButton;
