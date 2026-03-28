'use client';

import {
  useState,
  useContext,
  useCallback,
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
import type {
  FormLabelProps,
  FormHelperTextProps,
  MuiChipProps
} from '@/types';
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
  onTagAdd?: (newTag: string, currentTags: string[]) => boolean | string | void;
  onTagDelete?: (deletedTag: string, currentTags: string[]) => boolean | void;
  onTagPaste?: (
    pastedTags: string[],
    currentTags: string[]
  ) => string[] | boolean | void;
  delimiter?: string;
  maxTags?: number;
  showLabelAboveFormField?: boolean;
  hideLabel?: boolean;
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
  onTagAdd,
  onTagDelete,
  onTagPaste,
  delimiter = ',',
  maxTags,
  onValueChange,
  disabled: muiDisabled,
  label,
  showLabelAboveFormField,
  hideLabel,
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
  ...rest
}: RHFTagsInputProps<T>) => {
  const muiTheme = useTheme();
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const { fieldId, labelId, helperTextId, errorId } = useFieldIds(fieldName);

  const { allLabelsAboveFields } = useContext(RHFMuiConfigContext);
  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isError = !!errorMessage;
  const showHelperTextElement = !!helperText || (isError && !hideErrorMessage);

  /**
   * Similar to MuiAutocomplete, if limitTags = -1, show all the
   * tags in the input, even when it is not focused.
   */
  const showAllTags = limitTags === -1;

  const getTextFieldPadding = (variant: 'outlined' | 'filled' | 'standard') => {
    switch (variant) {
      case 'filled':
        return (
          (
            muiTheme.components?.MuiFilledInput?.styleOverrides?.root as Record<
              string,
              any
            >
          )?.padding ?? '25px 12px 8px'
        );
      case 'standard':
        return (
          (
            muiTheme.components?.MuiInput?.styleOverrides?.root as Record<
              string,
              any
            >
          )?.padding ?? '4px 0px 5px'
        );
      default:
        return (
          (
            muiTheme.components?.MuiOutlinedInput?.styleOverrides
              ?.root as Record<string, any>
          )?.padding ?? '16.5px 14px'
        );
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

  /** Helper for triggering both RHF + external change events */
  const triggerChangeEvents = useCallback(
    (newValue: string[], onChange: (...event: any[]) => void) => {
      onChange(newValue);
      onValueChange?.(newValue);
    },
    [onValueChange]
  );

  const handleKeyDown = useCallback(
    (
      event: KeyboardEvent<HTMLDivElement>,
      value: string[],
      onChange: (...event: any[]) => void
    ) => {
      const trimmed = inputValue.trim();

      if (event.key === 'Enter') {
        event.preventDefault();
        if (trimmed) {
          /* Split input by delimiter and filter valid tags */
          const newTags = trimmed
            .split(delimiter)
            .map((tag) => tag.trim())
            .filter((tag) => tag && !value.includes(tag));
          if (!newTags.length) {
            return;
          }

          /* Allow external hook to modify or block additions */
          const processedTags: string[] = [];
          for (const tag of newTags) {
            /* Check if max limit reached */
            if (
              maxTags !== undefined &&
              value.length + processedTags.length >= maxTags
            ) {
              break;
            }
            const result = onTagAdd?.(tag, value);
            if (result !== false) {
              const finalTag = typeof result === 'string' ? result : tag;
              processedTags.push(finalTag);
            }
          }

          if (processedTags.length) {
            triggerChangeEvents([...value, ...processedTags], onChange);
            setInputValue('');
          }
        }
      } else if (!trimmed && ['Backspace', 'Delete'].includes(event.key)) {
        const deletedTag = value[value.length - 1];
        const shouldDelete = onTagDelete?.(deletedTag, value);
        if (shouldDelete === false) {
          return;
        }
        triggerChangeEvents(value.slice(0, -1), onChange);
      }
    },
    [inputValue, delimiter, maxTags, onTagAdd, onTagDelete, triggerChangeEvents]
  );

  /* from v3*/
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
      inputValue.trim() === '' &&
      (event.key === 'Backspace' || event.key === 'Delete')
    ) {
      const lastTag = currentTags[currentTags.length - 1];
      if (lastTag) {
        const updatedTags = currentTags.slice(0, currentTags.length - 1);
        return updatedTags;
      }
    }
    return null;
  };

  const handlePaste = useCallback(
    (
      event: ClipboardEvent<HTMLDivElement>,
      value: string[],
      onChange: (...event: any[]) => void
    ) => {
      event.preventDefault();
      const pasteData = event.clipboardData.getData('text');
      const delimiterPattern = new RegExp(`[\\s${delimiter}]+`);
      let newTags = pasteData
        .split(delimiterPattern)
        .filter((tag) => tag.trim() && !value.includes(tag.trim()));
      /* External hook for paste validation/modification */
      const result = onTagPaste?.(newTags, value);
      if (result === false) {
        return;
      }
      if (Array.isArray(result)) {
        newTags = result;
      }
      /* Enforce maxTags limit */
      if (maxTags !== undefined) {
        const remainingSlots = Math.max(maxTags - value.length, 0);
        if (remainingSlots === 0) {
          return;
        }
        newTags = newTags.slice(0, remainingSlots);
      }
      if (newTags.length > 0) {
        triggerChangeEvents([...value, ...newTags], onChange);
      }
    },
    [delimiter, maxTags, onTagPaste, triggerChangeEvents]
  );

  return (
    <FormControl error={isError}>
      {!hideLabel && (
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
      )}
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
          const hideInput = rhfDisabled && rhfValue.length > 0;
          const visibleTags = showAllTags
            ? rhfValue
            : isFocused || !limitTags
              ? rhfValue
              : rhfValue.slice(0, limitTags);

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
                  disabled={rhfDisabled}
                  onDelete={() => {
                    const shouldDelete = onTagDelete?.(tag, rhfValue);
                    if (shouldDelete === false) {
                      return;
                    }
                    triggerChangeEvents(
                      rhfValue.filter((t) => t !== tag),
                      rhfOnChange
                    );
                  }}
                  {...ChipProps}
                />
              ))}
              {!showAllTags && !isFocused && rhfValue.length > limitTags && (
                <Chip
                  role="listitem"
                  label={
                    getLimitTagsText?.(rhfValue.length - limitTags) ??
                    `+${rhfValue.length - limitTags} more`
                  }
                  disabled={rhfDisabled}
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
                !hideLabel &&
                !isLabelAboveFormField && (
                  <FormLabelText label={fieldLabel} required={required} />
                )
              }
              value={inputValue}
              inputRef={rhfRef}
              onChange={handleInputChange}
              onKeyDown={(event) => handleKeyDown(event, rhfValue, rhfOnChange)}
              onPaste={(event) => handlePaste(event, rhfValue, rhfOnChange)}
              onFocus={handleFocus}
              onBlur={(e) => {
                setIsFocused(false);
                rhfOnBlur();
                onBlur?.(e);
              }}
              disabled={rhfDisabled}
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
              slotProps={{
                ...slotProps,
                input: { ...slotProps?.input, startAdornment }
              }}
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
        showHelperTextElement={showHelperTextElement}
        formHelperTextProps={{
          id: isError ? errorId : helperTextId,
          ...formHelperTextProps
        }}
      />
    </FormControl>
  );
};

export default RHFTagsInput;
