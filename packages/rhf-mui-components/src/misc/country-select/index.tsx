import { useContext, Fragment, ReactNode } from 'react';
import {
  UseFormRegister,
  RegisterOptions,
  Path,
  FieldValues
} from 'react-hook-form';
import MenuItem from '@mui/material/MenuItem';
import { FormLabelProps } from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import { FormHelperTextProps } from '@mui/material/FormHelperText';
import MuiSelect, {
  SelectChangeEvent,
  SelectProps
} from '@mui/material/Select';
import {
  defaultCountries,
  CountryIso2,
  FlagImage,
  parseCountry
} from 'react-international-phone';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import {
  fieldNameToLabel,
  isKeyValueOption,
  keepLabelAboveFormField
} from '@/utils';
import { FormControl, FormLabel, FormHelperText } from '@/mui/common';
import { Typography } from '@mui/material';
import 'react-international-phone/style.css';

type OptionValue = string | CountryIso2;
type SelectValueType = OptionValue | OptionValue[];

export type RHFCountrySelectProps<T extends FieldValues> = {
  fieldName: Path<T>;
  register: UseFormRegister<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  // options: OptionType[];
  defaultValue?: SelectValueType;
  showDefaultOption?: boolean;
  defaultOptionText?: string;
  onValueChange?: (e: SelectChangeEvent<SelectValueType>) => void;
  showLabelAboveFormField?: boolean;
  formLabelProps?: Omit<FormLabelProps, 'error'>;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: Omit<FormHelperTextProps, 'children' | 'error'>;
} & Omit<
  SelectProps,
  'name' | 'id' | 'labelId' | 'error' | 'onChange' | 'value' | 'defaultValue'
>;

const RHFCountrySelect = <T extends FieldValues>({
  fieldName,
  register,
  registerOptions,
  // options,
  defaultValue,
  showDefaultOption,
  defaultOptionText,
  onValueChange,
  label,
  showLabelAboveFormField,
  formLabelProps,
  multiple,
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

  const { onChange, ...rest } = register(fieldName, registerOptions);

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
      <MuiSelect
        id={fieldName}
        labelId={isLabelAboveFormField ? undefined : fieldName}
        label={isLabelAboveFormField ? undefined : fieldName}
        defaultValue={defaultValue ?? (multiple ? [] : '')}
        error={isError}
        multiple={multiple}
        // renderValue={(value) => (
        // 	<FlagImage iso2={value} style={{ display: 'flex' }} />
        // )}
        onChange={e => {
          onChange(e);
          if (onValueChange) {
            onValueChange(e);
          }
        }}
        {...otherSelectProps}
        {...rest}
      >
        <MenuItem
          value=""
          disabled
          sx={{ display: showDefaultOption ? 'block' : 'none' }}
        >
          {showDefaultOption ? defaultOptionText ?? `Select ${fieldLabel}` : ''}
        </MenuItem>
        {defaultCountries.map(c => {
          const countryInfo = parseCountry(c);
          // countryInfo.
          return (
            <MenuItem key={countryInfo.iso2} value={countryInfo.iso2}>
              <FlagImage
                iso2={countryInfo.iso2}
                style={{ marginRight: '8px' }}
              />
              <Typography marginRight="16px">
                {countryInfo.name}
              </Typography>
            </MenuItem>
          );
        })}
      </MuiSelect>
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

export default RHFCountrySelect;
