import { Fragment, ReactNode } from 'react';
import { FieldValues } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import RHFTextField, { RHFTextFieldProps } from '@nish1896/rhf-mui-components/mui/textfield';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

type StyledRHFTextFieldProps<T extends FieldValues> = Omit<
  RHFTextFieldProps<T>,
  'variant' | 'showLabelAboveFormField'
>;

type StyledErrorMsgProps = {
  errorMessage: ReactNode;
};

const StyledErrorMsg = ({ errorMessage }: StyledErrorMsgProps) => {
  return (
    <Fragment>
      {Boolean(errorMessage) && (
        <Typography variant="body2">
          <PriorityHighIcon color="error" />
          {errorMessage}
        </Typography>
      )}
    </Fragment>
  );
};

const StyledRHFTextField = <T extends FieldValues>(
  props: StyledRHFTextFieldProps<T>
) => {
  const { errorMessage, ...rest } = props;
  return (
    <RHFTextField
      errorMessage={
        errorMessage ? <StyledErrorMsg errorMessage={errorMessage} /> : undefined
      }
      variant="standard"
      showLabelAboveFormField
      {...rest}
    />
  );
};

export default StyledRHFTextField;
