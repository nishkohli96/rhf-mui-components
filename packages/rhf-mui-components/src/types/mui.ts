import { SxProps } from '@mui/system';
import { FormLabelProps as MuiFormLabelProps } from '@mui/material/FormLabel';
import { FormControlLabelProps as MuiFormControlLabelProps } from '@mui/material/FormControlLabel';
import { FormHelperTextProps as MuiFormHelperTextProps } from '@mui/material/FormHelperText';
import { CheckboxProps as MuiCheckboxProps } from '@mui/material/Checkbox';
import { RadioProps as MuiRadioProps } from '@mui/material/Radio';

export type FormLabelProps = Omit<
  MuiFormLabelProps,
  | 'children'
  | 'error'
>

export type FormControlLabelProps = Omit<
  MuiFormControlLabelProps,
  | 'control'
  | 'label'
  | 'value'
  | 'defaultValue'
  | 'defaultChecked'
  | 'disabled'
  | 'key'
>;

export type FormHelperTextProps = Omit<
  MuiFormHelperTextProps,
  | 'children'
  | 'component'
  | 'error'
>

export type CheckboxProps = Omit<
  MuiCheckboxProps,
  | 'name'
  | 'value'
  | 'checked'
  | 'defaultChecked'
  | 'onChange'
>;

export type RadioProps = Omit<
  MuiRadioProps,
  | 'checked'
>;

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
