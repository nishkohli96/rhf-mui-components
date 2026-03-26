'use client';

import {
  useState,
  useContext,
  useMemo,
  useCallback,
  type ReactNode,
  type ChangeEvent,
  type KeyboardEvent,
  type ClipboardEvent,
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
<<<<<<< HEAD
import { fieldNameToLabel, keepLabelAboveFormField } from '@/utils';
=======
import {
  fieldNameToLabel,
  keepLabelAboveFormField,
  isAboveMuiV5,
  fieldNameToId,
  useFieldIds
} from '@/utils';
>>>>>>> bdebfa741a3d552bdca548db5db00eade2dfac6d

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
  onTagAdd?: (
    newTag: string,
    currentTags: string[]
  ) => boolean | string | void;
  onTagDelete?: (
    deletedTag: string,
    currentTags: string[]
  ) => boolean | void;
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
  InputProps,
  ...rest
}: RHFTagsInputProps<T>) => {
  const muiTheme = useTheme();
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

<<<<<<< HEAD
  const isError = !!errorMessage;
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
=======
  const {
    fieldId,
    labelId,
    helperTextId,
    errorId
  } = useFieldIds(fieldName);

  const { allLabelsAboveFields } = useContext(RHFMuiConfigContext);
>>>>>>> bdebfa741a3d552bdca548db5db00eade2dfac6d
  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isError = !!errorMessage;
  const showHelperTextElement = (!!helperText) || (isError && !hideErrorMessage);

  /**
   * Similar to MuiAutocomplete, if limitTags = -1, show all the
   * tags in the input, even when it is not focused.
   */
  const showAllTags = limitTags === -1;

<<<<<<< HEAD
  const textFieldPadding = useMemo(() => {
    const base
      = {
        filled:
          (muiTheme.components?.MuiFilledInput?.styleOverrides?.root as any)?.padding
          ?? '25px 12px 8px',
        standard:
          (muiTheme.components?.MuiInput?.styleOverrides?.root as any)?.padding ?? '4px 0 5px',
        outlined:
          (muiTheme.components?.MuiOutlinedInput?.styleOverrides?.root as any)?.padding
          ?? '16.5px 14px',
      }[variant] ?? '16.5px 14px';
    return base;
  }, [muiTheme, variant]);
=======
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
>>>>>>> bdebfa741a3d552bdca548db5db00eade2dfac6d

  /** Helper for triggering both RHF + external change events */
  const triggerChangeEvents = useCallback(
    (newValue: string[], onChange: (...event: any[]) => void) => {
      onChange(newValue);
      onValueChange?.(newValue);
    },
    [onValueChange]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>, value: string[], onChange: (...event: any[]) => void) => {
      const trimmed = inputValue.trim();

      if (event.key === 'Enter') {
        event.preventDefault();
        if (trimmed) {
          /* Split input by delimiter and filter valid tags */
          const newTags = trimmed
            .split(delimiter)
            .map(tag => tag.trim())
            .filter(tag => tag && !value.includes(tag));
          if (!newTags.length) {
            return;
          }

          /* Allow external hook to modify or block additions */
          const processedTags: string[] = [];
          for (const tag of newTags) {
            /* Check if max limit reached */
            if (
              maxTags !== undefined
              && value.length + processedTags.length >= maxTags
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
    [inputValue,
      delimiter,
      maxTags,
      onTagAdd,
      onTagDelete,
      triggerChangeEvents]
  );

  const handlePaste = useCallback(
    (
      event: ClipboardEvent<HTMLDivElement>,
      value: string[],
      onChange: (...event: any[]) => void
    ) => {
      event.preventDefault();
<<<<<<< HEAD
      const pasteData = event.clipboardData.getData('text');
      const delimiterPattern = new RegExp(`[\\s${delimiter}]+`);
      let newTags = pasteData
        .split(delimiterPattern)
        .filter(tag => tag.trim() && !value.includes(tag.trim()));
      /* External hook for paste validation/modification */
      const result = onTagPaste?.(newTags, value);
      if (result === false) {
        return;
=======
      const newTag = inputValue.trim();
      if (newTag) {
        if (!currentTags.includes(newTag)) {
          setInputValue('');
          return [...currentTags, newTag];
        }
>>>>>>> bdebfa741a3d552bdca548db5db00eade2dfac6d
      }
      if (Array.isArray(result)) {
        newTags = result;
      }
<<<<<<< HEAD
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
    [delimiter,
      maxTags,
      onTagPaste,
      triggerChangeEvents]
  );

  return (
    <FormControl error={isError}>
      {!hideLabel && (
        <FormLabel
          label={fieldLabel}
          isVisible={isLabelAboveFormField}
          required={required}
          error={isError}
          formLabelProps={formLabelProps}
        />
      )}
=======
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
>>>>>>> bdebfa741a3d552bdca548db5db00eade2dfac6d
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
            : isFocused || !limitTags ? rhfValue : rhfValue.slice(0, limitTags);

<<<<<<< HEAD
=======
          const triggerChangeEvents = (fieldValue: string[]) => {
            rhfOnChange(fieldValue);
            onValueChange?.(fieldValue);
          };

>>>>>>> bdebfa741a3d552bdca548db5db00eade2dfac6d
          const startAdornment = (
            <Box
              role="list"
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
<<<<<<< HEAD
                mb: value.length > 0 && !hideInput ? 1 : 0,
                width: '100%',
=======
                mb: rhfValue.length > 0 && !hideInput ? 1 : 0,
                width: '100%'
>>>>>>> bdebfa741a3d552bdca548db5db00eade2dfac6d
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
<<<<<<< HEAD
                    const shouldDelete = onTagDelete?.(tag, value);
                    if (shouldDelete === false) {
                      return;
                    }
                    triggerChangeEvents(value.filter(t => t !== tag), onChange);
=======
                    const newValues = rhfValue.filter(
                      item => item !== tag
                    );
                    triggerChangeEvents(newValues);
>>>>>>> bdebfa741a3d552bdca548db5db00eade2dfac6d
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
                !hideLabel && !isLabelAboveFormField && (
                  <FormLabelText label={fieldLabel} required={required} />
                )
              }
              value={inputValue}
<<<<<<< HEAD
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setInputValue(e.target.value)}
              onKeyDown={e => handleKeyDown(e, value, onChange)}
              onPaste={e => handlePaste(e, value, onChange)}
              onFocus={() => setIsFocused(true)}
              onBlur={e => {
                setIsFocused(false);
                rhfOnBlur();
                onBlur?.(e);
=======
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
>>>>>>> bdebfa741a3d552bdca548db5db00eade2dfac6d
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
<<<<<<< HEAD
              slotProps={{ ...slotProps, input: { startAdornment } }}
=======
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
>>>>>>> bdebfa741a3d552bdca548db5db00eade2dfac6d
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
