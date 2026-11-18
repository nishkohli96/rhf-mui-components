import type { PropsInfo, VersionProps } from '@/types';
import { resolveProp } from '@/utils';
import PropsDescription from '../descriptions/props';

/** Props reference rows for `RHFNumberStepper`. */
const numberStepperRows = ({
  docsVersion,
  muiVersion
}: VersionProps): PropsInfo[] => {
  const args = { docsVersion, muiVersion };
  const min: PropsInfo = {
    name: 'min',
    description:
      'Lower bound. Stepping with the buttons or arrow keys stops at it, and an out-of-range value is clamped to it when the field loses focus. `nonNegative` sets it to `0`, and an explicit `min` overrides that.',
    type: 'number'
  };
  const max: PropsInfo = {
    name: 'max',
    description:
      'Upper bound. Stepping stops at it, and an out-of-range value is clamped to it when the field loses focus.',
    type: 'number'
  };
  const renderValue: PropsInfo = {
    name: 'renderValue',
    description:
      'Formats the number for display, for example with thousands separators or a currency prefix. The formatted text is shown only while the field is not focused; the stored value stays a `number`.',
    type: '(value: number | null) => string'
  };
  const decrementIcon: PropsInfo = {
    name: 'decrementIcon',
    description: 'Custom icon for the decrement (`-`) button. Defaults to the Material `Remove` icon.',
    type: 'ReactNode'
  };
  const incrementIcon: PropsInfo = {
    name: 'incrementIcon',
    description: 'Custom icon for the increment (`+`) button. Defaults to the Material `Add` icon.',
    type: 'ReactNode'
  };
  const swapButtons: PropsInfo = {
    name: 'swapButtons',
    description:
      'Swaps both the icons and the behavior of the two buttons: the left button increments and the right button decrements.',
    type: 'boolean'
  };
  const iconButtonProps: PropsInfo = {
    name: 'iconButtonProps',
    description: 'Props forwarded to both the decrement and the increment `IconButton`.',
    type: 'IconButtonProps'
  };
  const caption: PropsInfo = {
    name: 'caption',
    description: 'Content rendered under the value, such as a unit label or an icon.',
    type: 'ReactNode'
  };
  const captionProps: PropsInfo = {
    name: 'captionProps',
    description:
      'Props forwarded to the `Box` that wraps `caption`, for example a custom `sx`. Merged with the base caption styles. Has no effect when `caption` is not provided.',
    type: 'BoxProps'
  };

  return [
    resolveProp(PropsDescription.fieldName, args),
    resolveProp(PropsDescription.control, args),
    resolveProp(PropsDescription.registerOptions, args),
    resolveProp(PropsDescription.customOnChange_Inputs, args),
    resolveProp(PropsDescription.onValueChange_Inputs, args),
    min,
    max,
    resolveProp(PropsDescription.onlyIntegers, args),
    resolveProp(PropsDescription.nonNegative, args),
    resolveProp(PropsDescription.maxDecimalPlaces, args),
    resolveProp(PropsDescription.stepAmount, args),
    renderValue,
    decrementIcon,
    incrementIcon,
    swapButtons,
    iconButtonProps,
    caption,
    captionProps,
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

export default numberStepperRows;
