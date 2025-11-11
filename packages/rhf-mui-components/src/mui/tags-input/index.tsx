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
import type {
  FormLabelProps,
  FormHelperTextProps,
  MuiChipProps
} from '@/types';
import {
  fieldNameToLabel,
  keepLabelAboveFormField,
  isAboveMuiV5
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
  disabled,
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
  const { allLabelsAboveFields } = useContext(RHFMuiConfigContext);

  const isError = Boolean(errorMessage);
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );

  /**
   * Similar to MuiAutocomplete, if limitTags = -1, show all the
   * tags in the input, even when it is not focused.
   */
  const showAllTags = limitTags === -1;

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
    [inputValue, triggerChangeEvents]
  );

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
        .filter(tag => tag.trim() && !value.includes(tag.trim()));
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
    [triggerChangeEvents]
  );

  return (
    <FormControl error={isError}>
      {hideLabel
        ? <></>
        : (
          <FormLabel
            label={fieldLabel}
            isVisible={isLabelAboveFormField}
            required={required}
            error={isError}
            formLabelProps={formLabelProps}
          />
        )}
      <Controller
        name={fieldName}
        control={control}
        rules={registerOptions}
        render={({ field }) => {
          const { value = [], onChange, onBlur: rhfOnBlur } = field;
          const hideInput = disabled && value.length > 0;
          const visibleTags = showAllTags
            ? value
            : isFocused || !limitTags ? value : value.slice(0, limitTags);

          const startAdornment = useMemo(
            () => (
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 1,
                  mb: value.length > 0 && !hideInput ? 1 : 0,
                  width: '100%',
                }}
              >
                {visibleTags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    disabled={disabled}
                    onDelete={() => {
                      const shouldDelete = onTagDelete?.(tag, value);
                      if (shouldDelete === false) {
                        return;
                      }
                      triggerChangeEvents(value.filter(t => t !== tag), onChange);
                    }}
                    {...ChipProps}
                  />
                ))}
                {!showAllTags && !isFocused && value.length > limitTags && (
                  <Chip
                    label={
                      getLimitTagsText?.(value.length - limitTags)
                      ?? `+${value.length - limitTags} more`
                    }
                    disabled
                  />
                )}
              </Box>
            ),
            [visibleTags, value, hideInput, disabled, showAllTags, isFocused, limitTags, getLimitTagsText, ChipProps, triggerChangeEvents, onChange]
          );

          const commonInputProps = isAboveMuiV5
            ? { slotProps: { ...slotProps, input: { startAdornment } } }
            : { InputProps: { startAdornment } };

          return (
            <MuiTextField
              autoComplete={autoComplete}
              variant={variant}
              label={
                !hideLabel && !isLabelAboveFormField
                  ? (
                    <FormLabelText label={fieldLabel} required={required} />
                  )
                  : undefined
              }
              value={inputValue}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
              onKeyDown={e => handleKeyDown(e, value, onChange)}
              onPaste={e => handlePaste(e, value, onChange)}
              onFocus={() => setIsFocused(true)}
              onBlur={e => {
                setIsFocused(false);
                rhfOnBlur();
                onBlur?.(e);
              }}
              disabled={disabled}
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
              {...commonInputProps}
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
        formHelperTextProps={formHelperTextProps}
      />
    </FormControl>
  );
};

export default RHFTagsInput;
