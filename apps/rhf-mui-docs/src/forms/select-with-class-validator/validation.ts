import {
  IsString,
  IsEnum,
  IsArray,
  ArrayMinSize,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  Validate
} from 'class-validator';
import { Colors } from '@site/src/types';
import { IPLTeams } from '@site/src/constants';

@ValidatorConstraint({ name: 'isValidIPLTeam', async: false })
export class IsValidIPLTeam implements ValidatorConstraintInterface {
  validate(value: string[]) {
    if(!value) {
      return true;
    }
    return (value ?? []).every(team =>
      IPLTeams.some(iplTeam => iplTeam.abbr === team));
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must contain valid IPL team abbreviations`;
  }
}

export class FormSchema {
  @IsEnum(Colors, { message: 'Select a color' })
  favouriteColor!: Colors;

  @IsString()
  currency!: string;

  @IsArray()
  @ArrayMinSize(1, { message: 'Select atleast one option' })
  @IsString({ each: true })
  @Validate(IsValidIPLTeam, { message: 'Each option must be from IPLTeams array' })
  iplTeams!: string[];
}
