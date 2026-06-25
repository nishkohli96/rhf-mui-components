'use client';

import {
  useState,
  useContext,
  type ReactNode,
  type ChangeEvent,
  type KeyboardEvent,
  type ClipboardEvent
} from 'react';
import {
  Controller,
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import MuiTextField, { type TextFieldProps } from '@mui/material/TextField';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import {
  FormControl,
  FormLabel,
  FormLabelText,
  FormHelperText,
  defaultAutocompleteValue
} from '@/common';
import type { FormLabelProps, FormHelperTextProps, MuiChipProps } from '@/types';
import {
  fieldNameToLabel,
  keepLabelAboveFormField,
  isAboveMuiV5,
  fieldNameToId,
  useFieldIds
} from '@/utils';

type TextFieldInputProps = Omit<
  TextFieldProps,
  | 'name'
  | 'value'
  | 'defaultValue'
  | 'onChange'
  | 'error'
  | 'multiline'
  | 'rows'
  | 'minRows'
  | 'maxRows'
  | 'FormHelperTextProps'
>;

export type RHFTagsInputProps<T extends FieldValues> = {
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
   * Callback fired after the tags array is stored in the field.
   * @param tags - Updated list of tags.
   */
  onValueChange?: (tags: string[]) => void;
  /**
   * When true, renders the field label above the form field instead of inside or beside it.
   */
  showLabelAboveFormField?: boolean;
  /**
   * Props forwarded to the internal `FormLabel`. The `id` is managed by the component.
   */
  formLabelProps?: Omit<FormLabelProps, 'id'>;
  /**
   * Validation error message displayed in the `FormHelperText` component.
   * When provided, it takes precedence over `helperText` unless
   * `hideErrorMessage` is set to `true`.
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
   * Props applied to the Chip component used to render each tag.
   *
   * Useful for customizing the appearance and behavior of tags,
   * such as color, size, variant, icon, or delete functionality.
   */
  ChipProps?: MuiChipProps;
  /**
   * Maximum number of tags shown when the input is not focused.
   *
   * Set to `-1` to always show all tags.
   *
   * @default 2
   */
  limitTags?: number;
  /**
   * Custom label rendered for the hidden tags counter.
   *
   * Receives the number of hidden tags.
   *
   * @default moreTags => `+${moreTags} more`
   */
  getLimitTagsText?: (moreTags: number) => ReactNode;
} & TextFieldInputProps;

const RHFTagsInput = <T extends FieldValues>({
  fieldName,
  control,
  registerOptions,
  onValueChange,
  disabled: muiDisabled,
  label,
  showLabelAboveFormField,
  formLabelProps,
  required,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  ChipProps,
  sx: muiTextFieldSx,
  variant = 'outlined',
  limitTags = 2,
  getLimitTagsText,
  slotProps,
  onBlur,
  autoComplete = defaultAutocompleteValue,
  InputProps,
  ...otherTagsInputProps
}: RHFTagsInputProps<T>) => {
  const muiTheme = useTheme();
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const {
    fieldId,
    labelId,
    helperTextId,
    errorId
  } = useFieldIds(fieldName);

  const { allLabelsAboveFields } = useContext(RHFMuiConfigContext);
  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );
  const fieldLabel = label ?? fieldNameToLabel(fieldName);

  /**
   * Similar to MuiAutocomplete, if limitTags = -1, show all the
   * tags in the input, even when it is not focused.
   */
  const showAllTags = limitTags === -1;

  const getTextFieldPadding = (variant: 'outlined' | 'filled' | 'standard') => {
    switch (variant) {
      case 'filled':
        return (muiTheme.components?.MuiFilledInput?.styleOverrides?.root as Record<string, any>)?.padding
          ?? '25px 12px 8px';
      case 'standard':
        return (muiTheme.components?.MuiInput?.styleOverrides?.root as Record<string, any>)?.padding
          ?? '4px 0px 5px';
      default:
        return (muiTheme.components?.MuiOutlinedInput?.styleOverrides?.root as Record<string, any>)?.padding
          ?? '16.5px 14px';
    }
  };
  const textFieldPadding = getTextFieldPadding(variant);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (
    event: KeyboardEvent<HTMLDivElement>,
    currentTags: string[]
  ): string[] | null => {
    /* If inputValue is not empty, handle adding a new tag on 'Enter' */
    if (event.key === 'Enter') {
      event.preventDefault();
      const newTag = inputValue.trim();
      if (newTag) {
        if (!currentTags.includes(newTag)) {
          setInputValue('');
          return [...currentTags, newTag];
        }
      }
    }

    /**
     * If inputValue is empty, handle removing the last tag on 'Backspace'
     * or 'Delete'.
     */
    if (
      inputValue.trim() === ''
      && (event.key === 'Backspace' || event.key === 'Delete')
    ) {
      const lastTag = currentTags[currentTags.length - 1];
      if (lastTag) {
        const updatedTags = currentTags.slice(0, currentTags.length - 1);
        return updatedTags;
      }
    }
    return null;
  };

  const handlePaste = (
    event: ClipboardEvent<HTMLDivElement>,
    values: string[]
  ) => {
    event.preventDefault();
    const pasteData = event.clipboardData.getData('text');
    const newTags = pasteData
      .split(/[\s,]+/)
      .map(tag => tag.trim())
      .filter(trimmed => trimmed && !values.includes(trimmed));
    return [...values, ...newTags];
  };

  return (
    <Controller
      name={fieldName}
      control={control}
      rules={registerOptions}
      render={({
        field: {
          name: rhfFieldName,
          value: rhfValue = [],
          onChange: rhfOnChange,
          onBlur: rhfOnBlur,
          ref: rhfRef,
          disabled: rhfDisabled
        }
      }) => {
        const isDisabled = muiDisabled || rhfDisabled;
        const isError = !!errorMessage;
        const showHelperTextElement = (!!helperText) || (isError && !hideErrorMessage);

        const hideInput = isDisabled && rhfValue.length > 0;
        const visibleTags = showAllTags
          ? rhfValue
          : isFocused || !limitTags ? rhfValue : rhfValue.slice(0, limitTags);
        const moreTags = rhfValue.length - limitTags;

        const triggerChangeEvents = (fieldValue: string[]) => {
          rhfOnChange(fieldValue);
          onValueChange?.(fieldValue);
        };

        const startAdornment = (
          <Box
            role="list"
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              mb: rhfValue.length > 0 && !hideInput ? 1 : 0,
              width: '100%'
            }}
          >
            {visibleTags.map((tag, index) => (
              <Chip
                key={`${fieldNameToId(tag)}-${index}`}
                id={`${fieldNameToId(tag)}-${index}`}
                role="listitem"
                label={tag}
                disabled={isDisabled}
                onDelete={() => {
                  const newValues = rhfValue.filter(
                    item => item !== tag
                  );
                  triggerChangeEvents(newValues);
                }}
                {...ChipProps}
              />
            ))}
            {!showAllTags && !isFocused && rhfValue.length > limitTags && (
              <Chip
                role="listitem"
                label={
                  getLimitTagsText?.(moreTags)
                  ?? `+${moreTags} more`
                }
                disabled={isDisabled}
              />
            )}
          </Box>
        );

        return (
          <FormControl error={isError} disabled={isDisabled}>
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
            <MuiTextField
              {...otherTagsInputProps}
              id={fieldId}
              name={rhfFieldName}
              autoComplete={autoComplete}
              variant={variant}
              label={
                !isLabelAboveFormField
                  ? (
                    <FormLabelText label={fieldLabel} required={required} />
                  )
                  : undefined
              }
              value={inputValue}
              inputRef={rhfRef}
              onFocus={handleFocus}
              onBlur={blurEvent => {
                handleBlur();
                rhfOnBlur();
                onBlur?.(blurEvent);
              }}
              onChange={handleInputChange}
              onKeyDown={event => {
                const newTags = handleKeyPress(event, rhfValue);
                if (newTags) {
                  triggerChangeEvents(newTags);
                }
              }}
              onPaste={event => {
                triggerChangeEvents(handlePaste(event, rhfValue));
              }}
              disabled={isDisabled}
              error={isError}
              aria-labelledby={isLabelAboveFormField ? labelId : undefined}
              aria-describedby={
                showHelperTextElement
                  ? isError
                    ? errorId
                    : helperTextId
                  : undefined
              }
              aria-required={required}
              sx={{
                ...muiTextFieldSx,
                '& .MuiInputBase-root': {
                  display: 'flex',
                  flexDirection: 'column',
                  padding: textFieldPadding
                },
                '& .MuiInputBase-input': {
                  padding: 0,
                  ...(hideInput && { display: 'none' })
                }
              }}
              {...(isAboveMuiV5
                ? {
                  slotProps: {
                    ...slotProps,
                    input: {
                      ...slotProps?.input,
                      startAdornment
                    }
                  },
                }
                : {
                  InputProps: {
                    ...InputProps,
                    startAdornment
                  }
                }
              )}
            />
            <FormHelperText
              error={isError}
              errorMessage={errorMessage}
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
};

export default RHFTagsInput;
