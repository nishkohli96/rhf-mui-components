import { FieldValues } from 'react-hook-form';
import { Poppins } from 'next/font/google';
import RHFAutocomplete, {
	RHFAutocompleteProps
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
