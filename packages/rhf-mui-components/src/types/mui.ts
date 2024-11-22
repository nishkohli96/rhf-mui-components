import { SxProps } from '@mui/system';
import { FormLabelProps as MuiFormLabelProps } from '@mui/material/FormLabel';
import { FormHelperTextProps as MuiFormHelperTextProps } from '@mui/material/FormHelperText';

export type FormLabelProps = Omit<
  MuiFormLabelProps,
  | 'error'
  | 'children'
> 

export type FormHelperTextProps = Omit<
  MuiFormHelperTextProps,
  | 'error'
  | 'children'
> 

export type MuiPickersAdapter = { new (...args: any): any }

export type RHFMuiConfigInput = {
  defaultFormLabelSx?: SxProps;
  defaultFormControlLabelSx?: SxProps;
  defaultFormHelperTextSx?: SxProps;
  dateAdapter?: MuiPickersAdapter;
  allLabelsAboveFormField?: boolean;
}

export type RHFMuiConfig = {
  defaultFormLabelSx: SxProps;
  defaultFormControlLabelSx: SxProps;
  defaultFormHelperTextSx: SxProps;
  dateAdapter?: MuiPickersAdapter;
  allLabelsAboveFormField?: boolean;
}
