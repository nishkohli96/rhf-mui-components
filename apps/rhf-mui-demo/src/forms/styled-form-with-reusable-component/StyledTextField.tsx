/**
 * The below code snippet illustrates how to create a reusable styled Textfield
 * component using RHFTextField, which can be used throughout the application.
 *
 * In this example, the component accepts all the props of RHFTextField except
 * 'variant' and 'showLabelAboveFormField', which are set to specific values
 * to maintain consistent styling across the application.
 * Additionally, it includes a custom error message component that displays an
 * error icon alongside the error message when there is an error.
 *
 * A similar approach can be taken to create reusable styled components for:
 * - RHFNumberInput
 * - RHFTagsInput
 * - RHFPasswordInput
 */

import { Fragment, type ReactNode } from 'react';
import { type FieldValues } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import RHFTextField, { type RHFTextFieldProps } from '@nish1896/rhf-mui-components/mui/textfield';
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
