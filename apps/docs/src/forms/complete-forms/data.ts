/**
 * Shared data, types, initial values, display formatting and manual validation
 * for the three "complete form" examples (state / Formik / TanStack). Each form
 * renders the same fields with the same options, so everything shape-related
 * lives here once. TanStack uses the Joi schema in `schema.ts` instead of the
 * `validate` below; State and Formik share `validate`.
 */

import { format as formatJsDate } from 'date-fns';
import { type PickerValidDate } from '@mui/x-date-pickers/models';
import {
  type CountryDetails,
  type CountryISO
} from '@nish1896/mui-components/mui/country-select';
import { type MUIPhoneInputValue } from '@nish1896/mui-components/misc/phone-input';

export type CityOption = { id: string; name: string; country: string };

export const roleOptions = ['Admin', 'Editor', 'Viewer'];
export const priorityOptions = ['Low', 'Medium', 'High'];
export const frameworkOptions = ['React', 'Vue', 'Angular', 'Svelte', 'Solid'];
export const skillOptions = ['TypeScript', 'Node', 'GraphQL', 'Docker', 'AWS'];
export const hobbyOptions = ['Reading', 'Gaming', 'Cooking', 'Travel'];
export const contactOptions = ['Email', 'Phone', 'SMS'];

export const cityOptions: CityOption[] = [
  { id: 'ldn', name: 'London', country: 'UK' },
  { id: 'nyc', name: 'New York', country: 'USA' },
  { id: 'tyo', name: 'Tokyo', country: 'Japan' },
  { id: 'ber', name: 'Berlin', country: 'Germany' }
];

export const preferredCountries: CountryISO[] = ['US', 'GB', 'IN', 'DE'];

export type CompleteFormValues = {
  firstName: string;
  password: string;
  age: number | null;
  tags: string[];
  avatar: File | null;
  role: string;
  priority: string;
  framework: string;
  city: CityOption | null;
  skills: string[];
  visitedCities: CityOption[];
  country: CountryDetails | null;
  subscribe: boolean;
  hobbies: string[];
  contact: string;
  notifications: boolean;
  volume: number;
  rating: number | null;
  dob: PickerValidDate | null;
  meetingTime: PickerValidDate | null;
  appointment: PickerValidDate | null;
  brandColor: string;
  phone: MUIPhoneInputValue | null;
  bio: string;
};

export type CompleteFormErrors = Partial<Record<keyof CompleteFormValues, string>>;

export const initialValues: CompleteFormValues = {
  firstName: '',
  password: '',
  age: null,
  tags: [],
  avatar: null,
  role: '',
  priority: 'Low',
  framework: '',
  city: null,
  skills: [],
  visitedCities: [],
  country: null,
  subscribe: true,
  hobbies: [],
  contact: '',
  notifications: false,
  volume: 40,
  rating: null,
  dob: null,
  meetingTime: null,
  appointment: null,
  brandColor: '#1976d2',
  phone: null,
  bio: ''
};

/** Strips HTML tags/entities to test that a rich-text value isn't blank. */
export function isBlankHtml(html: string) {
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, '').trim().length === 0;
}

/** Manual validation shared by the state and Formik forms. */
export function validateCompleteForm(values: CompleteFormValues): CompleteFormErrors {
  const errors: CompleteFormErrors = {};
  if (!values.firstName) {
    errors.firstName = 'First name is required';
  } else if (values.firstName.length < 2) {
    errors.firstName = 'At least 2 characters';
  }
  if (!values.password || values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }
  if (values.age === null) {
    errors.age = 'Age is required';
  } else if (values.age < 18) {
    errors.age = 'Must be 18 or older';
  }
  if (!values.role) {
    errors.role = 'Select a role';
  }
  if (!values.framework) {
    errors.framework = 'Choose a framework';
  }
  if (!values.city) {
    errors.city = 'Select your city';
  }
  if (!values.country) {
    errors.country = 'Select your country';
  }
  if (!values.contact) {
    errors.contact = 'Choose a contact method';
  }
  if (!values.rating) {
    errors.rating = 'A rating is required';
  }
  if (!values.dob) {
    errors.dob = 'Date of birth is required';
  }
  if (!values.phone?.phoneNo) {
    errors.phone = 'Enter your phone number';
  }
  if (isBlankHtml(values.bio)) {
    errors.bio = 'Add a short bio';
  }
  return errors;
}

/**
 * Normalizes any picker date value to a native `Date`, regardless of the
 * configured adapter. Each complete-form example uses a different date library
 * (Dayjs/Moment expose `toDate`, Luxon exposes `toJSDate`, date-fns already
 * uses native `Date`), so `PickerValidDate` has no single shared format method.
 */
function toJsDate(value: PickerValidDate | null): Date | null {
  if (!value) {
    return null;
  }
  if (value instanceof Date) {
    return value;
  }
  const candidate = value as { toDate?: () => Date; toJSDate?: () => Date };
  if (typeof candidate.toDate === 'function') {
    return candidate.toDate();
  }
  if (typeof candidate.toJSDate === 'function') {
    return candidate.toJSDate();
  }
  return null;
}

function formatPickerValue(
  value: PickerValidDate | null,
  pattern: string
): string | null {
  const jsDate = toJsDate(value);
  return jsDate ? formatJsDate(jsDate, pattern) : null;
}

/** Converts File/date/objects to JSON-friendly values for the state readout. */
export function toDisplayValues(values: CompleteFormValues) {
  return {
    ...values,
    avatar: values.avatar?.name ?? null,
    country: values.country?.name ?? null,
    dob: formatPickerValue(values.dob, 'yyyy-MM-dd'),
    meetingTime: formatPickerValue(values.meetingTime, 'HH:mm'),
    appointment: formatPickerValue(values.appointment, 'yyyy-MM-dd HH:mm')
  };
}
