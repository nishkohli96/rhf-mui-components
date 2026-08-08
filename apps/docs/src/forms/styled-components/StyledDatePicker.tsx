/**
 * The below snippet illustrates how to create a reusable customized DatePicker
 * using MUIDatePicker, which can be used throughout the application.
 *
 * The look is preset here — label above the field, a `dd LLL yyyy` display
 * format, a rounded / tinted input, a branded calendar icon and focus outline —
 * so callers only pass data props (`value`, `onValueChange`, `errorMessage`…).
 * MUIDatePicker forwards every underlying MUI `DatePickerProps` (`slots`,
 * `slotProps`, `format`, …), so all customization is just props — no `styled()`.
 *
 * A similar approach can be taken to create reusable styled components for:
 * - MUITimePicker
 * - MUIDateTimePicker
 */

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import type { PickerValidDate } from '@mui/x-date-pickers/models';
import {
  MUIDatePicker,
  type MUIDatePickerProps
} from '@nish1896/mui-components/mui-pickers/date';

const brandColor = '#007bff';

type StyledDatePickerProps<TDate extends PickerValidDate = PickerValidDate>
  = Omit<MUIDatePickerProps<TDate>, 'showLabelAboveFormField'>;

const StyledDatePicker = <TDate extends PickerValidDate = PickerValidDate>({
  slotProps,
  ...rest
}: StyledDatePickerProps<TDate>) => {
  return (
    <MUIDatePicker
      showLabelAboveFormField
      format="dd LLL yyyy"
      slots={{ openPickerIcon: CalendarMonthIcon }}
      {...rest}
      slotProps={{
        ...slotProps,
        textField: {
          sx: {
            /**
             * MUI X pickers use their own `MuiPickers*` field classes, not the
             * plain `MuiOutlinedInput-*` ones a TextField would.
             */
            '& .MuiPickersInputBase-root': {
              borderRadius: '12px',
              bgcolor: theme => theme.palette.action.hover
            },
            '& .MuiPickersInputBase-root.Mui-focused .MuiPickersOutlinedInput-notchedOutline': {
              borderColor: brandColor,
              borderWidth: 2
            },
            '& .MuiInputAdornment-root .MuiSvgIcon-root': {
              color: brandColor
            }
          }
        }
      }}
    />
  );
};

export default StyledDatePicker;
