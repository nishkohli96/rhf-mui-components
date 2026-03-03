/**
 * The below code snippet illustrates how to create a reusable styled Select
 * component using RHFSelect, which can be used throughout the application.
 *
 * A similar approach can be taken to create reusable styled components for:
 * - RHFNativeSelect
 * - RHFCheckboxGroup
 * - RHFRadioGroup
 *
 * The only difference being that for all the above components, "multiple" generic
 * prop would not be included in the type definition of the styled component.
 */

import { type FieldValues } from 'react-hook-form';
import { Poppins } from 'next/font/google';
import RHFSelect, {
  type RHFSelectProps
} from '@nish1896/rhf-mui-components/mui/select';
import type { StrNumObjOption } from '@nish1896/rhf-mui-components/types';

const poppins = Poppins({
  subsets: ['latin'],
  style: 'italic',
  weight: '500'
});

type StyledSelectProps<
  T extends FieldValues,
  Option extends StrNumObjOption = StrNumObjOption,
  LabelKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
  ValueKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
  Multiple extends boolean = false
> = Omit<
  RHFSelectProps<T, Option, LabelKey, ValueKey, Multiple>,
  'showLabelAboveFormField'
>;

const StyledSelect = <
  T extends FieldValues,
  Option extends StrNumObjOption = StrNumObjOption,
  LabelKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
  ValueKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
  Multiple extends boolean = false
>({
    ...rest
  }: StyledSelectProps<T, Option, LabelKey, ValueKey, Multiple>) => {
  return (
    <RHFSelect
      showLabelAboveFormField
      formLabelProps={{
        sx: {
          fontFamily: poppins.style.fontFamily,
          fontWeight: 600
        }
      }}
      {...rest}
    />
  );
};

export default StyledSelect;
