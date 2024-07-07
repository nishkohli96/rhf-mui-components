import { object, boolean, number } from 'superstruct';

type FormSchema = {
	rating: number;
	score: number;
	darkTheme: boolean;
}

export const formSchema = object({
	rating: number(),
	score: number(),
	darkTheme: boolean(),
})