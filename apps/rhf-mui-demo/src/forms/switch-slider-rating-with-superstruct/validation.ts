import { object, boolean, number } from 'superstruct';

export type FormSchema = {
  rating: number;
  score: number;
  turnOnWifi: boolean;
};

export const formSchema = object({
  rating: number(),
  score: number(),
  turnOnWifi: boolean(),
});
