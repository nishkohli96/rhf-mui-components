import { ReactNode } from 'react';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

type UploadButtonProps = {
  fieldName: string;
  disabled?: boolean;
	multiple?: boolean;
  children?: ReactNode;
};

const UploadButton = ({
	fieldName,
	disabled,
	multiple,
	children
}: UploadButtonProps) => {
  return (
    <Button
      id={fieldName}
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
      disabled={disabled}
    >
      {`Upload file${multiple ? 's':''}`}
			{children}
    </Button>
  );
};
export default UploadButton;
