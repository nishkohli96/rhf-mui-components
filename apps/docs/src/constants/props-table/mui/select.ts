import type { PropsInfo, VersionProps } from '@/types';
import { resolveProp } from '@/utils';
import { PropsDescription as P } from '../descriptions/latest';
import { PropsDescription_v1 as Pv1 } from '../descriptions/v1';

/** Props reference rows for `MUISelect`. */
const selectRows = ({
  muiVersion,
  docsVersion
}: VersionProps): PropsInfo[] => {
  const args = { docsVersion, muiVersion };
  const v1 = docsVersion === 1;

  return [
    P.fieldName,
    P.options,
    P.labelKey,
    P.valueKey,
    P.multiple,
    P.value_Select,
    P.onValueChange_Select,
    ...(!v1
      ? [resolveProp(P.menuItemProps, args)]
      : [resolveProp(Pv1.menuItemProps, args)]
    ),
    P.renderOptionLabel,
    P.getOptionDisabled,
    P.showDefaultOption,
    P.defaultOptionText,
    P.placeholder_Select,
    P.label,
    resolveProp(P.showLabelAboveFormField, args),
    resolveProp(P.formLabelProps, args),
    ...(!v1
      ? [resolveProp(P.inputLabelProps, args)]
      : [resolveProp(Pv1.inputLabelProps, args)]
    ),
    P.hideLabel,
    P.required,
    P.errorMessage,
    P.renderError,
    P.hideErrorMessage,
    resolveProp(P.helperText, args),
    resolveProp(P.formHelperTextProps, args),
    P.customIds
  ];
};

export default selectRows;
