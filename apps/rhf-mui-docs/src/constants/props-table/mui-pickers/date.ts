import PropsDescription from '../descriptions/props';
import LegacyPropsDescription from '../descriptions/legacy-props';
import { pickerRows } from './shared';

/** `RHFDatePicker` / `RHFDesktopDatePicker` / `RHFMobileDatePicker` / `RHFStaticDatePicker` — shared props surface. */
export const datePickerRows = pickerRows(
  PropsDescription.customOnChange_DatePicker,
  PropsDescription.onValueChange_DatePicker,
  LegacyPropsDescription.onValueChange_DatePicker_v2_v3
);
