/**
 * The below code snippet illustrates how to create a reusable styled Select
 * component using MUISelect, which can be used throughout the application.
 *
 * A similar approach can be taken to create reusable styled components for:
 * - MUINativeSelect
 * - MUICheckboxGroup
 * - MUIRadioGroup
 *
 * The only difference being that for all the above components, "multiple" generic
 * prop would not be included in the type definition of the styled component.
 */

import { Poppins } from 'next/font/google';
import MUISelect, {
  type MUISelectProps
} from '@nish1896/mui-components/mui/select';
import type { StrNumObjOption } from '@nish1896/mui-components/types';

const poppins = Poppins({
  subsets: ['latin'],
  style: 'italic',
  weight: '500'
});

type StyledSelectProps<
  Option extends StrNumObjOption = StrNumObjOption,
  LabelKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
  ValueKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
  Multiple extends boolean = false
> = Omit<
  MUISelectProps<Option, LabelKey, ValueKey, Multiple>,
  'showLabelAboveFormField'
>;

const StyledSelect = <
  Option extends StrNumObjOption = StrNumObjOption,
  LabelKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
  ValueKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
  Multiple extends boolean = false
>({
  ...rest
}: StyledSelectProps<Option, LabelKey, ValueKey, Multiple>) => {
  return (
    <MUISelect
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
