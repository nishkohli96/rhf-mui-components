import {
  IsString,
  IsNumber,
  IsEnum,
  IsArray,
  ArrayMinSize,
  ArrayUnique,
  ValidatorConstraint,
  type ValidatorConstraintInterface,
  type ValidationArguments,
  Validate,
} from 'class-validator';
import { Colors } from '@/types';
import { iplTeams } from '@/constants';

@ValidatorConstraint({ name: 'isValidIPLTeam', async: false })
export class IsValidIPLTeam implements ValidatorConstraintInterface {
  validate(value: string[]) {
    if(!value) {
      return true;
    }
    return (value ?? []).every(team =>
      iplTeams.some(iplTeam => iplTeam.abbr === team));
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must contain valid IPL team abbreviations`;
  }
}

export class FormSchema {
  @IsEnum(Colors, { message: 'Select a color' })
  favouriteColor!: Colors;

  @IsArray()
  @ArrayMinSize(1, { message: 'Select atleast one option' })
  @ArrayUnique()
  @IsString({ each: true })
  languages!: string[];

  @IsNumber(undefined, { message: 'Select a number' })
  randomNum!: number;

  @IsArray()
  @ArrayMinSize(1, { message: 'Select atleast one option' })
  @ArrayUnique()
  @IsString({ each: true })
  @Validate(IsValidIPLTeam, { message: 'Each option must be from iplTeams array' })
  iplTeams!: string[];
}
