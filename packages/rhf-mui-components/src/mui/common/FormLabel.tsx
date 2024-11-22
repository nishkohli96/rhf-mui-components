import { Fragment, ReactNode, useContext } from 'react';
import MuiFormLabel from '@mui/material/FormLabel';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { FormLabelProps } from '@/types';

type Props = {
  label: ReactNode;
  error: boolean;
  isVisible?: boolean;
  formLabelProps?: FormLabelProps;
};

const FormLabel = (props: Props) => {
  const {
    label,
    formLabelProps,
    error,
    isVisible
  } = props;

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
