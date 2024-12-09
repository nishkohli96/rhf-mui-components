import {
  ReactNode,
  ChangeEvent,
  KeyboardEvent,
  ClipboardEvent,
  useState,
  useContext
} from 'react';
import {
  FieldValues,
  Path,
  Controller,
  Control,
  RegisterOptions
} from 'react-hook-form';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import MuiTextField, { TextFieldProps } from '@mui/material/TextField';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { FormControl, FormLabel, FormLabelText, FormHelperText } from '@/mui/common';
import { FormLabelProps, FormHelperTextProps, MuiChipProps } from '@/types';
import { fieldNameToLabel, keepLabelAboveFormField, isAboveMuiV5 } from '@/utils';

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
  disabled,
  sx: muiTextFieldSx,
  variant = 'outlined',
  limitTags = 2,
  getLimitTagsText,
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
        setInputValue('');
        return [...currentTags, newTag];
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
        formLabelProps={formLabelProps}
      />
      <Controller
        name={fieldName}
        control={control}
        rules={registerOptions}
        render={({ field }) => {
          const { value = [], onChange } = field;
          const hideInput = disabled && value.length > 0;
          const visibleTags = showAllTags
            ? value
            : isFocused || !limitTags ? value : value.slice(0, limitTags);

          const triggerChangeEvents = (fieldValue: string[]) => {
            onChange(fieldValue);
            onValueChange?.(fieldValue);
          };

          const startAdornment = {
            startAdornment: (
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 1,
                  mb: value.length > 0 && !hideInput ? 1 : 0,
                  width: '100%'
                }}
              >
                {visibleTags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    disabled={disabled}
                    onDelete={() => {
                      const newValues = value.filter(
                        item => item !== tag
                      );
                      triggerChangeEvents(newValues);
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
            )
          };

          return (
            /**
             * slotProps does not exist on mui v5 textfield, this shall be
             * patched on migration to v6.
             */
            // @ts-ignore
            <MuiTextField
              autoComplete={fieldName}
              variant={variant}
              label={
                !isLabelAboveFormField ? (
                  <FormLabelText label={fieldLabel} required={required} />
                ) : undefined
              }
              value={inputValue}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleInputChange}
              onKeyDown={event => {
                const newTags = handleKeyPress(event, value);
                if (newTags) {
                  triggerChangeEvents(newTags);
                }
              }}
              onPaste={event => {
                triggerChangeEvents(handlePaste(event, value));
              }}
              disabled={disabled}
              sx={{
                ...muiTextFieldSx,
                '& .MuiInputBase-root': {
                  display: 'flex',
                  flexDirection: 'column',
                  padding: getTextFieldPadding(variant)
                },
                '& .MuiInputBase-input': {
                  padding: 0,
                  ...(hideInput && { display: 'none' })
                }
              }}
              {...(isAboveMuiV5
                ? {
                  slotProps: {
                    input: { startAdornment }
                  }
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
        formHelperTextProps={formHelperTextProps}
      />
    </FormControl>
  );
};

export default RHFTagsInput;
