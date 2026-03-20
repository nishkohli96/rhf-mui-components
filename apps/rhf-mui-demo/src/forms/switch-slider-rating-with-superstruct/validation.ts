import {
  object,
  boolean,
  number,
  array,
  Infer,
} from 'superstruct';

export const formSchema = object({
  rating: number(),
  tempRange: array(number()),
  score: number(),
  turnOnWifi: boolean()
});

export type FormSchema = Infer<typeof formSchema>;
