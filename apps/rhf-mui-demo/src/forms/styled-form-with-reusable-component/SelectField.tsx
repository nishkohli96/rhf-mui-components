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

type SelectFieldProps<
  T extends FieldValues,
  Option extends StrNumObjOption = StrNumObjOption,
  LabelKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
  ValueKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
  Multiple extends boolean = false
> = Omit<
  RHFSelectProps<T, Option, LabelKey, ValueKey, Multiple>,
  'showLabelAboveFormField'
>;

const SelectField = <
  T extends FieldValues,
  Option extends StrNumObjOption = StrNumObjOption,
  LabelKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
  ValueKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
  Multiple extends boolean = false
>({
  ...rest
}: SelectFieldProps<T, Option, LabelKey, ValueKey, Multiple>) => {
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

export default SelectField;
