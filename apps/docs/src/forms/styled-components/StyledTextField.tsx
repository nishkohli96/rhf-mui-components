/**
 * The below code snippet illustrates how to create a reusable styled Textfield
 * component using MUITextField, which can be used throughout the application.
 *
 * In this example, the component accepts all the props of MUITextField except
 * 'renderError', 'variant' and 'showLabelAboveFormField', which have already
 * been configured to maintain consistent styling across the application.
 * Additionally, it includes a custom error message component that displays an
 * error icon alongside the error message when there is an error.
 *
 * A similar approach can be taken to create reusable styled components for:
 * - MUINumberInput
 * - MUITagsInput
 * - MUIPasswordInput
 */

import { Fragment, type ReactNode } from 'react';
import Typography from '@mui/material/Typography';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import MUITextField, { type MUITextFieldProps } from '@nish1896/mui-components/mui/textfield';

type StyledTextFieldProps = Omit<
  MUITextFieldProps,
  'renderError' | 'showLabelAboveFormField' | 'variant'
>;

type StyledErrorMsgProps = {
  errorMessage: ReactNode;
};

const StyledErrorMsg = ({ errorMessage }: StyledErrorMsgProps) => {
  return (
    <Fragment>
      {Boolean(errorMessage) && (
        <Typography
          variant="body2"
          sx={{
            alignItems: 'center',
            display: 'flex',
            gap: 0.5
          }}
        >
          <PriorityHighIcon color="error" fontSize="small" />
          {errorMessage}
        </Typography>
      )}
    </Fragment>
  );
};

const StyledTextField = (
  props: StyledTextFieldProps
) => {
  const { formHelperTextProps, ...rest } = props;
  const {
    sx: helperTextSx,
    ...otherFormHelperTextProps
  } = formHelperTextProps ?? {};
  const helperTextSxList = Array.isArray(helperTextSx)
    ? helperTextSx
    : [];

  if (helperTextSx && !Array.isArray(helperTextSx)) {
    helperTextSxList.push(helperTextSx);
  }

  return (
    <MUITextField
      {...rest}
      variant="standard"
      showLabelAboveFormField
      formHelperTextProps={{
        ...otherFormHelperTextProps,
        sx: [
          ...helperTextSxList,
          { ml: 0 }
        ]
      }}
      renderError={error => (
        <StyledErrorMsg errorMessage={error} />
      )}
    />
  );
};

export default StyledTextField;
