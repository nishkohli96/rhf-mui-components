import { Fragment, ReactNode, useContext } from 'react';
import MuiFormLabel from '@mui/material/FormLabel';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { FormLabelProps } from '@/types';

type Props = {
  label: ReactNode;
  isVisible?: boolean;
  required?: boolean;
  error: boolean;
  formLabelProps?: FormLabelProps;
};

const FormLabel = ({
  label,
  isVisible,
  required,
  error,
  formLabelProps
}: Props) => {
  const { defaultFormLabelSx } = useContext(RHFMuiConfigContext);
  const { sx, ...otherLabelProps } = formLabelProps ?? {};
  const appliedLabelSx = {
    ...defaultFormLabelSx,
    ...sx
  };

  return (
    <Fragment>
      {isVisible && (
        <MuiFormLabel
          {...otherLabelProps}
          required={required}
          error={error}
          sx={appliedLabelSx}
        >
          {label}
        </MuiFormLabel>
      )}
    </Fragment>
  );
};

export default FormLabel;
