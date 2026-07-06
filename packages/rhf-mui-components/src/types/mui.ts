import type { SxProps } from '@mui/system';

export type MuiPickersAdapter = new (...args: any) => any;

export type RHFMuiConfig = {
  defaultFormLabelSx: SxProps;
  defaultFormControlLabelSx: SxProps;
  defaultFormHelperTextSx: SxProps;
  dateAdapter?: MuiPickersAdapter;
  allLabelsAboveFields?: boolean;
};

export type RHFMuiConfigInput = Partial<RHFMuiConfig>;
