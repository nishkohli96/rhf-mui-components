import type { PropsInfo, VersionProps } from '@/types';
import { resolveProp } from '@/utils';
import PropsDescription from '../descriptions/props';

/** Props reference rows for `RHFUnitInput`. */
const unitInputRows = ({
  docsVersion,
  muiVersion
}: VersionProps): PropsInfo[] => {
  const args = { docsVersion, muiVersion };
  const unitOptions: PropsInfo = {
    name: 'unitOptions',
    description:
      'Options of the unit dropdown: an array of strings, or of objects when `labelKey` and `valueKey` are set.',
    type: 'string[] / object[]',
    required: true
  };
  const labelKey: PropsInfo = {
    name: 'labelKey',
    description: 'Property of each `unitOptions` object used as its visible label. Required for object options.',
    type: 'string'
  };
  const valueKey: PropsInfo = {
    name: 'valueKey',
    description: 'Property of each `unitOptions` object used as its value. Required for object options.',
    type: 'string'
  };
  const customOnChange: PropsInfo = {
    name: 'customOnChange',
    description:
      'Override the default `onChange` behavior. You must pass the updated `{ unit, value }` object to the **rhfOnChange** function to update the field value.',
    type: '({ rhfOnChange, newValue, event }) => void'
  };
  const onValueChange: PropsInfo = {
    name: 'onValueChange',
    description:
      'Callback function triggered after the field value has been updated, with the new `{ unit, value }` object. It is not called when `customOnChange` is used.',
    type: '({ newValue, event }) => void'
  };
  const numberRules: PropsInfo[] = [
    {
      name: 'min',
      description: 'Lower bound of the number. An out-of-range value is clamped to it when the number input loses focus.',
      type: 'number'
    },
    {
      name: 'max',
      description: 'Upper bound of the number. An out-of-range value is clamped to it when the number input loses focus.',
      type: 'number'
    }
  ];
  const renderValue: PropsInfo = {
    name: 'renderValue',
    description:
      'Formats the number for display while the number input is not focused. The stored value stays a `number`.',
    type: '(value: number | null) => string'
  };
  const unitPosition: PropsInfo = {
    name: 'unitPosition',
    description: 'Which side of the number the unit dropdown sits on.',
    type: '\'start\' / \'end\''
  };
  const unitWidth: PropsInfo = {
    name: 'unitWidth',
    description: 'Width of the unit dropdown segment. Accepts a single value, an array indexed by breakpoint, or an object keyed by breakpoint name.',
    type: 'string / array / object'
  };
  const unitSelectProps: PropsInfo = {
    name: 'unitSelectProps',
    description: 'Props forwarded to the unit `Select`, such as `menuItemProps`, `renderOptionLabel` or `getOptionDisabled`.',
    type: 'Partial<SelectProps>'
  };
  const valueInputProps: PropsInfo = {
    name: 'valueInputProps',
    description: 'Props forwarded to the number input, such as `sx` or `slotProps`.',
    type: 'Partial<NumberInputProps>'
  };
  const containerProps: PropsInfo = {
    name: 'containerProps',
    description: 'Props forwarded to the `Box` that wraps both segments.',
    type: 'BoxProps'
  };
  const dividerProps: PropsInfo = {
    name: 'dividerProps',
    description: 'Props forwarded to the divider between the two segments.',
    type: 'BoxProps'
  };
  const customIds: PropsInfo = {
    name: 'customIds',
    description:
      'Custom ids for the generated elements of the unit dropdown and the number input, passed as `{ unit, value }`, each with the usual `customIds` keys.',
    type: '{ unit?: CustomComponentIds; value?: CustomComponentIds }'
  };
  const placeholder: PropsInfo = {
    name: 'placeholder',
    description: 'Placeholder of the number input.',
    type: 'string'
  };

  return [
    resolveProp(PropsDescription.fieldName, args),
    resolveProp(PropsDescription.control, args),
    resolveProp(PropsDescription.registerOptions, args),
    unitOptions,
    labelKey,
    valueKey,
    customOnChange,
    onValueChange,
    ...numberRules,
    resolveProp(PropsDescription.onlyIntegers, args),
    resolveProp(PropsDescription.nonNegative, args),
    resolveProp(PropsDescription.maxDecimalPlaces, args),
    resolveProp(PropsDescription.stepAmount, args),
    renderValue,
    unitPosition,
    unitWidth,
    unitSelectProps,
    valueInputProps,
    containerProps,
    dividerProps,
    placeholder,
    resolveProp(PropsDescription.required, args),
    resolveProp(PropsDescription.disabled, args),
    resolveProp(PropsDescription.label, args),
    resolveProp(PropsDescription.showLabelAboveFormField, args),
    resolveProp(PropsDescription.formLabelProps, args),
    resolveProp(PropsDescription.hideLabel, args),
    resolveProp(PropsDescription.renderError, args),
    resolveProp(PropsDescription.hideErrorMessage, args),
    resolveProp(PropsDescription.helperText, args),
    resolveProp(PropsDescription.formHelperTextProps, args),
    customIds
  ];
};

export default unitInputRows;
