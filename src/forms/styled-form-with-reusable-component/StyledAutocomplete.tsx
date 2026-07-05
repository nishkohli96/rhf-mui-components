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
import type { StrObjOption } from '@nish1896/rhf-mui-components';

const StyledAutocomplete = <
	T extends FieldValues,
	Option extends StrObjOption = StrObjOption,
	LabelKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
	ValueKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
  Multiple extends boolean = false,
  DisableClearable extends boolean = false,
>({
    multiple,
    ...otherAutocompleteProps
  }: RHFAutocompleteProps<T, Option, LabelKey, ValueKey, Multiple, DisableClearable>) => {
  return (
    <RHFAutocomplete
      {...otherAutocompleteProps}
      formHelperTextProps={{
        sx: { fontColor: theme => theme.palette.info.main }
      }}
      multiple={multiple}
    />
  );
};

export default StyledAutocomplete;
