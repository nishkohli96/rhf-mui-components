/**
 * The below code snippet illustrates how to create a reusable styled Autocomplete
 * component using MUIAutocomplete, which can be used throughout the application.
 *
 * A similar approach can be taken to create reusable styled components for:
 * - MUIAutocompleteObject
 * - MUIMultiAutocomplete
 * - MUIMultiAutocompleteObject
 */

import MUIAutocomplete, {
  type MUIAutocompleteProps
} from '@nish1896/mui-components/mui/autocomplete';
import type { StrObjOption } from '@nish1896/mui-components/types';

type StyledAutocompleteProps<
  Option extends StrObjOption = StrObjOption,
  LabelKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
  ValueKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
  DisableClearable extends boolean = false,
  FreeSolo extends boolean = false
> = Omit<MUIAutocompleteProps<Option, LabelKey, ValueKey, true, DisableClearable, FreeSolo>, 'multiple'>;

const StyledAutocomplete = <
  Option extends StrObjOption = StrObjOption,
  LabelKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
  ValueKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
  DisableClearable extends boolean = false,
  FreeSolo extends boolean = false
>({
  ...rest
}: StyledAutocompleteProps<Option, LabelKey, ValueKey, DisableClearable, FreeSolo>) => {
  return (
    <MUIAutocomplete
      formHelperTextProps={{
        sx: { fontColor: theme => theme.palette.info.main }
      }}
      multiple
      {...rest}
    />
  );
};

export default StyledAutocomplete;
