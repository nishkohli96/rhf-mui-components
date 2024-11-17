import { useContext, Fragment, ReactNode } from 'react';
import {
  UseFormRegister,
  RegisterOptions,
  Path,
  FieldValues
} from 'react-hook-form';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import { FormLabelProps } from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import { FormHelperTextProps } from '@mui/material/FormHelperText';
import MuiSelect, {
  SelectChangeEvent,
  SelectProps
} from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { FormControl, FormLabel, FormHelperText } from '@/mui/common';
import { CountryDetails } from '@/types';
import { fieldNameToLabel, keepLabelAboveFormField } from '@/utils';
import { countryList } from './countries';

type SelectValueType = string;

type SelectInputProps = Omit<
  SelectProps,
  'name' | 'id' | 'labelId' | 'error' | 'onChange' | 'value' | 'defaultValue' | 'multiple'
>;

export type RHFCountrySelectProps<T extends FieldValues> = {
  fieldName: Path<T>;
  register: UseFormRegister<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  countries?: CountryDetails[];
  preferredCountries?: string[];
  defaultValue?: SelectValueType;
  valueKey?: keyof Omit<CountryDetails, 'emoji'>;
  showDefaultOption?: boolean;
  defaultOptionText?: string;
  onValueChange?: (e: SelectChangeEvent<SelectValueType>) => void;
  showLabelAboveFormField?: boolean;
  formLabelProps?: Omit<FormLabelProps, 'error'>;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: Omit<FormHelperTextProps, 'children' | 'error'>;
} & SelectInputProps;

type CountryMenuItemProps = {
  countryInfo: CountryDetails;
};

const RHFCountrySelect = <T extends FieldValues>({
  fieldName,
  register,
  registerOptions,
  countries,
  preferredCountries,
  defaultValue,
  valueKey,
  showDefaultOption,
  defaultOptionText,
  onValueChange,
  label,
  showLabelAboveFormField,
  formLabelProps,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  ...otherSelectProps
}: RHFCountrySelectProps<T>) => {
  const { allLabelsAboveFormField } = useContext(RHFMuiConfigContext);
  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFormField
  );
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isError = Boolean(errorMessage);
  const countryValueKey = valueKey ?? 'iso';

  const { onChange, ...rest } = register(fieldName, registerOptions);

  const countryOptions = countries ?? countryList;
  let countriesToList = countryOptions;
  let countriesToListAtTop: CountryDetails[] = [];

  /**
   * Render preferred countries at the top of the list.
   * Preferred countries will maintain the order in which they were
   * specified in the props, while other countries will be sorted
   * alphabetically.
   */
  if (preferredCountries?.length) {
    countriesToListAtTop = countryOptions.filter(country =>
      preferredCountries.includes(country[countryValueKey]));
    countriesToListAtTop.sort((a, b) => {
      return (
        preferredCountries.indexOf(a[countryValueKey]) - preferredCountries.indexOf(b[countryValueKey])
      );
    });

    countriesToList = countryOptions.filter(
      country => !preferredCountries.includes(country[countryValueKey])
    );
  }

  const CountryMenuItem = ({ countryInfo }: CountryMenuItemProps) => {
    return (
      <span
        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        <Typography variant="h5" component="span">
          {countryInfo.emoji}
        </Typography>
        <Typography>
          {countryInfo.name}
        </Typography>
      </span>
    );
  };

	const autoCompleteOptions = ([...countriesToListAtTop, ...countriesToList]).map(
		country => country[countryValueKey]
	);

  return (
    <FormControl error={isError}>
      <FormLabel
        label={fieldLabel}
        isVisible={isLabelAboveFormField}
        error={isError}
        formLabelProps={formLabelProps}
      />
      <Fragment>
        {!isLabelAboveFormField && (
          <InputLabel id={fieldName}>
            {fieldLabel}
          </InputLabel>
        )}
      </Fragment>
      <Autocomplete<CountryDetails>
        id={fieldName}
				fullWidth
        // label={isLabelAboveFormField ? undefined : fieldName}
        // defaultValue={defaultValue ?? ''}
				options={[...countriesToListAtTop, ...countriesToList]}
				getOptionLabel={option => option[countryValueKey]}
				isOptionEqualToValue={(option, value) => option[countryValueKey] === value[countryValueKey]}
				autoHighlight
        // error={isError}
				renderOption={(props, option) => {
					const { key, ...optionProps } = props;
					return (
            <Box
              key={key}
              component="li"
              sx={{ display: 'flex', alignItems: 'center' }}
							{...optionProps}
						>
              <CountryMenuItem countryInfo={option} />
            </Box>
          );
				}}
        renderInput={(params) => (
					<TextField
						{...params}
						label="Choose a country"
						inputProps={{
							htmlInput: {
								...params.inputProps,
								autoComplete: 'new-password', // disable autocomplete and autofill
							},
						}}
					/>
				)}
      />
      <FormHelperText
        error={isError}
        errorMessage={errorMessage}
        hideErrorMessage={hideErrorMessage}
        helperText={helperText}
        formHelperTextProps={formHelperTextProps}
      />
    </FormControl>
  );
};

export { countryList };
export default RHFCountrySelect;
