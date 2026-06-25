import { Fragment, useContext, type ReactNode } from 'react';
import MuiFormLabel from '@mui/material/FormLabel';
import { styled } from '@mui/material/styles';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import type { FormLabelProps } from '@/types';

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
  isVisible,
  disabled,
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
        <StyledFormLabel
          {...otherLabelProps}
          required={required}
          error={error}
          disabled={disabled}
          sx={appliedLabelSx}
        >
          {label}
        </StyledFormLabel>
      )}
    </Fragment>
  );
};

export default FormLabel;
