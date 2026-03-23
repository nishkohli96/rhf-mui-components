import { useContext, Fragment, type ReactNode } from 'react';
import MuiFormHelperText from '@mui/material/FormHelperText';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import type { FormHelperTextProps } from '@/types';

type CommonHelperTextProps = {
  error: boolean;
  errorMessage?: ReactNode;
  helperText?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
  showHelperTextElement?: boolean;
};

const FormHelperText = ({
  formHelperTextProps,
  error,
  errorMessage,
  helperText,
  hideErrorMessage,
  showHelperTextElement
}: CommonHelperTextProps) => {

  const { defaultFormHelperTextSx } = useContext(RHFMuiConfigContext);
  const { sx, ...otherHelperTextProps } = formHelperTextProps ?? {};
  const appliedHelperTextSx = {
    ...defaultFormHelperTextSx,
    ...sx,
  };

  return (
    <Fragment>
      {showHelperTextElement && (
        <MuiFormHelperText
          {...otherHelperTextProps}
          component="div"
          sx={appliedHelperTextSx}
          error={error}
        >
          {error && !hideErrorMessage ? errorMessage : helperText}
        </MuiFormHelperText>
      )}
    </Fragment>
  );
};

export default FormHelperText;
