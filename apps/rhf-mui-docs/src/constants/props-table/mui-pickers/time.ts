import PropsDescription from '../descriptions/props';
import LegacyPropsDescription from '../descriptions/legacy-props';
import { pickerRows } from './shared';

/** `RHFTimePicker` / `RHFDesktopTimePicker` / `RHFMobileTimePicker` / `RHFStaticTimePicker` — shared props surface. */
export const timePickerRows = pickerRows(
  PropsDescription.customOnChange_TimePicker,
  PropsDescription.onValueChange_TimePicker,
  LegacyPropsDescription.onValueChange_TimePicker_v2_v3
);
