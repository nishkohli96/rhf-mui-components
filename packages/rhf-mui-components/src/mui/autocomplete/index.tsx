import {
  useContext,
  useMemo,
  type ReactNode,
  type SyntheticEvent
} from 'react';
import {
  Controller,
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import Autocomplete, {
  type AutocompleteProps,
  type AutocompleteChangeDetails,
  type AutocompleteChangeReason
} from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import {
  FormControl,
  FormLabel,
  FormLabelText,
  FormHelperText,
  defaultAutocompleteValue,
} from '@/common';
import type {
  FormLabelProps,
  FormHelperTextProps,
  KeyValueOption,
  TrueOrFalse,
  StrObjOption,
  AutoCompleteTextFieldProps,
  MuiChipProps
} from '@/types';
import {
  fieldNameToLabel,
  validateArray,
  isKeyValueOption,
  isAboveMuiV5,
  isMuiV7AndAbove
} from '@/utils';

type OmittedAutocompleteProps<Option> = Omit<
  AutocompleteProps<Option, TrueOrFalse, TrueOrFalse, TrueOrFalse>,
  | 'freeSolo'
  | 'fullWidth'
  | 'renderInput'
  | 'renderOption'
  | 'options'
  | 'value'
  | 'defaultValue'
  | 'onChange'
  | 'getOptionKey'
  | 'getOptionLabel'
  | 'isOptionEqualToValue'
  | 'autoHighlight'
  | 'blurOnSelect'
  | 'disableCloseOnSelect'
  | 'ChipProps'
>;

export type RHFAutocompleteProps<
  T extends FieldValues,
  Option extends StrObjOption = StrObjOption
> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  options: Option[];
  labelKey?: string;
  valueKey?: string;
  onValueChange?: (
    fieldValue: string | string[] | null,
    event: SyntheticEvent<Element, Event>,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<Option>
  ) => void;
  label?: ReactNode;
  showLabelAboveFormField?: boolean;
  formLabelProps?: FormLabelProps;
  required?: boolean;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
  textFieldProps?: AutoCompleteTextFieldProps;
  ChipProps?: MuiChipProps;
} & OmittedAutocompleteProps<Option>;

const RHFAutocomplete = <
  T extends FieldValues,
  Option extends StrObjOption = StrObjOption
>({
  fieldName,
  control,
  registerOptions,
  options,
  multiple,
  labelKey,
  valueKey,
  onValueChange,
  label,
  showLabelAboveFormField,
  formLabelProps,
  required,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  textFieldProps,
  slotProps,
  ChipProps,
  onBlur,
  ...otherAutoCompleteProps
}: RHFAutocompleteProps<T, Option>) => {
  validateArray('RHFAutocomplete', options, labelKey, valueKey);

  const { allLabelsAboveFields } = useContext(RHFMuiConfigContext);
  const isLabelAboveFormField = showLabelAboveFormField ?? allLabelsAboveFields;
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isError = Boolean(errorMessage);

  const renderOptionLabel = (option: string | Option): string =>
    labelKey && isKeyValueOption(option, labelKey, valueKey)
      ? option[labelKey]
      : (option as string);

  return (
    <FormControl error={isError}>
      <FormLabel
        label={fieldLabel}
        isVisible={isLabelAboveFormField}
        required={required}
        error={isError}
        formLabelProps={formLabelProps}
      />
      <Controller
        name={fieldName}
        control={control}
        rules={registerOptions}
        render={({ field: { value, onChange, onBlur: rhfOnBlur, ...otherFieldProps } }) => {
          /**
           * When considering for the case when options is an array of objects,
           * the values would be an array or a single "valueKey" from these options.
           * So, I need to get back the selected options using these values and then
           * pass back these list of options as the value prop for Autocomplete.
           */
          const selectedOptions = useMemo(() => {
            if (multiple) {
              return (value ?? [])
                .map(val =>
                  options.find(opn =>
                    valueKey && isKeyValueOption(opn, labelKey, valueKey)
                      ? opn[valueKey] === val
                      : opn === val))
                .filter((opn): opn is Option => Boolean(opn));
            }
            return options.find(opn =>
              valueKey && isKeyValueOption(opn, labelKey, valueKey)
                ? opn[valueKey] === value
                : opn === value) ?? null;
          }, [value, options, valueKey, labelKey, multiple]);

          return (
            <Autocomplete
              {...otherFieldProps}
              id={fieldName}
              options={options}
              multiple={multiple}
              value={selectedOptions}
              autoHighlight
              blurOnSelect={!multiple}
              disableCloseOnSelect={multiple}
              fullWidth
              // @ts-ignore
              onChange={(
                event,
                newValue,
                reason: AutocompleteChangeReason,
                details?: AutocompleteChangeDetails<Option>
              ) => {
                const fieldValue = multiple
                  ? (newValue as Option[] | null)?.map(item =>
                    valueKey && isKeyValueOption(item, labelKey, valueKey)
                      ? item[valueKey]
                      : item) ?? []
                  : newValue === null
                    ? null
                    : valueKey && isKeyValueOption(newValue, labelKey, valueKey)
                      ? (newValue as KeyValueOption)[valueKey]
                      : newValue;
                onChange(fieldValue);
                onValueChange?.(fieldValue, event, reason, details);
              }}
              onBlur={blurEvent => {
                rhfOnBlur();
                onBlur?.(blurEvent);
              }}
              limitTags={2}
              getLimitTagsText={value => `+${value} More`}
              getOptionLabel={renderOptionLabel}
              isOptionEqualToValue={(option, value) => {
                if (valueKey && isKeyValueOption(option, labelKey, valueKey)) {
                  return (
                    option[valueKey] === (value as KeyValueOption)[valueKey]
                  );
                }
                return option === value;
              }}
              renderInput={params => {
                const {
                  autoComplete = defaultAutocompleteValue,
                  ...otherTextFieldProps
                } = textFieldProps ?? {};
                const textFieldInputProps = {
                  ...params.inputProps,
                  autoComplete
                };
                return (
                  <TextField
                    {...otherTextFieldProps}
                    {...params}
                    autoComplete={autoComplete}
                    label={
                      !isLabelAboveFormField
                        ? (
                          <FormLabelText label={fieldLabel} required={required} />
                        )
                        : undefined
                    }
                    error={isError}
                    {...(isAboveMuiV5
                      ? {
                        slotProps: {
                          htmlInput: textFieldInputProps
                        }
                      }
                      : {
                        inputProps: textFieldInputProps
                      })}
                  />
                );
              }}
              {...(isMuiV7AndAbove
                ? {
                  ...(multiple
                    ? {
                      renderValue: (value: Option[], getItemProps) => {
                        return value.map((option, index) => {
                          const { key, ...itemProps } = getItemProps({
                            index
                          });
                          const optionLabel = renderOptionLabel(option);
                          return (
                            <Chip
                              variant="outlined"
                              label={optionLabel}
                              key={key}
                              {...itemProps}
                            />
                          );
                        });
                      }
                    } as Partial<AutocompleteProps<Option, true, false, false>>
                    : {
                      renderValue: (value, getItemProps) => {
                        const optionLabel = renderOptionLabel(value);
                        return <Chip label={optionLabel} {...getItemProps()} />;
                      }
                    }) as Partial<AutocompleteProps<Option, false, false, false>>
                }
                : ({
                  renderTags: (value: Option[], getTagProps) =>
                    value.map((option, index) => {
                      const { key, ...otherChipProps } = getTagProps({
                        index
                      });
                      const optionLabel = renderOptionLabel(option);
                      return (
                        <Chip
                          key={key}
                          {...otherChipProps}
                          label={optionLabel}
                          {...ChipProps}
                        />
                      );
                    })
                }))}
              {...(isAboveMuiV5
                ? {
                  slotProps: {
                    ...slotProps,
                    chip: ChipProps
                  }
                }
                : { ChipProps, slotProps })}
              {...otherAutoCompleteProps}
            />
          );
        }}
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

export default RHFAutocomplete;
