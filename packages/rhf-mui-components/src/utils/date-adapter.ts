import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { AdapterDateFns as AdapterDateFnsV2 } from '@mui/x-date-pickers/AdapterDateFns';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { AdapterOptions, MuiPickersAdapter } from '../types';

export function setDateAdapter(dateLib?: AdapterOptions): MuiPickersAdapter {
	switch(dateLib) {
		case 'dayjs':
			return AdapterDayjs;
		// case 'date-fns-v2':
		// 	return AdapterDateFnsV2;
		case 'date-fns':
			return AdapterDateFns;
		case 'luxon':
			return AdapterLuxon;
		default:
			return AdapterMoment;
	}
}