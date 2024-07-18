import { Fragment, ReactNode } from 'react';
import { FieldValues } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import { RHFTextField, RHFTextFieldProps } from '@nish1896/rhf-mui-components';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

type StyledRHFTextFieldProps<T extends FieldValues> = Omit<
  RHFTextFieldProps<T>,
  'variant' | 'showLabelAboveFormField'
>;

type StyledErrorMsgProps = {
  msg: ReactNode;
};

function StyledErrorMsg({ msg }: StyledErrorMsgProps) {
  return (
    <Fragment>
      {Boolean(msg) && (
				<Typography variant="body2">
					<PriorityHighIcon color='error' />
					{msg}
				</Typography>
			)}
    </Fragment>
  );
}

export function StyledRHFTextField<T extends FieldValues>(
  props: StyledRHFTextFieldProps<T>,
) {
  const { errorMsg, ...rest } = props;
  return (
    <RHFTextField
      errorMsg={errorMsg ? <StyledErrorMsg msg={errorMsg} />: undefined}
      variant="standard"
			showLabelAboveFormField
      {...rest}
    />
  );
}
