import { PropsDescription as P } from '../descriptions/latest';
import { pickerRows } from './shared';

/** `MUITimePicker` / `MUIDesktopTimePicker` / `MUIMobileTimePicker` / `MUIStaticTimePicker` — shared props surface. */
export const timePickerRows = pickerRows(P.onValueChange_TimePicker);
