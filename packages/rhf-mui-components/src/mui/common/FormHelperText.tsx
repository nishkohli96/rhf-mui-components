import type { ReactNode } from 'react';
import { Fragment, useContext } from 'react';
import MuiFormHelperText from '@mui/material/FormHelperText';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import type { FormHelperTextProps } from '@/types';

type Props = {
  error: boolean;
  errorMessage?: ReactNode;
  helperText?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
};

const FormHelperText = (props: Props) => {
  const {
    formHelperTextProps,
    error,
    errorMessage,
    helperText,
    hideErrorMessage
  } = props;

  const { defaultFormHelperTextSx } = useContext(RHFMuiConfigContext);
  const { sx, ...otherHelperTextProps } = formHelperTextProps ?? {};
  const appliedHelperTextSx = {
    ...defaultFormHelperTextSx,
    ...sx,
  };

  return (
    <Fragment>
      <MuiFormHelperText
        {...otherHelperTextProps}
        component="div"
        sx={appliedHelperTextSx}
        error={error}
      >
        {error && !hideErrorMessage ? errorMessage : helperText}
      </MuiFormHelperText>
    </Fragment>
  );
};

export default FormHelperText;
