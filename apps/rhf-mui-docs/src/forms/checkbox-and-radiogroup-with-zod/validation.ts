import * as z from 'zod';
import { Gender } from '@site/src/types';

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
  agreeTnC: z.boolean({ message: 'Please Agree to T&C' })
});
