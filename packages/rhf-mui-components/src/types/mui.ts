import { SxProps } from '@mui/system';
import { FormLabelProps as MuiFormLabelProps } from '@mui/material/FormLabel';
import { FormControlLabelProps as MuiFormControlLabelProps } from '@mui/material/FormControlLabel';
import { FormHelperTextProps as MuiFormHelperTextProps } from '@mui/material/FormHelperText';
import { CheckboxProps as MuiCheckboxProps } from '@mui/material/Checkbox';
import { RadioProps as MuiRadioProps } from '@mui/material/Radio';
import{ SelectProps as MuiSelectProps } from '@mui/material/Select';
import { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';
import { ChipProps } from '@mui/material/Chip';

export type FormLabelProps = Omit<
  MuiFormLabelProps,
  | 'children'
  | 'required'
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

export type SelectProps = Omit<
  MuiSelectProps,
  | 'name'
  | 'id'
  | 'labelId'
  | 'error'
  | 'onChange'
  | 'value'
  | 'defaultValue'
  | 'onBlur'
  | 'ref'
>;

export type AutoCompleteTextFieldProps = Omit<
  MuiTextFieldProps,
  | 'value'
  | 'onChange'
  | 'disabled'
  | 'inputProps'
  | 'slotProps'
  | 'label'
  | 'required'
  | 'error'
>;

export type OmittedAutocompleteProps =
  | 'freeSolo'
  | 'fullWidth'
  | 'renderInput'
  | 'renderOption'
  | 'options'
  | 'value'
  | 'defaultValue'
  | 'multiple'
  | 'onChange'
  | 'getOptionKey'
  | 'getOptionLabel'
  | 'isOptionEqualToValue'
  | 'autoHighlight'
  | 'disableCloseOnSelect';

export type MuiChipProps = Omit<
  ChipProps,
  | 'key'
  | 'label'
  | 'onDelete'
  | 'disabled'
>;

export type MuiPickersAdapter = { new (...args: any): any }

export type RHFMuiConfigInput = {
  defaultFormLabelSx?: SxProps;
  defaultFormControlLabelSx?: SxProps;
  defaultFormHelperTextSx?: SxProps;
  dateAdapter?: MuiPickersAdapter;
  allLabelsAboveFields?: boolean;
}

export type RHFMuiConfig = {
  defaultFormLabelSx: SxProps;
  defaultFormControlLabelSx: SxProps;
  defaultFormHelperTextSx: SxProps;
  dateAdapter?: MuiPickersAdapter;
  allLabelsAboveFields?: boolean;
}
