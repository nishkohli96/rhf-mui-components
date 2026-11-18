'use client';

import { useContext, type JSX, type ReactNode } from 'react';
import {
  Controller,
  type FieldError,
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import MUITipTapRte, {
  DefaultEditorExtensions,
  type MUITipTapRteProps
} from '@nish1896/mui-components/misc/tiptap-rte';
import {
  type FormLabelProps,
  type FormHelperTextProps,
  type CustomOnChangeProps
} from '@/common';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import {
  mergeSx,
  resolveLabelAboveControl,
  resolveRequired
} from '@/utils';

type OnValueChangeProps = Parameters<MUITipTapRteProps['onValueChange']>[0];

export type RHFTipTapRteProps<T extends FieldValues> = {
  /**
   * Name/path of the React Hook Form field this component controls.
   * The field stores the content as an **HTML string**.
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
   * Overrides the default editor change handling.
   * Receives the next HTML string and the Tiptap `Editor` instance.
   * Call `rhfOnChange` with the HTML that should be stored; else the form value will not be updated.
   *
   * @param rhfOnChange - React Hook Form field change handler for the HTML string.
   * @param newValue - Next HTML content of the editor.
   * @param editor - The Tiptap `Editor` instance.
   */
  customOnChange?: ({
    rhfOnChange,
    newValue,
    editor
  }: CustomOnChangeProps<OnValueChangeProps, string>) => void;
  /**
   * Called after the default editor handler stores the next HTML string in React Hook Form.
   *
   * ⚠️ Important:
   * This callback is not called when `customOnChange` is used.
   *
   * @param newValue - Next HTML content of the editor.
   * @param editor - The Tiptap `Editor` instance.
   */
  onValueChange?: ({ newValue, editor }: OnValueChangeProps) => void;
  /**
   * Options passed to Tiptap's `useEditor`, except `extensions`, `content` and
   * `editable`, which the component controls. `onUpdate` and `onBlur` still run
   * after the component's own handlers.
   */
  editorOptions?: MUITipTapRteProps['editorOptions'];
  /**
   * Tiptap extensions to use instead of the default set (`DefaultEditorExtensions`).
   */
  editorExtensions?: MUITipTapRteProps['editorExtensions'];
  /**
   * Props forwarded to the `Box` that wraps the toolbar and content area.
   */
  containerProps?: MUITipTapRteProps['containerProps'];
  /**
   * Props forwarded to the `Box` that wraps the editable content.
   */
  contentContainerProps?: MUITipTapRteProps['contentContainerProps'];
  /**
   * Custom toolbar renderer. Receives the editor and the disabled state.
   */
  renderToolbar?: MUITipTapRteProps['renderToolbar'];
  /**
   * When true, marks the field as required in the UI and accessibility attributes.
   */
  required?: boolean;
  /**
   * Placeholder shown while the editor is empty.
   */
  placeholder?: string;
  /**
   * When true, the editor is read-only and the toolbar is disabled.
   */
  disabled?: boolean;
  /**
   * Label content shown for the field. Defaults to a label generated from `fieldName`.
   */
  label?: ReactNode;
  /**
   * Renders the label above the component.
   * @default true
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
   * Custom ids for generated field, label, helper text, and error elements.
   */
  customIds?: MUITipTapRteProps['customIds'];
};

/**
 * Controlled rich text editor built on [Tiptap](https://tiptap.dev/), wired to
 * a React Hook Form field via `control`. The stored value is an HTML string.
 *
 * A lighter, headless alternative to `RHFRichTextEditor`: it covers common
 * formatting (bold, headings, lists, links, alignment) and ships only the
 * extensions you enable.
 *
 * Docs: [RHFTipTapRte](https://rhf-mui-components.vercel.app/components/misc/RHFTipTapRte)
 *
 * API: [RHFTipTapRteProps](https://rhf-mui-components.vercel.app/components/misc/RHFTipTapRte#api)
 */
const RHFTipTapRte = <T extends FieldValues>({
  fieldName,
  control,
  registerOptions,
  customOnChange,
  onValueChange,
  editorOptions,
  disabled: muiDisabled,
  showLabelAboveFormField,
  formLabelProps,
  required,
  renderError,
  formHelperTextProps,
  ...otherTipTapRteProps
}: RHFTipTapRteProps<T>): JSX.Element => {
  const {
    allLabelsAboveFields,
    defaultFormLabelSx,
    defaultFormHelperTextSx
  } = useContext(RHFMuiConfigContext);

  const isLabelAboveControl = resolveLabelAboveControl(
    showLabelAboveFormField,
    allLabelsAboveFields
  );
  const isFieldRequired = resolveRequired(required, registerOptions?.required);

  const {
    sx: formLabelSx,
    ...otherFormLabelProps
  } = formLabelProps ?? {};
  const {
    sx: formHelperTextSx,
    ...otherFormHelperTextProps
  } = formHelperTextProps ?? {};

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
          disabled: rhfDisabled
        },
        fieldState: { error: fieldStateError }
      }) => {
        const isDisabled = muiDisabled || rhfDisabled;

        return (
          <MUITipTapRte
            {...otherTipTapRteProps}
            fieldName={rhfFieldName}
            value={rhfValue}
            onValueChange={({ newValue, editor }) => {
              if (customOnChange) {
                customOnChange({ rhfOnChange, newValue, editor });
                return;
              }
              rhfOnChange(newValue);
              onValueChange?.({ newValue, editor });
            }}
            editorOptions={{
              ...editorOptions,
              onBlur: blurProps => {
                rhfOnBlur();
                editorOptions?.onBlur?.(blurProps);
              }
            }}
            disabled={isDisabled}
            showLabelAboveFormField={isLabelAboveControl}
            formLabelProps={{
              ...otherFormLabelProps,
              sx: mergeSx(defaultFormLabelSx, formLabelSx)
            }}
            required={isFieldRequired}
            errorMessage={fieldStateError?.message?.toString()}
            renderError={() => fieldStateError
              ? renderError?.(fieldStateError)
              : undefined}
            formHelperTextProps={{
              ...otherFormHelperTextProps,
              sx: mergeSx(defaultFormHelperTextSx, formHelperTextSx)
            }}
          />
        );
      }}
    />
  );
};

export { DefaultEditorExtensions };
export default RHFTipTapRte;
