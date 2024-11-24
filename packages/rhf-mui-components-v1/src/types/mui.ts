import { SxProps } from '@mui/system';

export type MuiPickersAdapter = { new (...args: any): any }

export type RHFMuiConfigInput = {
  defaultFormLabelSx?: SxProps;
  defaultFormControlLabelSx?: SxProps;
  defaultFormHelperTextSx?: SxProps;
  dateAdapter?: MuiPickersAdapter;
}

export type RHFMuiConfig = {
  defaultFormLabelSx: SxProps;
  defaultFormControlLabelSx: SxProps;
  defaultFormHelperTextSx: SxProps;
  dateAdapter?: MuiPickersAdapter;
}
