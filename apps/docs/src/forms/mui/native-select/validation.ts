import { IsString, IsNumber } from 'class-validator';

export class FormSchema {
	@IsString({ message: 'Select currency' })
	currency!: string;

	@IsNumber()
	ageGroup!: number;
}
