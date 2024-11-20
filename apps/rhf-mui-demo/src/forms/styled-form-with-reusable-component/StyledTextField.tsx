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
  msg: ReactNode;
};

const StyledErrorMsg = ({ msg }: StyledErrorMsgProps) => {
  return (
    <Fragment>
      {Boolean(msg) && (
        <Typography variant="body2">
          <PriorityHighIcon color="error" />
          {msg}
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
      errorMessage={errorMessage ? <StyledErrorMsg msg={errorMessage} /> : undefined}
      variant="standard"
      showLabelAboveFormField
      {...rest}
    />
  );
};

export default StyledRHFTextField;
