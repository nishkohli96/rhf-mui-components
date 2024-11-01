import { Fragment, ReactNode } from 'react';
import MuiFormLabel, { FormLabelProps } from '@mui/material/FormLabel';
import { RHFMuiConfig } from '../../types';

type Props = {
  label: ReactNode;
  error: boolean;
  isVisible?: boolean;
  formLabelProps?: Omit<FormLabelProps, 'error'>;
} & Pick<RHFMuiConfig, 'defaultFormLabelSx'>;

export function FormLabel(props: Props) {
  const {
    label,
    formLabelProps,
    defaultFormLabelSx,
    error,
    isVisible
  } = props;

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
