import * as z from 'zod';
import { Colors, Gender } from '@/types';

export type PersonInfo = {
  gender: Gender;
  ageGroup: number;
  favouriteColors: Colors[];
  countriesVisited: string[];
  marks: number[];
  agreeTnC: boolean;
};

export const formSchema = z.object({
  gender: z.enum([Gender.Male, Gender.Female, Gender.Others], {
    message: 'Choose your gender'
  }),
  ageGroup: z.number({ message: 'Select age group' }),
  favouriteColors: z.array(z.nativeEnum(Colors), {
    message: 'Select at least one color',
    invalid_type_error: 'Invalid color selection'
  }),
  countriesVisited: z.array(z.string(), {
    message: 'Select atleast one country'
  }),
  marks: z.array(z.number(), {
    message: 'Select at least one mark'
  }),
  agreeTnC: z.boolean({ message: 'Please Agree to T&C' })
});
