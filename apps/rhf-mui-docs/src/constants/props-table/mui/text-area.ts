import type { PropsInfo, VersionProps } from '@/types';
import { resolveProp } from '@/utils';
import PropsDescription from '../descriptions/props';

/** Props reference rows for `RHFTextArea`. */
const textAreaRows = ({
  docsVersion,
  muiVersion
}: VersionProps): PropsInfo[] => {
  const args = { docsVersion, muiVersion };
  const customOnChange: PropsInfo = {
    name: 'customOnChange',
    description:
      'Override the default `onChange` behavior of the text area. You must pass the updated `newValue` to the **rhfOnChange** function to update the field value.',
    type: '({ rhfOnChange, newValue, event }) => void'
  };
  const onValueChange: PropsInfo = {
    name: 'onValueChange',
    description:
      'Callback function triggered after the field value has been updated. It is not called when `customOnChange` is used.',
    type: '({ newValue, event }) => void'
  };
  const maxChars: PropsInfo = {
    name: 'maxChars',
    description:
      'Maximum number of characters the field accepts. Typing and pasting stop at this limit through the native `maxLength` attribute. Counts UTF-16 code units, so a single emoji counts as 2.',
    type: 'number'
  };
  const showCharLimit: PropsInfo = {
    name: 'showCharLimit',
    description:
      'Shows a `current/max` character counter at the bottom-right inside the field. Has no effect unless `maxChars` is set.',
    type: 'boolean'
  };
  const renderCharLimit: PropsInfo = {
    name: 'renderCharLimit',
    description:
      'Custom renderer for the character counter, replacing the default `current/max` text. Providing it shows the counter even without `showCharLimit`, as long as `maxChars` is set.',
    type: '(charCount: number, maxChars: number) => ReactNode'
  };

  return [
    resolveProp(PropsDescription.fieldName, args),
    resolveProp(PropsDescription.control, args),
    resolveProp(PropsDescription.registerOptions, args),
    customOnChange,
    onValueChange,
    maxChars,
    showCharLimit,
    renderCharLimit,
    resolveProp(PropsDescription.label, args),
    resolveProp(PropsDescription.showLabelAboveFormField, args),
    resolveProp(PropsDescription.formLabelProps, args),
    resolveProp(PropsDescription.hideLabel, args),
    resolveProp(PropsDescription.renderError, args),
    resolveProp(PropsDescription.hideErrorMessage, args),
    resolveProp(PropsDescription.helperText, args),
    resolveProp(PropsDescription.formHelperTextProps, args),
    resolveProp(PropsDescription.customIds, args)
  ];
};

export default textAreaRows;
