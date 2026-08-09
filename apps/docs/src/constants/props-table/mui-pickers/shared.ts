import type { PropsInfo, PropsDescriptionArgs, VersionProps } from '@/types';
import { resolveProp } from '@/utils';
import PropsDescription from '../descriptions/props';
import LegacyPropsDescription from '../descriptions/legacy-props';

type MaybeVersionedProp = PropsInfo | ((args: PropsDescriptionArgs) => PropsInfo);

/**
 * Every picker family ships four variants — responsive, desktop, mobile and
 * static — that all share one props surface. Only `customOnChange`/
 * `onValueChange` differ between families, so each family's row-builder just
 * calls this factory with its own set of props.
 */
export const pickerRows = (
  customOnChange: MaybeVersionedProp,
  onValueChange: MaybeVersionedProp,
  onValueChange_v2_v3: MaybeVersionedProp
) => ({ docsVersion, muiVersion, v1, v4AndAbove }: VersionProps): PropsInfo[] => {
  const args = { docsVersion, muiVersion };
  const binding = !v1 ? PropsDescription.control : LegacyPropsDescription.register;
  const pickerChangeProps = v4AndAbove
    ? [resolveProp(customOnChange, args), resolveProp(onValueChange, args)]
    : [resolveProp(onValueChange_v2_v3, args)];

  return [
    resolveProp(PropsDescription.fieldName, args),
    resolveProp(binding, args),
    resolveProp(PropsDescription.registerOptions, args),
    ...(!v1
      ? [
        resolveProp(PropsDescription.required, args),
        ...pickerChangeProps,
        resolveProp(PropsDescription.label, args)
      ]
      : [
        resolveProp(LegacyPropsDescription.setValue, args),
        resolveProp(LegacyPropsDescription.onValueChange_Pickers_v1, args),
        resolveProp(LegacyPropsDescription.label_v1, args)
      ]),
    resolveProp(PropsDescription.showLabelAboveFormField, args),
    resolveProp(PropsDescription.formLabelProps, args),
    ...(v4AndAbove
      ? [
        resolveProp(PropsDescription.hideLabel, args),
        resolveProp(PropsDescription.renderError, args)
      ]
      : [resolveProp(LegacyPropsDescription.errorMessage, args)]),
    resolveProp(PropsDescription.hideErrorMessage, args),
    resolveProp(PropsDescription.helperText, args),
    resolveProp(PropsDescription.formHelperTextProps, args),
    ...(v4AndAbove ? [resolveProp(PropsDescription.customIds, args)] : [])
  ];
};
