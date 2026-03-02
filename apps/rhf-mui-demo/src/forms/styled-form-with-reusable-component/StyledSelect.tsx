import { FieldValues } from 'react-hook-form';
import { Poppins } from 'next/font/google';
import RHFSelect, {
  RHFSelectProps
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
    <RHFSelect<T, Option, LabelKey, ValueKey, Multiple>
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
