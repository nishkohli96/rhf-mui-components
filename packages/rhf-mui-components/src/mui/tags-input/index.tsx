'use client';

import {
  useContext,
  forwardRef,
  type JSX,
  type ReactNode,
  type Ref
} from 'react';
import {
  Controller,
  type FieldError,
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import { type TextFieldProps } from '@mui/material/TextField';
import MUITagsInput from '@nish1896/mui-components/mui/tags-input';
import {
  type FormLabelProps,
  type FormHelperTextProps,
  type MuiChipProps
} from '@/common';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import type { CustomComponentIds } from '@/types';
import {
  keepLabelAboveFormField,
  mergeRefs,
  mergeSx,
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

type OnValueChangeProps = {
  newValue: string[];
};

type RHFTagsInputOnTagAddProps = {
  currentValue: string[];
  newTag: string;
};

type RHFTagsInputOnTagDeleteProps = {
  currentValue: string[];
  deletedTag: string;
};

type RHFTagsInputOnTagPasteProps = {
  currentValue: string[];
  pastedTags: string[];
};

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
   * Called before a tag is added.
   *
   * Use this callback to validate, transform, or prevent individual tags.
   *
   * Returning:
   * - `false` prevents the tag from being added.
   * - `string` replaces the original tag with the returned value.
   * - `true` or `void` allows the original tag to be added unchanged.
   *
   * @param props - Details for the tag add action.
   * @param props.currentValue - The current field value before the new tag is added.
   * @param props.newTag - The tag the user is attempting to add.
   * @returns `false` to block the tag, a replacement tag string, or nothing to allow the tag.
   */
  onTagAdd?: ({
    currentValue,
    newTag
  }: RHFTagsInputOnTagAddProps) => boolean | string | void;
  /**
   * Called before a tag is removed.
   *
   * Use this callback to intercept or prevent tag deletion.
   *
   * Returning:
   * - `false` prevents the tag from being removed.
   * - `true` or `void` allows the tag to be removed.
   *
   * @param props - Details for the tag delete action.
   * @param props.currentValue - The current field value before the tag is removed.
   * @param props.deletedTag - The tag being removed.
   * @returns `false` to prevent deletion, or nothing to allow it.
   */
  onTagDelete?: ({
    currentValue,
    deletedTag
  }: RHFTagsInputOnTagDeleteProps) => boolean | void;
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
   * @param props - Details for the tag paste action.
   * @param props.currentValue - The current field value before the paste operation.
   * @param props.pastedTags - The parsed tags extracted from the pasted text.
   */
  onTagPaste?: ({
    currentValue,
    pastedTags
  }: RHFTagsInputOnTagPasteProps) => string[] | boolean | void;
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
  /**
   * Called after the default tags input handler stores the next tag array in React Hook Form.
   *
   * @param newValue - Next tag string array.
   */
  onValueChange?: ({ newValue }: OnValueChangeProps) => void;
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
   * @deprecated
   * Field error message is now automatically derived from form state.
   * Passing this prop is no longer necessary and it will be removed in the next major version.
   *
   * Use `renderError` to customize how the field error is rendered.
   */
  errorMessage?: ReactNode;
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
  /**
   * Custom renderer for each visible tag label.
   *
   * Receives the tag value and should return the content displayed inside the chip.
   */
  renderTagLabel?: (tag: string) => ReactNode;
  /**
   * Custom ids for generated field, label, helper text, and error elements.
   */
  customIds?: CustomComponentIds;
} & TextFieldInputProps;

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
    delimiter,
    maxTags,
    onValueChange,
    onBlur: muiOnBlur,
    disabled: muiDisabled,
    label,
    showLabelAboveFormField,
    formLabelProps,
    hideLabel,
    required,
    errorMessage,
    renderError,
    hideErrorMessage,
    helperText,
    formHelperTextProps,
    ChipProps,
    variant,
    limitTags,
    getLimitTagsText,
    slotProps: muiSlotProps,
    onFocus,
    autoComplete,
    renderTagLabel,
    customIds,
    ...otherTagsInputProps
  }: RHFTagsInputProps<T>,
  ref: Ref<HTMLInputElement>
) {
  const {
    allLabelsAboveFields,
    defaultFormLabelSx,
    defaultFormHelperTextSx
  } = useContext(RHFMuiConfigContext);

  const { fieldId, labelId, helperTextId, errorId } = useFieldIds(
    fieldName,
    customIds
  );
  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );
  const { sx: formLabelSx, ...otherFormLabelProps } = formLabelProps ?? {};
  const { sx: formHelperTextSx, ...otherFormHelperTextProps }
    = formHelperTextProps ?? {};

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
        const fieldErrorMessage = typeof errorMessage === 'string'
          ? errorMessage
          : fieldStateError?.message?.toString();

        return (
          <MUITagsInput
            {...otherTagsInputProps}
            fieldName={rhfFieldName}
            inputRef={mergeRefs(rhfRef, ref)}
            value={rhfValue}
            onValueChange={({ newValue }) => {
              rhfOnChange(newValue);
              onValueChange?.({ newValue });
            }}
            onTagAdd={onTagAdd}
            onTagDelete={onTagDelete}
            onTagPaste={onTagPaste}
            delimiter={delimiter}
            maxTags={maxTags}
            disabled={isDisabled}
            label={label}
            showLabelAboveFormField={isLabelAboveFormField}
            formLabelProps={{
              ...otherFormLabelProps,
              sx: mergeSx(defaultFormLabelSx, formLabelSx)
            }}
            hideLabel={hideLabel}
            required={required}
            errorMessage={fieldErrorMessage}
            renderError={() => fieldStateError
              ? renderError?.(fieldStateError)
              : undefined}
            hideErrorMessage={hideErrorMessage}
            helperText={helperText}
            formHelperTextProps={{
              ...otherFormHelperTextProps,
              sx: mergeSx(defaultFormHelperTextSx, formHelperTextSx)
            }}
            ChipProps={ChipProps}
            variant={variant}
            limitTags={limitTags}
            getLimitTagsText={getLimitTagsText}
            slotProps={muiSlotProps}
            onFocus={onFocus}
            onBlur={blurEvent => {
              rhfOnBlur();
              muiOnBlur?.(blurEvent);
            }}
            autoComplete={autoComplete}
            renderTagLabel={renderTagLabel}
            customIds={{
              field: fieldId,
              label: labelId,
              helperText: helperTextId,
              error: errorId
            }}
          />
        );
      }}
    />
  );
});

const RHFTagsInput = RHFTagsInputInner as <T extends FieldValues>(
  props: RHFTagsInputProps<T> & { ref?: Ref<HTMLInputElement> }
) => JSX.Element;

export default RHFTagsInput;
