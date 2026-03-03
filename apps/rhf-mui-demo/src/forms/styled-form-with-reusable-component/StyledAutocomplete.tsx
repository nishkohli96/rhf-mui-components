/**
 * The below code snippet illustrates how to create a reusable styled Autocomplete
 * component using RHFAutocomplete, which can be used throughout the application.
 *
 * A similar approach can be taken to create reusable styled components for:
 * - RHFMultiAutocomplete
 */

import { type FieldValues } from 'react-hook-form';
import RHFAutocomplete, {
  type RHFAutocompleteProps
} from '@nish1896/rhf-mui-components/mui/autocomplete';
import type { StrObjOption } from '@nish1896/rhf-mui-components/types';

type StyledAutocompleteProps<
	T extends FieldValues,
	Option extends StrObjOption = StrObjOption,
	LabelKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
	ValueKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
> = Omit<RHFAutocompleteProps<T, Option, LabelKey, ValueKey>, 'multiple'>;

const StyledAutocomplete = <
	T extends FieldValues,
	Option extends StrObjOption = StrObjOption,
	LabelKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
	ValueKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
>({
    ...rest
  }: StyledAutocompleteProps<T, Option, LabelKey, ValueKey>) => {
  return (
    <RHFAutocomplete
      formHelperTextProps={{
        sx: { fontColor: theme => theme.palette.info.main }
      }}
      multiple
      {...rest}
    />
  );
};

export default StyledAutocomplete;
