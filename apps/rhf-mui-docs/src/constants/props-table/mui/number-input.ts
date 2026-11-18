import type { PropsInfo, VersionProps } from '@/types';
import { resolveProp } from '@/utils';
import PropsDescription from '../descriptions/props';
import LegacyPropsDescription from '../descriptions/legacy-props';

/**
 * `min`, `max` and `renderValue` come from `mui-components` v2.2, so they exist
 * in the current (v5) docs only.
 */
const numberBoundsRows: PropsInfo[] = [
  {
    name: 'min',
    description:
      'Lower bound. Stepping with the arrow keys or markers stops at it, and an out-of-range value is clamped to it when the field loses focus. `nonNegative` sets it to `0`, and an explicit `min` overrides that.',
    type: 'number'
  },
  {
    name: 'max',
    description:
      'Upper bound. Stepping stops at it, and an out-of-range value is clamped to it when the field loses focus.',
    type: 'number'
  },
  {
    name: 'renderValue',
    description:
      'Formats the number for display, for example with thousands separators or a currency prefix. The field switches to `type="text"` and shows the formatted text only while it is not focused; the stored value stays a `number`.',
    type: '(value: number | null) => string'
  }
];

/** Props reference rows for `RHFNumberInput`. Added in v2.1 — no v1 rows. */
const numberInputRows = ({
  docsVersion,
  muiVersion,
  v4AndAbove
}: VersionProps): PropsInfo[] => {
  const args = { docsVersion, muiVersion };
  const valueChange = resolveProp(
    v4AndAbove
      ? PropsDescription.onValueChange_Inputs
      : LegacyPropsDescription.onValueChange_Inputs_v2_v3,
    args
  );

  return [
    resolveProp(PropsDescription.fieldName, args),
    resolveProp(PropsDescription.control, args),
    resolveProp(PropsDescription.registerOptions, args),
    ...(v4AndAbove ? [resolveProp(PropsDescription.customOnChange_Inputs, args)] : []),
    valueChange,
    ...(v4AndAbove
      ? [
        resolveProp(PropsDescription.hideLabel, args),
        resolveProp(PropsDescription.onlyIntegers, args),
        resolveProp(PropsDescription.nonNegative, args),
        resolveProp(PropsDescription.maxDecimalPlaces, args),
        resolveProp(PropsDescription.stepAmount, args)
      ]
      : []),
    ...(!docsVersion ? numberBoundsRows : []),
    resolveProp(PropsDescription.label, args),
    resolveProp(PropsDescription.showLabelAboveFormField, args),
    resolveProp(PropsDescription.formLabelProps, args),
    resolveProp(PropsDescription.showMarkers, args),
    ...(v4AndAbove
      ? [resolveProp(PropsDescription.renderError, args)]
      : [resolveProp(LegacyPropsDescription.errorMessage, args)]),
    resolveProp(PropsDescription.hideErrorMessage, args),
    resolveProp(PropsDescription.helperText, args),
    resolveProp(PropsDescription.formHelperTextProps, args),
    ...(v4AndAbove ? [resolveProp(PropsDescription.customIds, args)] : [])
  ];
};

export default numberInputRows;
