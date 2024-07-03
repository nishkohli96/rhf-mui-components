import { SxProps } from '@mui/system';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { AdapterDateFns as AdapterDateFnsV2 } from '@mui/x-date-pickers/AdapterDateFns';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { PickerValidDate } from '@mui/x-date-pickers';

export type AdapterOptions =
  | 'dayjs'
  | 'date-fns-2'
  | 'date-fns'
  | 'luxon'
  | 'moment'

export type MuiPickersAdapter =
  | typeof AdapterDayjs
  //| typeof AdapterDateFnsV2
  | typeof AdapterDateFns
  | typeof AdapterLuxon
  | typeof AdapterMoment;

export type MuiPickersInitialValue = PickerValidDate | null;

export type RHFMuiConfigInput = {
  defaultFormLabelSx?: SxProps;
  defaultFormHelperTextSx?: SxProps;
  dateAdapter?: AdapterOptions;
}

export type RHFMuiConfig = {
  defaultFormLabelSx: SxProps;
  defaultFormHelperTextSx: SxProps;
  dateAdapter: MuiPickersAdapter;
}
// export type RHFMuiConfig = {
//   formLabelSx: SxProps;
//   formHelperTextSx: SxProps;
//   dateAdapter: MuiPickersAdapter;
// }