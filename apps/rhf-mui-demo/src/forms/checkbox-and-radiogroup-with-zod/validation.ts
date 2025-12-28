import * as z from 'zod';
import { Gender } from '@/types';

export type PersonInfo = {
  gender: Gender;
  countriesVisited: string[];
  agreeTnC: boolean;
};

export const formSchema = z.object({
  gender: z.enum([Gender.Male, Gender.Female, Gender.Others], {
    message: 'Choose your gender'
  }),
  countriesVisited: z.array(z.string(), {
    message: 'Select atleast one country'
  }),
  marks: z.array(z.number(), {
    message: 'Select at least one mark'
  }),
  agreeTnC: z.boolean({ message: 'Please Agree to T&C' })
});
