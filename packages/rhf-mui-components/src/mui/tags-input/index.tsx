'use client';

import {
  useState,
  useContext,
  useCallback,
  forwardRef,
  type JSX,
  type ReactNode,
  type FocusEvent,
  type ChangeEvent,
  type KeyboardEvent,
  type ClipboardEvent,
  type Ref
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
  MuiChipProps,
  CustomComponentIds
} from '@/types';
import {
  fieldNameToLabel,
  keepLabelAboveFormField,
  fieldNameToId,
  useFieldIds,
  mergeRefs,
  normalizeString
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

type OnValueChangeProps = {
  newValue: string[];
};

export type RHFTagsInputProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  /**
   * Called before a tag is added.
   *
   * Use this callback to validate, transform, or prevent individual tags.
   *
   * Returning:
   * - `false` prevents the tag from being added.
   * - `string` replaces the original tag with the returned value.
   * - `true` or `void` allows the original tag to be added unchanged.
   *
   * @param newTag - The tag the user is attempting to add.
   * @param currentTags - The current list of tags before the new tag is added.
   * @returns `false` to block the tag, a replacement tag string, or nothing to allow the tag.
   */
  onTagAdd?: (
    newTag: string,
    currentTags: string[]
  ) => boolean | string | void;
  /**
   * Called before a tag is removed.
   *
   * Use this callback to intercept or prevent tag deletion.
   *
   * Returning:
   * - `false` prevents the tag from being removed.
   * - `true` or `void` allows the tag to be removed.
   *
   * @param deletedTag - The tag being removed.
   * @param currentTags - The current list of tags before removal.
   * @returns `false` to prevent deletion, or nothing to allow it.
   */
  onTagDelete?: (
    deletedTag: string,
    currentTags: string[]
  ) => boolean | void;
  /**
   * Called when one or more tags are pasted into the input.
   *
   * Return:
   * - `false` to prevent all pasted tags from being added.
   * - A `string[]` to replace the parsed tags with a custom set.
   * - `void` to use the parsed tags unchanged.
   *
   * Tags are split using the configured `delimiter`, trimmed,
   * and deduplicated before this callback is invoked.
   *
   * @param pastedTags - The parsed tags extracted from the pasted text.
   * @param currentTags - The current list of tags before the paste operation.
   */
  onTagPaste?: (
    pastedTags: string[],
    currentTags: string[]
  ) => string[] | boolean | void;
  /**
   * Character used to separate tags when typing or pasting.
   *
   * Pressing this key commits the current input as one or more tags.
   * Pasted values are also split using this delimiter.
   *
   * @default ','
   */
  delimiter?: string;
  /**
   * Maximum number of tags that can be added.
   *
   * When the limit is reached:
   * - Additional tags entered from the keyboard are ignored.
   * - Pasted tags are truncated to fit the remaining available slots.
   *
   * By default, no limit is enforced.
   */
  maxTags?: number;
  onValueChange?: ({ newValue }: OnValueChangeProps) => void;
  showLabelAboveFormField?: boolean;
  formLabelProps?: FormLabelProps;
  hideLabel?: boolean;
  /**
   * @deprecated
   * Field error message is now automatically derived from form state.
   * Passing this prop is no longer necessary and it will be removed in the next major version.
   */
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
  /**
   * Props applied to the Chip component used to render each tag.
   *
   * Useful for customizing the appearance and behavior of tags,
   * such as color, size, variant, icon, or delete functionality.
   */
  ChipProps?: MuiChipProps;
  limitTags?: number;
  getLimitTagsText?: (hiddenTags: number) => ReactNode;
  renderTagLabel?: (tag: string) => ReactNode;
  customIds?: CustomComponentIds;
} & TextFieldInputProps;

type RhfOnChange = (value: string[]) => void;

const RHFTagsInputInner = forwardRef(function RHFTagsInput<
  T extends FieldValues
>(
  {
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
    formLabelProps,
    hideLabel,
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
    slotProps: muiSlotProps,
    onFocus,
    onBlur,
    autoComplete = defaultAutocompleteValue,
    renderTagLabel,
    customIds,
    ...otherTagsInputProps
  }: RHFTagsInputProps<T>,
  ref: Ref<HTMLInputElement>
) {
  const muiTheme = useTheme();
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const { fieldId, labelId, helperTextId, errorId } = useFieldIds(
    fieldName,
    customIds
  );

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

  const getPaddingOverride = (overrides: unknown): string | undefined => {
    if (
      overrides !== null
      && typeof overrides === 'object'
      && 'padding' in overrides
    ) {
      const { padding } = overrides;
      return typeof padding === 'string' ? padding : undefined;
    }
    return undefined;
  };

  const getTextFieldPadding = (
    variant: 'outlined' | 'filled' | 'standard'
  ): string => {
    switch (variant) {
      case 'filled':
        return (
          getPaddingOverride(
            muiTheme.components?.MuiFilledInput?.styleOverrides?.root
          ) ?? '25px 12px 8px'
        );
      case 'standard':
        return (
          getPaddingOverride(
            muiTheme.components?.MuiInput?.styleOverrides?.root
          ) ?? '4px 0px 5px'
        );
      default:
        return (
          getPaddingOverride(
            muiTheme.components?.MuiOutlinedInput?.styleOverrides?.root
          ) ?? '16.5px 14px'
        );
    }
  };
  const textFieldPadding = getTextFieldPadding(variant);

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  /** Helper for triggering both RHF + external change events */
  const triggerChangeEvents = useCallback(
    (newValue: string[], onChange: RhfOnChange) => {
      onChange(newValue);
      onValueChange?.({ newValue });
    },
    [onValueChange]
  );

  const handleKeyDown = useCallback(
    (
      event: KeyboardEvent<HTMLDivElement>,
      value: string[],
      onChange: RhfOnChange
    ) => {
      const trimmed = inputValue.trim();

      /*  Add tag on pressing "Enter" or the delimiter key. */
      if (event.key === 'Enter' || event.key === delimiter) {
        event.preventDefault();
        if (trimmed) {
          /* Split input by delimiter and filter valid tags */
          const rawTags = trimmed
            .split(delimiter)
            .map(tag => tag.trim())
            .filter(Boolean);
          if (!rawTags.length) {
            return;
          }

          /* Allow external hook to modify or block additions */
          const processedTags: string[] = [];
          for (const tag of rawTags) {
            /* Check if max limit reached */
            if (
              maxTags !== undefined
              && value.length + processedTags.length >= maxTags
            ) {
              break;
            }
            const result = onTagAdd?.(tag, value);
            if (result !== false) {
              const finalTag = (
                typeof result === 'string' ? result : tag
              ).trim();
              if (
                ![...value, ...processedTags].some(
                  v => normalizeString(v) === normalizeString(finalTag)
                )
              ) {
                processedTags.push(finalTag);
              }
            }
          }

          if (processedTags.length) {
            triggerChangeEvents([...value, ...processedTags], onChange);
            setInputValue('');
          }
        }
      } else if (!trimmed && ['Backspace', 'Delete'].includes(event.key)) {
        /**
         * Guard against empty array — value[value.length - 1] is
         * undefined when there are no tags, which would pass undefined to
         * onTagDelete and slice an already-empty array unnecessarily.
         */
        if (!value.length) {
          return;
        }

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

  const handlePaste = useCallback(
    (
      event: ClipboardEvent<HTMLDivElement>,
      value: string[],
      onChange: RhfOnChange
    ) => {
      event.preventDefault();
      const pasteData = event.clipboardData.getData('text');

      /**
       * Use reduce instead of filter so each candidate tag is also
       * checked against the tags already accepted from the same paste batch.
       * Previously "foo,foo" would pass the filter twice because neither
       * occurrence existed in `value` at filter time.
       */
      const newTags = pasteData
        .split(delimiter)
        .map(tag => tag.trim())
        .filter(Boolean)
        .reduce<string[]>((acc, tag) => {
          const norm = normalizeString(tag);
          if (
            !value.some(v => normalizeString(v) === norm)
            && !acc.some(v => normalizeString(v) === norm)
          ) {
            acc.push(tag);
          }
          return acc;
        }, []);

      const result = onTagPaste?.(newTags, value);
      if (result === false) {
        return;
      }

      const finalTags = Array.isArray(result) ? result : newTags;

      if (maxTags !== undefined) {
        const remainingSlots = Math.max(maxTags - value.length, 0);
        if (remainingSlots === 0) {
          return;
        }
        if (finalTags.length > 0) {
          triggerChangeEvents(
            [...value, ...finalTags.slice(0, remainingSlots)],
            onChange
          );
        }
        return;
      }

      if (finalTags.length > 0) {
        triggerChangeEvents([...value, ...finalTags], onChange);
      }
    },
    [delimiter, maxTags, onTagPaste, triggerChangeEvents]
  );

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
        },
        fieldState: { error: fieldStateError }
      }) => {
        const fieldErrorMessage
          = fieldStateError?.message?.toString() ?? errorMessage;
        const isError = !!fieldErrorMessage;
        const showHelperTextElement = !!(
          helperText
          || (isError && !hideErrorMessage)
        );
        const hideInput = muiDisabled && rhfValue.length > 0;

        const visibleTags
          = showAllTags || isFocused
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
                label={renderTagLabel?.(tag) ?? tag}
                disabled={muiDisabled || rhfDisabled}
                onDelete={() => {
                  const shouldDelete = onTagDelete?.(tag, rhfValue);
                  if (shouldDelete === false) {
                    return;
                  }
                  triggerChangeEvents(
                    rhfValue.filter(t => t !== tag),
                    rhfOnChange as RhfOnChange
                  );
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
                disabled={muiDisabled || rhfDisabled}
              />
            )}
          </Box>
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
            <MuiTextField
              {...otherTagsInputProps}
              id={fieldId}
              name={rhfFieldName}
              autoComplete={autoComplete}
              inputRef={mergeRefs(rhfRef, ref)}
              variant={variant}
              label={
                !hideLabel && !isLabelAboveFormField
                  ? (
                    <FormLabelText label={fieldLabel} required={required} />
                  )
                  : undefined
              }
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={event =>
                handleKeyDown(event, rhfValue, rhfOnChange as RhfOnChange)}
              onPaste={event =>
                handlePaste(event, rhfValue, rhfOnChange as RhfOnChange)}
              onFocus={handleFocus}
              onBlur={e => {
                setIsFocused(false);
                /**
                 * Clear uncommitted input on blur so stale text
                 * doesn't reappear the next time the field is focused.
                 */
                setInputValue('');
                rhfOnBlur();
                onBlur?.(e);
              }}
              disabled={muiDisabled || rhfDisabled}
              error={isError}
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
                ...muiSlotProps,
                input: { ...muiSlotProps?.input, startAdornment },
                htmlInput: {
                  ...muiSlotProps?.htmlInput,
                  'aria-labelledby':
                    !hideLabel && isLabelAboveFormField ? labelId : undefined,
                  'aria-describedby': showHelperTextElement
                    ? isError
                      ? errorId
                      : helperTextId
                    : undefined,
                  'aria-required': required,
                }
              }}
              multiline={false}
            />
            <FormHelperText
              error={isError}
              errorMessage={fieldErrorMessage}
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
      }}
    />
  );
});

const RHFTagsInput = RHFTagsInputInner as <T extends FieldValues>(
  props: RHFTagsInputProps<T> & { ref?: Ref<HTMLInputElement> }
) => JSX.Element;

export default RHFTagsInput;
