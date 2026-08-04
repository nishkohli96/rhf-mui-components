import type { SxProps, Theme } from '@mui/material/styles';

export type MuiPickersAdapter = new (...args: any) => any;

export type RHFMuiConfig = {
  defaultFormLabelSx: SxProps<Theme>;
  defaultFormControlLabelSx: SxProps<Theme>;
  defaultFormHelperTextSx: SxProps<Theme>;
  dateAdapter?: MuiPickersAdapter;
  allLabelsAboveFields?: boolean;
};

export type RHFMuiConfigInput = Partial<RHFMuiConfig>;
