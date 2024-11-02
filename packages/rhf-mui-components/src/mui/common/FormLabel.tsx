import { Fragment, ReactNode, useContext } from 'react';
import MuiFormLabel, { FormLabelProps } from '@mui/material/FormLabel';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';

type Props = {
  label: ReactNode;
  error: boolean;
  isVisible?: boolean;
  formLabelProps?: Omit<FormLabelProps, 'error'>;
};

export function FormLabel(props: Props) {
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
}
