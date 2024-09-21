import { Fragment, ReactNode } from 'react';
import MuiFormHelperText, { FormHelperTextProps } from '@mui/material/FormHelperText';
import { RHFMuiConfig } from '../../types';

type Props = {
  error: boolean;
  errorMessage?: ReactNode;
	helperText?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: Omit<FormHelperTextProps, 'error' | 'children'>;
} & Pick<RHFMuiConfig, 'defaultFormHelperTextSx'>;

export function FormHelperText(props: Props) {
  const {
    formHelperTextProps,
    defaultFormHelperTextSx,
    error,
		errorMessage,
		helperText,
    hideErrorMessage
  } = props;

  const { sx , ...otherHelperTextProps } = formHelperTextProps ?? {};
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
