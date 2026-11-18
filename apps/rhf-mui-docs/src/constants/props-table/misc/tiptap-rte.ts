import type { PropsInfo, VersionProps } from '@/types';
import { resolveProp } from '@/utils';
import PropsDescription from '../descriptions/props';

/** Props reference rows for `RHFTipTapRte`. */
const tipTapRteRows = ({
  docsVersion,
  muiVersion
}: VersionProps): PropsInfo[] => {
  const args = { docsVersion, muiVersion };
  const customOnChange: PropsInfo = {
    name: 'customOnChange',
    description:
      'Override the default `onChange` behavior of the editor. You must pass the HTML you want to store to the **rhfOnChange** function to update the field value.',
    type: '({ rhfOnChange, newValue, editor }) => void'
  };
  const onValueChange: PropsInfo = {
    name: 'onValueChange',
    description:
      'Callback function triggered after the field value has been updated, with the new HTML string and the Tiptap `Editor` instance. It is not called when `customOnChange` is used.',
    type: '({ newValue, editor }) => void'
  };
  const editorOptions: PropsInfo = {
    name: 'editorOptions',
    description:
      'Options passed to Tiptap\'s `useEditor`, except `extensions`, `content` and `editable`, which the component controls. `onUpdate` and `onBlur` still run after the component\'s own handlers.',
    type: 'UseEditorOptions'
  };
  const editorExtensions: PropsInfo = {
    name: 'editorExtensions',
    description:
      'Tiptap extensions to use instead of the default set, which is exported as `DefaultEditorExtensions`. A `Placeholder` extension is added automatically when `placeholder` is set.',
    type: 'AnyExtension[]'
  };
  const containerProps: PropsInfo = {
    name: 'containerProps',
    description: 'Props forwarded to the `Box` that wraps the toolbar and the content area.',
    type: 'BoxProps'
  };
  const contentContainerProps: PropsInfo = {
    name: 'contentContainerProps',
    description: 'Props forwarded to the `Box` that wraps the editable content.',
    type: 'BoxProps'
  };
  const renderToolbar: PropsInfo = {
    name: 'renderToolbar',
    description: 'Custom toolbar renderer. Receives the editor and the disabled state. Replaces the default toolbar.',
    type: '(editor: Editor, disabled: boolean) => ReactNode'
  };
  const placeholder: PropsInfo = {
    name: 'placeholder',
    description: 'Text shown while the editor is empty.',
    type: 'string'
  };

  return [
    resolveProp(PropsDescription.fieldName, args),
    resolveProp(PropsDescription.control, args),
    resolveProp(PropsDescription.registerOptions, args),
    resolveProp(PropsDescription.required, args),
    customOnChange,
    onValueChange,
    editorOptions,
    editorExtensions,
    containerProps,
    contentContainerProps,
    renderToolbar,
    placeholder,
    resolveProp(PropsDescription.disabled, args),
    resolveProp(PropsDescription.label, args),
    resolveProp(PropsDescription.showLabelAboveFormField_Default, args),
    resolveProp(PropsDescription.formLabelProps, args),
    resolveProp(PropsDescription.hideLabel, args),
    resolveProp(PropsDescription.renderError, args),
    resolveProp(PropsDescription.hideErrorMessage, args),
    resolveProp(PropsDescription.helperText, args),
    resolveProp(PropsDescription.formHelperTextProps, args),
    resolveProp(PropsDescription.customIds, args)
  ];
};

export default tipTapRteRows;
