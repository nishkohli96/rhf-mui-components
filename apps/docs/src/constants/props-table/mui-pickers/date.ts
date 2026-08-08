import { PropsDescription as P } from '../descriptions/latest';
import { pickerRows } from './shared';

/** `MUIDatePicker` / `MUIDesktopDatePicker` / `MUIMobileDatePicker` / `MUIStaticDatePicker` — shared props surface. */
export const datePickerRows = pickerRows(P.onValueChange_DatePicker);
