import * as yup from 'yup';
import dayjs, { type Dayjs } from 'dayjs';

export const dateTimeSchema = yup.object({
  dob: yup
    .mixed<Dayjs | string>()
    .required('Date of Birth is required')
    .test('is-valid-date', 'Invalid date', val =>
      Boolean(val && dayjs(val).isValid()))
    .test('not-in-future', 'DOB cannot be in the future', val =>
      val ? dayjs(val).isBefore(dayjs(), 'day') : true),
  dobFather: yup
    .mixed<Dayjs | string>()
    .required('Father\'s Date of Birth is required')
    .test('is-valid-date', 'Invalid date', val =>
      Boolean(val && dayjs(val).isValid()))
    .test('not-in-future', 'Father DOB cannot be in the future', val =>
      val ? dayjs(val).isBefore(dayjs(), 'day') : true),
  time: yup
    .mixed<Dayjs | string>()
    .required('Time is required')
    .test('is-valid-time', 'Invalid time', val =>
      Boolean(val && dayjs(val).isValid())),
  dateOfJourney: yup
    .mixed<Dayjs | string>()
    .required('Date of Journey is required')
    .test('is-valid-datetime', 'Invalid date-time', val =>
      Boolean(val && dayjs(val).isValid()))
    .test('not-in-past', 'Journey date must be in future', val =>
      val ? dayjs(val).isAfter(dayjs()) : true),
});

export type DateTimeFormData = yup.InferType<typeof dateTimeSchema>;
