import PropsDescription from '../descriptions/props';
import LegacyPropsDescription from '../descriptions/legacy-props';
import { pickerRows } from './shared';

/** `RHFDateTimePicker` / `RHFDesktopDateTimePicker` / `RHFMobileDateTimePicker` / `RHFStaticDateTimePicker` — shared props surface. */
export const dateTimePickerRows = pickerRows(
  PropsDescription.customOnChange_DateTimePicker,
  PropsDescription.onValueChange_DateTimePicker,
  LegacyPropsDescription.onValueChange_DateTimePicker_v2_v3
);
