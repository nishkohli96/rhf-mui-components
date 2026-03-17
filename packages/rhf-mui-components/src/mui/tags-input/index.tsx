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
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  onValueChange?: (tags: string[]) => void;
  showLabelAboveFormField?: boolean;
  formLabelProps?: FormLabelProps;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
  ChipProps?: MuiChipProps;
  limitTags?: number;
  getLimitTagsText?: (hiddenTags: number) => ReactNode;
} & TextFieldInputProps;

const RHFTagsInput = <T extends FieldValues>({
  fieldName,
  control,
  registerOptions,
  onValueChange,
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
  disabled: muiDisabled,
  ...rest
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
  const isError = Boolean(errorMessage);

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
      .filter(tag => tag.trim() && !values.includes(tag.trim()));
    return [...values, ...newTags];
  };

  return (
    <FormControl error={isError}>
      <FormLabel
        label={fieldLabel}
        isVisible={isLabelAboveFormField}
        required={required}
        error={isError}
        formLabelProps={{
          id: labelId,
          htmlFor: fieldId,
          ...formLabelProps
        }}
      />
      <Controller
        name={fieldName}
        control={control}
        rules={registerOptions}
        disabled={muiDisabled}
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
          const disableField = muiDisabled || rhfDisabled;
          const hideInput = disableField && rhfValue.length > 0;
          const visibleTags = showAllTags
            ? rhfValue
            : isFocused || !limitTags ? rhfValue : rhfValue.slice(0, limitTags);

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
                  id={fieldNameToId(tag)}
                  role="listitem"
                  label={tag}
                  disabled={disableField}
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
                    getLimitTagsText?.(rhfValue.length - limitTags)
                    ?? `+${rhfValue.length - limitTags} more`
                  }
                  disabled={disableField}
                />
              )}
            </Box>
          );

          return (
            <MuiTextField
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
              disabled={disableField}
              error={isError}
              aria-describedby={isError ? errorId : helperTextId}
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
                : { InputProps: { startAdornment } }
              )}
              {...rest}
            />
          );
        }}
      />
      <FormHelperText
        error={isError}
        errorMessage={errorMessage}
        hideErrorMessage={hideErrorMessage}
        helperText={helperText}
        formHelperTextProps={{
          id: isError ? errorId : helperTextId,
          ...formHelperTextProps
        }}
      />
    </FormControl>
  );
};

export default RHFTagsInput;
