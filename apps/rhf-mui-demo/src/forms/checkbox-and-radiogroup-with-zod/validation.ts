import * as z from 'zod';
import { Colors, Gender } from '@/types';

export const formSchema = z.object({
  gender: z.enum([Gender.Male, Gender.Female, Gender.Others], {
    message: 'Choose your gender'
  }),
  ageGroup: z.number({ message: 'Select age group' }),
  favouriteColors: z
    .array(z.enum(Colors))
    .min(1, { message: 'Select at least one color' }),
  countriesVisited: z.array(z.string(), {
    message: 'Select atleast one country'
  }),
  marks: z.array(z.number(), {
    message: 'Select at least one mark'
  }),
  agreeTnC: z.boolean({ message: 'Please Agree to T&C' })
});

export type PersonInfo = z.infer<typeof formSchema>;
