/**
 * The below code snippet illustrates how to create a reusable styled Select
 * component using RHFSelect, which can be used throughout the application.
 *
 * `multiple` is left in the prop surface (not `Omit`'d) so its generic
 * `Multiple` type param is inferred per call site from the literal passed —
 * same as `RHFSelect` itself. Omitting `multiple` from the props type would
 * pin `Multiple` to its default and make passing `multiple={false}` a type
 * error.
 *
 * A similar approach can be taken to create reusable styled components for:
 * - RHFNativeSelect
 * - RHFCheckboxGroup
 * - RHFRadioGroup
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
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

type StyledSelectProps<
  T extends FieldValues,
  Option extends StrNumObjOption = StrNumObjOption,
  LabelKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
  ValueKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
  Multiple extends boolean = true
> = Omit<
  RHFSelectProps<T, Option, LabelKey, ValueKey, Multiple>,
  'showLabelAboveFormField'
>;

const StyledSelect = <
  T extends FieldValues,
  Option extends StrNumObjOption = StrNumObjOption,
  LabelKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
  ValueKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
  Multiple extends boolean = true
>({
  formLabelProps,
  ...rest
}: StyledSelectProps<T, Option, LabelKey, ValueKey, Multiple>) => {

  return (
    <RHFSelect
      formLabelProps={{
        ...formLabelProps,
        sx: {
          fontFamily: poppins.style.fontFamily,
          fontWeight: 400,
          ...formLabelProps?.sx
        }
      }}
      showLabelAboveFormField
      {...rest}
    />
  );
};

export default StyledSelect;
