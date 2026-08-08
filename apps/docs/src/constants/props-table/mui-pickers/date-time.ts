import { PropsDescription as P } from '../descriptions/latest';
import { pickerRows } from './shared';

/** `MUIDateTimePicker` / `MUIDesktopDateTimePicker` / `MUIMobileDateTimePicker` / `MUIStaticDateTimePicker` — shared props surface. */
export const dateTimePickerRows = pickerRows(P.onValueChange_DateTimePicker);
