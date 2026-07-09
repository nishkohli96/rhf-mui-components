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
  type FieldError,
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import Box from '@mui/material/Box';
import Autocomplete,
{
  type AutocompleteRenderOptionState,
  type AutocompleteProps,
  type AutocompleteValue
} from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import {
  FormControl,
  FormLabel,
  FormLabelText,
  FormHelperText,
  defaultAutocompleteValue,
  defaultSelectAllOptionLabel,
  selectAllOptionValue,
  type FormLabelProps,
  type FormControlLabelProps,
  type CheckboxProps,
  type FormHelperTextProps,
  type AutoCompleteTextFieldProps,
  type MuiChipProps,
  type CustomOnChangeProps
} from '@/common';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import type { StrObjOption, CustomComponentIds } from '@/types';
import {
  fieldNameToLabel,
  isKeyValueOption,
  useFieldIds,
  keepLabelAboveFormField,
  mergeRefs
} from '@/utils';

type MultiAutoCompleteProps<
  Option extends StrObjOption = StrObjOption,
  DisableClearable extends boolean = false,
  FreeSolo extends boolean = false
> = Omit<
  AutocompleteProps<Option, true, DisableClearable, FreeSolo>,
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

type OnValueChangeProps = {
  newValue: string[];
  selectedOption?: string;
};

export type RHFMultiAutocompleteProps<
  T extends FieldValues,
  Option extends StrObjOption = StrObjOption,
  LabelKey extends Extract<keyof Option, string> = Extract<
    keyof Option,
    string
  >,
  ValueKey extends Extract<keyof Option, string> = Extract<
    keyof Option,
    string
  >,
  DisableClearable extends boolean = false,
  FreeSolo extends boolean = false
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
   * An array of options displayed in the autocomplete dropdown for multiple selection.
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
   * When true, the user may type any value not present in `options`.
   *
   * The typed string is stored in RHF state as-is. `selectedOption` in
   * callbacks is of type `(Option | string)[]`.
   *
   * To keep things predictable and type-safe, `freeSolo` is not compatible with
   * `selectAllText` and will hide the "Select All" option.
   */
  freeSolo?: FreeSolo;
  /**
   * Overrides the default multi-autocomplete change handling.
   * Receives the next string array and the option value that triggered the change.
   * Call `rhfOnChange` with the string array that should be stored; else the form value will not be updated.
   *
   * @param rhfOnChange - React Hook Form field change handler for the selected value array.
   * @param newValue - Next selected string value array.
   * @param selectedOption - Option value that triggered the change, or the select-all sentinel.
   */
  customOnChange?: ({
    rhfOnChange,
    newValue,
    selectedOption,
  }: CustomOnChangeProps<OnValueChangeProps, string[]>) => void;
  /**
   * Called after the default multi-autocomplete handler stores the next string array in React Hook Form.
   *
   * ⚠️ Important:
   * This callback is not called when `customOnChange` is used.
   *
   * @param newValue - Next selected string value array.
   * @param selectedOption - Option value that triggered the change, or the select-all sentinel.
   */
  onValueChange?: ({ newValue, selectedOption }: OnValueChangeProps) => void;
  /**
   * When true, the selected value cannot be cleared from the input.
   * @default false
   */
  disableClearable?: DisableClearable;
  /**
   * Text to display for the "Select All" option.
   */
  selectAllText?: string;
  /**
   * When true, hides the select-all option.
   */
  hideSelectAllOption?: boolean;
  /**
   * Label content shown for the field. Defaults to a label generated from `fieldName`.
   */
  label?: ReactNode;
  /**
   * Custom renderer for an option label.
   */
  renderOptionLabel?: (
    option: Option,
    state: AutocompleteRenderOptionState
  ) => ReactNode;
  /**
   * When `true`, renders the label above the component instead of within the field layout.
   */
  showLabelAboveFormField?: boolean;
  /**
   * Props forwarded to the internal `FormLabel`. The `id` is managed by the component.
   */
  formLabelProps?: Omit<FormLabelProps, 'id'>;
  /**
   * When true, hides the rendered field label while preserving accessible labeling where possible.
   */
  hideLabel?: boolean;
  /**
   * Props forwarded to each internal MUI `Checkbox`.
   */
  checkboxProps?: CheckboxProps;
  /**
   * Props forwarded to each internal MUI `FormControlLabel`.
   */
  formControlLabelProps?: FormControlLabelProps;
  /**
   * When true, marks the field as required in the UI and accessibility attributes.
   */
  required?: boolean;
  /**
   * Custom renderer for the React Hook Form field error.
   * Receives the current field error and must return renderable content, such as `error.message` or a custom element.
   *
   * @param error - React Hook Form field error for this field.
   */
  renderError?: (error: FieldError) => ReactNode;
  /**
   * If true, hides the error message text while keeping the field in an error state.
   */
  hideErrorMessage?: boolean;
  /**
   * Helper text shown below the field when there is no visible validation error.
   */
  helperText?: ReactNode;
  /**
   * Props forwarded to the internal `FormHelperText`. The `id` is managed by the component.
   */
  formHelperTextProps?: Omit<FormHelperTextProps, 'id'>;
  /**
   * Props forwarded to the internal MUI `TextField`.
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
} & MultiAutoCompleteProps<Option, DisableClearable, FreeSolo>;

const RHFMultiAutocompleteInner = forwardRef(function RHFMultiAutocomplete<
  T extends FieldValues,
  Option extends StrObjOption = StrObjOption,
  LabelKey extends Extract<keyof Option, string> = Extract<
    keyof Option,
    string
  >,
  ValueKey extends Extract<keyof Option, string> = Extract<
    keyof Option,
    string
  >,
  DisableClearable extends boolean = false,
  FreeSolo extends boolean = false
>(
  {
    fieldName,
    control,
    registerOptions,
    options,
    labelKey,
    valueKey,
    freeSolo,
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
    renderError,
    hideErrorMessage,
    helperText,
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
    autoSelect,
    ...otherMultiAutoCompleteProps
  }: RHFMultiAutocompleteProps<T, Option, LabelKey, ValueKey, DisableClearable, FreeSolo>,
  ref: Ref<HTMLInputElement>
) {
  const {
    allLabelsAboveFields,
    defaultFormControlLabelSx
  } = useContext(RHFMuiConfigContext);

  const { fieldId, labelId, helperTextId, errorId } = useFieldIds(
    fieldName,
    customIds
  );
  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );

  const defaultFieldLabel = fieldNameToLabel(fieldName);
  const fieldLabel = label ?? defaultFieldLabel;
  const accessibleFieldLabel = typeof fieldLabel === 'string'
    ? fieldLabel
    : defaultFieldLabel;
  const shouldHideSelectAllOptions = freeSolo || hideSelectAllOption || options.length <= 1;

  const { sx, ...otherFormControlLabelProps } = formControlLabelProps ?? {};
  const appliedFormControlLabelSx = {
    ...defaultFormControlLabelSx,
    ...sx
  };

  const autoCompleteOptions: Option[] = useMemo(() => {
    if (shouldHideSelectAllOptions) {
      return options;
    }
    return [selectAllText as Option, ...options];
  }, [options, selectAllText, shouldHideSelectAllOptions]);

  const optionsMap = useMemo(() => {
    if (!valueKey) {
      return null;
    }

    const map = new Map<Option[ValueKey], Option>();
    for (const option of options) {
      if (isKeyValueOption(option, labelKey, valueKey)) {
        map.set(option[valueKey], option);
      }
    }
    return map;
  }, [options, valueKey, labelKey]);

  const isSelectAllOption = useCallback(
    (option: Option | string) => option === selectAllText,
    [selectAllText]
  );

  const getOptionLabelOrValue = useCallback(
    (option: Option | string, key?: LabelKey | ValueKey) => {
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
    (option: Option | string, getSelectAllValue?: boolean) =>
      isSelectAllOption(option)
        ? getSelectAllValue
          ? selectAllOptionValue
          : selectAllText
        : getOptionLabelOrValue(option, labelKey),
    [isSelectAllOption, selectAllText, getOptionLabelOrValue, labelKey]
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
        const fieldErrorMessage = fieldStateError
          ? renderError?.(fieldStateError) ?? fieldStateError.message?.toString()
          : undefined;
        const isError = !!fieldErrorMessage;
        const showHelperTextElement = !!(
          helperText
          || (isError && !hideErrorMessage)
        );
        const selectedValues: string[] = rhfValue ?? [];
        const selectedSet = new Set(selectedValues);

        const selectedOptions = selectedValues.map(val => {
          if (optionsMap) {
            return optionsMap.get(val as Option[ValueKey]) ?? val;
          }
          return options.find(opn => opn === val) ?? val;
        }) as AutocompleteValue<Option, true, DisableClearable, FreeSolo>;

        const areAllSelected
          = options.length > 0
            && selectedValues.length === options.length
            && options.every(option =>
              selectedSet.has(getOptionLabelOrValue(option, valueKey)));
        const isIndeterminate = selectedValues.length > 0 && !areAllSelected;


        const changeFieldState = (
          newValues: string[],
          selectedValue?: string
        ) => {
          rhfOnChange(newValues);
          onValueChange?.({
            newValue: newValues,
            selectedOption: selectedValue
          });
        };

        const handleCheckboxChange = (
          currentValue: string[],
          optionValue: string,
          checked: boolean
        ): string[] => {
          /* When "Select All" checkbox is toggled. */
          if (!optionValue || optionValue === selectAllOptionValue) {
            return checked
              ? options.map(opt => getOptionLabelOrValue(opt, valueKey))
              : [];
          }
          /* When one of the options is selected */
          return checked
            ? [...currentValue, optionValue]
            : currentValue.filter(val => val !== optionValue);
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
              {...otherMultiAutoCompleteProps}
              id={fieldId}
              options={autoCompleteOptions}
              freeSolo={freeSolo}
              autoSelect={freeSolo ? autoSelect ?? true : autoSelect}
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
                  onValueChange?.({
                    newValue: [],
                    selectedOption: undefined
                  });
                  return;
                }
                const isSelectAllSelected
                  = newSelectedOptions.some(isSelectAllOption);
                if (isSelectAllSelected) {
                  const allValues = options.map(option =>
                    getOptionLabelOrValue(option, valueKey));
                  const finalValue = areAllSelected ? [] : allValues;
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
                const finalValue = newSelectedOptions
                  .filter(option => !isSelectAllOption(option))
                  .map(option => getOptionLabelOrValue(option, valueKey));
                if (customOnChange) {
                  customOnChange({
                    rhfOnChange,
                    newValue: finalValue,
                    selectedOption: clickedOption
                      ? getOptionLabelOrValue(clickedOption, valueKey)
                      : undefined
                  });
                  return;
                }
                rhfOnChange(finalValue);
                onValueChange?.({
                  newValue: finalValue,
                  selectedOption: clickedOption
                    ? getOptionLabelOrValue(clickedOption, valueKey)
                    : undefined
                });
              }}
              onBlur={blurEvent => {
                rhfOnBlur();
                onBlur?.(blurEvent);
              }}
              getOptionLabel={option => displayOptionLabel(option, true)}
              isOptionEqualToValue={(option, value) => {
                /*
                 * Select All is never stored in `value`; matching it to real values when
                 * `areAllSelected` made MUI remove the first option on the next click.
                 */
                if (isSelectAllOption(option)) {
                  return false;
                }
                if (valueKey && isKeyValueOption(option, labelKey, valueKey)) {
                  return (
                    option[valueKey] === (typeof value === 'object' && value !== null
                      ? value[valueKey]
                      : value)
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
                  'aria-label': hideLabel ? accessibleFieldLabel : undefined,
                  'aria-describedby': showHelperTextElement
                    ? isError
                      ? errorId
                      : helperTextId
                    : undefined,
                  autoComplete
                };
                return (
                  <TextField
                    {...otherTextFieldProps}
                    {...otherInputParams}
                    name={rhfFieldName}
                    inputRef={mergeRefs(rhfRef, ref)}
                    disabled={paramsDisabled}
                    placeholder={
                      selectedOptions.length > 0 ? undefined : placeholder
                    }
                    label={
                      !hideLabel && !isLabelAboveFormField
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
                const isSelectAll = isSelectAllOption(option);
                const optionLabel = displayOptionLabel(option);
                if (isSelectAll) {
                  return (
                    <Box component="li" key={key} {...optionProps}>
                      <FormControlLabel
                        {...otherFormControlLabelProps}
                        label={optionLabel}
                        disabled={isDisabled}
                        control={
                          <Checkbox
                            {...checkboxProps}
                            id={`${fieldName}_${selectAllOptionValue}`}
                            name={`${fieldName}_${selectAllOptionValue}`}
                            value={selectAllOptionValue}
                            checked={areAllSelected}
                            indeterminate={isIndeterminate}
                            disabled={isDisabled}
                          />
                        }
                        sx={{ ...appliedFormControlLabelSx, width: '100%' }}
                        onClick={e => {
                          e.preventDefault();
                          changeFieldState(
                            handleCheckboxChange(
                              selectedValues,
                              selectAllOptionValue,
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
                const isOptionDisabled = isDisabled || getOptionDisabled?.(option);
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
                            selectedValues.includes(optionValue)
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
                        const checked = !selectedValues.includes(optionValue);
                        changeFieldState(
                          handleCheckboxChange(
                            selectedValues,
                            optionValue,
                            checked
                          ),
                          optionValue
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
              slotProps={{
                ...slotProps,
                chip: ChipProps,
                listbox: {
                  ...slotProps?.listbox
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

const RHFMultiAutocomplete = RHFMultiAutocompleteInner as <
  T extends FieldValues,
  Option extends StrObjOption = StrObjOption,
  LabelKey extends Extract<keyof Option, string> = Extract<
    keyof Option,
    string
  >,
  ValueKey extends Extract<keyof Option, string> = Extract<
    keyof Option,
    string
  >,
  DisableClearable extends boolean = false,
  FreeSolo extends boolean = false
>(
  props: RHFMultiAutocompleteProps<
    T,
    Option,
    LabelKey,
    ValueKey,
    DisableClearable,
    FreeSolo
  > & {
    ref?: Ref<HTMLInputElement>;
  }
) => JSX.Element;

export default RHFMultiAutocomplete;
