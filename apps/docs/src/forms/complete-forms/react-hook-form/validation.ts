/**
 * Zod schema used by the RHF complete form. Field types are kept exactly in
 * sync with `CompleteFormValues` (../complete-forms/data) — object/nullable
 * fields use `z.custom<T>()` typed to the exact field type so the schema's
 * inferred type lines up with `CompleteFormValues` for `zodResolver`.
 */

import * as z from 'zod';
import moment from 'moment';
import { type PickerValidDate } from '@mui/x-date-pickers/models';
import { type CountryDetails } from '@nish1896/mui-components/mui/country-select';
import { type MUIPhoneInputValue } from '@nish1896/mui-components/misc/phone-input';
import { type CityOption, isBlankHtml } from '../data';

export const zodFormSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First name is required' })
    .min(2, { message: 'At least 2 characters' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
  age: z.custom<number | null>(
    val => typeof val === 'number' && val >= 18,
    {
      error: issue =>
        (issue.input === null ? 'Age is required' : 'Must be 18 or older')
    }
  ),
  tags: z.array(z.string()),
  avatar: z.custom<File | null>(() => true),
  role: z.string().min(1, { message: 'Select a role' }),
  priority: z.string(),
  framework: z.string().min(1, { message: 'Choose a framework' }),
  city: z.custom<CityOption | null>(
    val => Boolean(val),
    { message: 'Select your city' }
  ),
  skills: z.array(z.string()),
  visitedCities: z.custom<CityOption[]>(() => true),
  country: z.custom<CountryDetails | null>(
    val => Boolean(val),
    { message: 'Select your country' }
  ),
  subscribe: z.boolean(),
  hobbies: z.array(z.string()),
  contact: z.string().min(1, { message: 'Choose a contact method' }),
  notifications: z.boolean(),
  volume: z.number(),
  rating: z.custom<number | null>(
    val => typeof val === 'number' && val >= 1,
    { message: 'A rating is required' }
  ),
  dob: z.custom<PickerValidDate | null>(
    val => moment.isMoment(val),
    { message: 'Date of birth is required' }
  ),
  meetingTime: z.custom<PickerValidDate | null>(() => true),
  appointment: z.custom<PickerValidDate | null>(() => true),
  brandColor: z.string(),
  phone: z.custom<MUIPhoneInputValue | null>(
    val => Boolean((val as MUIPhoneInputValue | null)?.phoneNo),
    { message: 'Enter your phone number' }
  ),
  bio: z
    .string()
    .refine(value => !isBlankHtml(value), { message: 'Add a short bio' })
});
