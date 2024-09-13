import { object, boolean, number } from 'superstruct';

export const formSchema = object({
  rating: number(),
  score: number(),
  darkTheme: boolean(),
});
