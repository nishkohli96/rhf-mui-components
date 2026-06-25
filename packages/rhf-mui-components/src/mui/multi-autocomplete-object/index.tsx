'use client';

import {
  useContext,
  useCallback,
  useMemo,
  forwardRef,
  type JSX,
  type Ref,
  type ReactNode
} from 'react';
import {
  Controller,
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import Box from '@mui/material/Box';
import Autocomplete, {
  type AutocompleteRenderOptionState,
  type AutocompleteProps
} from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import {
  FormControl,
  FormLabel,
  FormLabelText,
  FormHelperText,
  defaultAutocompleteValue,
  defaultSelectAllOptionLabel,
  selectAllOptionValue
} from '@/common';
import type {
  FormLabelProps,
  FormControlLabelProps,
  CheckboxProps,
  FormHelperTextProps,
  KeyValueOption,
  AutoCompleteTextFieldProps,
  MuiChipProps,
  CustomOnChangeProps,
  CustomComponentIds
} from '@/types';
import {
  fieldNameToLabel,
  isKeyValueOption,
  useFieldIds,
  keepLabelAboveFormField,
  mergeRefs
} from '@/utils';

type AutocompleteOption<Option extends KeyValueOption = KeyValueOption>
  = Option | string;

type MultiAutoCompleteProps<
  Option extends KeyValueOption = KeyValueOption,
  DisableClearable extends boolean = false
> = Omit<
  AutocompleteProps<Option, true, DisableClearable, false>,
  | 'freeSolo'
  | 'fullWidth'
  | 'renderInput'
  | 'renderOption'
  | 'options'
  | 'value'
  | 'defaultValue'
  | 'multiple'
  | 'onChange'
  | 'getOptionKey'
  | 'getOptionLabel'
  | 'isOptionEqualToValue'
  | 'blurOnSelect'
  | 'disableClearable'
  | 'disableCloseOnSelect'
  | 'ChipProps'
  | 'ref'
>;

type OnValueChangeProps<Option extends KeyValueOption = KeyValueOption> = {
  newValue: Option[];
  selectedOption?: Option | typeof selectAllOptionValue;
};

export type RHFMultiAutocompleteObjectProps<
  T extends FieldValues,
  Option extends KeyValueOption = KeyValueOption,
  LabelKey extends Extract<keyof Option, string> = Extract<
    keyof Option,
    string
  >,
  ValueKey extends Extract<keyof Option, string> = Extract<
    keyof Option,
    string
  >,
  DisableClearable extends boolean = false
> = {
  /**
   * Name/path of the React Hook Form field this component controls.
   */
  fieldName: Path<T>;
  /**
   * React Hook Form control object returned by `useForm`.
   */
  control: Control<T>;
  /**
   * Validation rules passed to React Hook Form for this field.
   */
  registerOptions?: RegisterOptions<T, Path<T>>;
  /**
   * Options rendered by the field.
   */
  options: Option[];
  /**
   * Object key used to read the display label from each option.
   */
  labelKey?: LabelKey;
  /**
   * Object key used to derive the stored field value when options are an array of objects.
   */
  valueKey?: ValueKey;
  /**
   * Text to display for the "Select All" option.
   */
  selectAllText?: string;
  /**
   * When true, hides the select-all option.
   */
  hideSelectAllOption?: boolean;
  /**
   * Override the default change handling while still receiving the RHF `onChange` callback.
   */
  customOnChange?: ({
    rhfOnChange,
    newValue,
    selectedOption
  }: CustomOnChangeProps<OnValueChangeProps<Option>, Option[]>) => void;
  /**
   * Called after the field value changes with the normalized value payload.
   */
  onValueChange?: ({ newValue, selectedOption }: OnValueChangeProps<Option>) => void;
  /**
   * When true, the selected value cannot be cleared from the input.
   * @default false
   */
  disableClearable?: DisableClearable;
  /**
   * Label content shown for the field. Defaults to a label generated from `fieldName`.
   */
  label?: ReactNode;
  /**
   * When true, renders the field label above the form field instead of inside or beside it.
   */
  showLabelAboveFormField?: boolean;
  /**
   * Props forwarded to the internal `FormLabel`. The `id` is managed by the component.
   */
  formLabelProps?: Omit<FormLabelProps, 'id'>;
  /**
   * When true, visually hides the field label while preserving accessible labeling where possible.
   */
  hideLabel?: boolean;
  /**
   * Props forwarded to each internal MUI `Checkbox`.
   */
  checkboxProps?: CheckboxProps;
  /**
   * Custom renderer for an option label.
   */
  renderOptionLabel?: (
    option: Option,
    state: AutocompleteRenderOptionState
  ) => ReactNode;
  /**
   * Props forwarded to each internal MUI `FormControlLabel`.
   */
  formControlLabelProps?: FormControlLabelProps;
  /**
   * When true, marks the field as required in the UI and accessibility attributes.
   */
  required?: boolean;
  /**
   * Helper text shown below the field when there is no visible validation error.
   */
  helperText?: ReactNode;
  /**
   * @deprecated
   * Field error message is now automatically derived from form state.
   * Passing this prop is no longer necessary and it will be removed in the next major version.
   */
  errorMessage?: ReactNode;
  /**
   * If true, hides the error message text while keeping the field in an error state.
   */
  hideErrorMessage?: boolean;
  /**
   * Props forwarded to the internal `FormHelperText`. The `id` is managed by the component.
   */
  formHelperTextProps?: Omit<FormHelperTextProps, 'id'>;
  /**
   * Props forwarded to the internal MUI `TextField` used to render the input.
   */
  textFieldProps?: AutoCompleteTextFieldProps;
  /**
   * Props forwarded to chips rendered for selected values.
   */
  ChipProps?: MuiChipProps;
  /**
   * Custom ids for generated field, label, helper text, and error elements.
   */
  customIds?: CustomComponentIds;
} & MultiAutoCompleteProps<Option, DisableClearable>;

const RHFMultiAutocompleteObjectInner = forwardRef(function RHFMultiAutocompleteObject<
  T extends FieldValues,
  Option extends KeyValueOption = KeyValueOption,
  LabelKey extends Extract<keyof Option, string> = Extract<
    keyof Option,
    string
  >,
  ValueKey extends Extract<keyof Option, string> = Extract<
    keyof Option,
    string
  >,
  DisableClearable extends boolean = false
>(
  {
    fieldName,
    control,
    registerOptions,
    options,
    labelKey,
    valueKey,
    disableClearable,
    autoHighlight = true,
    selectAllText = defaultSelectAllOptionLabel,
    hideSelectAllOption,
    customOnChange,
    onValueChange,
    disabled: muiDisabled,
    label,
    showLabelAboveFormField,
    formLabelProps,
    hideLabel,
    checkboxProps,
    renderOptionLabel,
    formControlLabelProps,
    required,
    helperText,
    errorMessage,
    hideErrorMessage,
    formHelperTextProps,
    textFieldProps,
    slotProps,
    ChipProps,
    onBlur,
    loading,
    customIds,
    getOptionDisabled,
    limitTags = 2,
    getLimitTagsText,
    ...otherMultiAutocompleteObjectProps
  }: RHFMultiAutocompleteObjectProps<T, Option, LabelKey, ValueKey, DisableClearable>,
  ref: Ref<HTMLInputElement>
) {
  const {
    allLabelsAboveFields,
    defaultFormControlLabelSx,
  } = useContext(RHFMuiConfigContext);

  const { fieldId, labelId, helperTextId, errorId } = useFieldIds(
    fieldName,
    customIds
  );

  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );
  const fieldLabel = label ?? fieldNameToLabel(fieldName);

  const shouldHideSelectAllOptions
    = hideSelectAllOption || options.length === 0 || options.length === 1;

  const { sx, ...otherFormControlLabelProps } = formControlLabelProps ?? {};
  const appliedFormControlLabelSx = {
    ...defaultFormControlLabelSx,
    ...sx
  };

  const autoCompleteOptions: AutocompleteOption<Option>[] = useMemo(() => {
    if (shouldHideSelectAllOptions) {
      return options;
    }
    return [selectAllText, ...options];
  }, [options, selectAllText, shouldHideSelectAllOptions]);

  const isSelectAllOption = useCallback(
    (option: AutocompleteOption<Option>): option is string =>
      option === selectAllText,
    [selectAllText]
  );

  const getOptionLabelOrValue = useCallback(
    (option: AutocompleteOption<Option>, key?: LabelKey | ValueKey): string => {
      if (typeof option === 'string') {
        return option;
      }
      return key && isKeyValueOption(option, labelKey, valueKey)
        ? String(option[key])
        : String(option);
    },
    [labelKey, valueKey]
  );

  const displayOptionLabel = useCallback(
    (option: AutocompleteOption<Option>, getSelectAllValue?: boolean) =>
      isSelectAllOption(option)
        ? getSelectAllValue
          ? selectAllOptionValue
          : selectAllText
        : getOptionLabelOrValue(option, labelKey),
    [isSelectAllOption, selectAllText, getOptionLabelOrValue, labelKey]
  );

  const optionsEqual = useCallback(
    (a: Option, b: Option): boolean => {
      if (
        valueKey
        && isKeyValueOption(a, labelKey, valueKey)
        && isKeyValueOption(b, labelKey, valueKey)
      ) {
        return a[valueKey] === b[valueKey];
      }
      return a === b;
    },
    [labelKey, valueKey]
  );

  return (
    <Controller
      name={fieldName}
      control={control}
      rules={registerOptions}
      render={({
        field: {
          name: rhfFieldName,
          value: rhfValue,
          onChange: rhfOnChange,
          onBlur: rhfOnBlur,
          ref: rhfRef,
          disabled: rhfDisabled
        },
        fieldState: { error: fieldStateError }
      }) => {
        const isDisabled = muiDisabled || rhfDisabled;
        const fieldErrorMessage
          = fieldStateError?.message?.toString() ?? errorMessage;
        const isError = !!fieldErrorMessage;
        const showHelperTextElement = !!(
          helperText
          || (isError && !hideErrorMessage)
        );
        const selectedOptions: Option[] = rhfValue ?? [];

        const selectionContainsOption = (selected: Option[], opt: Option) =>
          selected.some(sel => optionsEqual(sel, opt));

        const areAllSelected
          = options.length > 0
            && selectedOptions.length === options.length
            && options.every(opt =>
              selectionContainsOption(selectedOptions, opt));
        const isIndeterminate
          = selectedOptions.length > 0 && !areAllSelected;


        const changeFieldState = (
          newValues: Option[],
          selectedOption?: Option | typeof selectAllOptionValue
        ) => {
          rhfOnChange(newValues);
          onValueChange?.({
            newValue: newValues,
            selectedOption
          });
        };

        const handleCheckboxChange = (
          currentValue: Option[],
          rowOption: AutocompleteOption<Option>,
          checked: boolean
        ): Option[] => {
          /* When "Select All" checkbox is toggled. */
          if (isSelectAllOption(rowOption)) {
            return checked ? [...options] : [];
          }
          /* When one of the options is selected */
          return checked
            ? selectionContainsOption(currentValue, rowOption)
              ? currentValue
              : [...currentValue, rowOption]
            : currentValue.filter(val => !optionsEqual(val, rowOption));
        };

        return (
          <FormControl error={isError} disabled={isDisabled}>
            {!hideLabel && (
              <FormLabel
                label={fieldLabel}
                isVisible={isLabelAboveFormField}
                required={required}
                error={isError}
                disabled={isDisabled}
                formLabelProps={{
                  ...formLabelProps,
                  id: labelId,
                  htmlFor: fieldId
                }}
              />
            )}
            <Autocomplete
              {...otherMultiAutocompleteObjectProps}
              id={fieldId}
              options={autoCompleteOptions as Option[]}
              value={selectedOptions}
              loading={loading}
              disabled={isDisabled}
              onChange={(_, newSelectedOptions, reason, details) => {
                if (reason === 'clear') {
                  if (customOnChange) {
                    customOnChange({
                      rhfOnChange,
                      newValue: [],
                      selectedOption: undefined
                    });
                    return;
                  }
                  rhfOnChange([]);
                  onValueChange?.({ newValue: [] });
                  return;
                }
                const isSelectAllSelected
                  = newSelectedOptions.some(isSelectAllOption);
                if (isSelectAllSelected) {
                  const finalValue = areAllSelected ? [] : [...options];
                  if (customOnChange) {
                    customOnChange({
                      rhfOnChange,
                      newValue: finalValue,
                      selectedOption: selectAllOptionValue
                    });
                    return;
                  }
                  rhfOnChange(finalValue);
                  onValueChange?.({
                    newValue: finalValue,
                    selectedOption: selectAllOptionValue
                  });
                  return;
                }

                const clickedOption = details?.option;
                const finalValue = newSelectedOptions.filter(
                  option => !isSelectAllOption(option)
                );
                const selectedOption = clickedOption && !isSelectAllOption(clickedOption)
                  ? clickedOption
                  : undefined;
                if (customOnChange) {
                  customOnChange({
                    rhfOnChange,
                    newValue: finalValue,
                    selectedOption
                  });
                  return;
                }
                rhfOnChange(finalValue);
                onValueChange?.({
                  newValue: finalValue,
                  selectedOption
                });
              }}
              onBlur={blurEvent => {
                rhfOnBlur();
                onBlur?.(blurEvent);
              }}
              getOptionLabel={option => displayOptionLabel(option, true)}
              isOptionEqualToValue={(option, value) => {
                if (isSelectAllOption(option)) {
                  return false;
                }
                if (valueKey && isKeyValueOption(option, labelKey, valueKey)) {
                  return (
                    option[valueKey] === (value as KeyValueOption)[valueKey]
                  );
                }
                return option === value;
              }}
              renderInput={params => {
                const {
                  InputProps,
                  inputProps,
                  disabled: paramsDisabled,
                  ...otherInputParams
                } = params ?? {};
                const {
                  autoComplete = defaultAutocompleteValue,
                  placeholder,
                  ...otherTextFieldProps
                } = textFieldProps ?? {};
                const textFieldInputProps = {
                  ...inputProps,
                  'aria-required': required,
                  'aria-invalid': isError,
                  'aria-labelledby': !hideLabel && isLabelAboveFormField
                    ? labelId
                    : undefined,
                  'aria-describedby': showHelperTextElement
                    ? isError
                      ? errorId
                      : helperTextId
                    : undefined,
                  autoComplete
                };
                return (
                  <TextField
                    name={rhfFieldName}
                    inputRef={mergeRefs(rhfRef, ref)}
                    disabled={paramsDisabled}
                    {...otherTextFieldProps}
                    placeholder={
                      selectedOptions.length > 0 ? undefined : placeholder
                    }
                    {...otherInputParams}
                    label={
                      !isLabelAboveFormField
                        ? (
                          <FormLabelText label={fieldLabel} required={required} />
                        )
                        : undefined
                    }
                    error={isError}
                    slotProps={{
                      ...textFieldProps?.slotProps,
                      input: {
                        ...InputProps,
                        ...textFieldProps?.slotProps?.input,
                        endAdornment: (
                          <>
                            {loading && (
                              <CircularProgress color="inherit" size={20} />
                            )}
                            {InputProps.endAdornment}
                          </>
                        )
                      },
                      htmlInput: textFieldInputProps
                    }}
                  />
                );
              }}
              renderOption={({ key, ...optionProps }, option, state) => {
                const optionLabel = displayOptionLabel(option);
                if (isSelectAllOption(option)) {
                  return (
                    <Box component="li" key={key} {...optionProps}>
                      <FormControlLabel
                        {...otherFormControlLabelProps}
                        label={optionLabel}
                        disabled={isDisabled}
                        control={(
                          <Checkbox
                            {...checkboxProps}
                            id={`${fieldName}_${selectAllOptionValue}`}
                            name={`${fieldName}_${selectAllOptionValue}`}
                            value={selectAllOptionValue}
                            checked={areAllSelected}
                            indeterminate={isIndeterminate}
                            disabled={isDisabled}
                          />
                        )}
                        sx={{ ...appliedFormControlLabelSx, width: '100%' }}
                        onClick={e => {
                          e.preventDefault();
                          changeFieldState(
                            handleCheckboxChange(
                              selectedOptions,
                              option,
                              !areAllSelected
                            ),
                            selectAllOptionValue
                          );
                        }}
                      />
                    </Box>
                  );
                }
                const optionValue = getOptionLabelOrValue(option, valueKey);
                const isOptionDisabled
                  = getOptionDisabled?.(option) || isDisabled;
                return (
                  <Box component="li" key={key} {...optionProps}>
                    <FormControlLabel
                      {...otherFormControlLabelProps}
                      label={
                        renderOptionLabel?.(option, state)
                        ?? optionLabel
                      }
                      disabled={isOptionDisabled}
                      control={
                        <Checkbox
                          {...checkboxProps}
                          id={`${fieldName}_${optionValue}`}
                          name={`${fieldName}_${optionValue}`}
                          value={optionValue}
                          checked={
                            selectionContainsOption(selectedOptions, option)
                          }
                          disabled={isOptionDisabled}
                        />
                      }
                      sx={{ ...appliedFormControlLabelSx, width: '100%' }}
                      onClick={e => {
                        e.preventDefault();
                        if (isOptionDisabled) {
                          return;
                        }
                        const checked = !selectionContainsOption(
                          selectedOptions,
                          option
                        );
                        changeFieldState(
                          handleCheckboxChange(
                            selectedOptions,
                            option,
                            checked
                          ),
                          option
                        );
                      }}
                    />
                  </Box>
                );
              }}
              limitTags={limitTags}
              getLimitTagsText={more => getLimitTagsText?.(more) ?? `+${more} More`}
              autoHighlight={autoHighlight}
              disableCloseOnSelect
              disableClearable={disableClearable}
              blurOnSelect={false}
              fullWidth
              multiple
              freeSolo={false}
              slotProps={{
                ...slotProps,
                chip: ChipProps,
                listbox: {
                  ...slotProps?.listbox,
                  'aria-multiselectable': true
                }
              }}
            />
            <FormHelperText
              error={isError}
              errorMessage={fieldErrorMessage}
              hideErrorMessage={hideErrorMessage}
              helperText={helperText}
              showHelperTextElement={showHelperTextElement}
              formHelperTextProps={{
                ...formHelperTextProps,
                id: isError ? errorId : helperTextId
              }}
            />
          </FormControl>
        );
      }}
    />
  );
});

const RHFMultiAutocompleteObject = RHFMultiAutocompleteObjectInner as <
  T extends FieldValues,
  Option extends KeyValueOption = KeyValueOption,
  LabelKey extends Extract<keyof Option, string> = Extract<
    keyof Option,
    string
  >,
  ValueKey extends Extract<keyof Option, string> = Extract<
    keyof Option,
    string
  >,
  DisableClearable extends boolean = false
>(
  props: RHFMultiAutocompleteObjectProps<
    T,
    Option,
    LabelKey,
    ValueKey,
    DisableClearable
  > & {
    ref?: Ref<HTMLInputElement>;
  }
) => JSX.Element;

export default RHFMultiAutocompleteObject;
