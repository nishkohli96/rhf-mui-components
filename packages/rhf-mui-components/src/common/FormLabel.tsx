import type { FormLabelProps } from '@/common';
import { Fragment, useContext, type ReactNode } from 'react';
import MuiFormLabel from '@mui/material/FormLabel';
import { styled } from '@mui/material/styles';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';

type Props = {
  label: ReactNode;
  required?: boolean;
  error: boolean;
  isVisible?: boolean;
  disabled?: boolean;
  formLabelProps?: FormLabelProps;
};

/**
 * When label was a typography component, the asterisk was
 * rendering in a new line, the "StyledFormLabel" component
 * addresses this issue.
 */
const StyledFormLabel = styled(MuiFormLabel)(() => ({
  display: 'flex',
  flexDirection: 'row'
}));

const FormLabel = ({
  label,
  required,
  error,
  isVisible,
  disabled,
  formLabelProps
}: Props) => {
  const { defaultFormLabelSx } = useContext(RHFMuiConfigContext);
  const { sx, ...otherLabelProps } = formLabelProps ?? {};
  const appliedLabelSx = {
    ...defaultFormLabelSx,
    ...sx
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Fragment>
      <StyledFormLabel
        {...otherLabelProps}
        disabled={disabled}
        required={required}
        error={error}
        sx={appliedLabelSx}
      >
        {label}
      </StyledFormLabel>
    </Fragment>
  );
};

export default FormLabel;
