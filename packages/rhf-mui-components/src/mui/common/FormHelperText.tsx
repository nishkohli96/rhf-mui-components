import { Fragment, ReactNode, useContext } from 'react';
import MuiFormHelperText, { FormHelperTextProps } from '@mui/material/FormHelperText';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';

type Props = {
  error: boolean;
  errorMessage?: ReactNode;
  helperText?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: Omit<FormHelperTextProps, 'error' | 'children'>;
};

export function FormHelperText(props: Props) {
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
        sx={appliedHelperTextSx}
        error={error}
      >
        {error && !hideErrorMessage ? errorMessage : helperText}
      </MuiFormHelperText>
    </Fragment>
  );
}
