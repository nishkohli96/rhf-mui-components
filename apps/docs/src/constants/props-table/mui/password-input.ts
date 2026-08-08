import type { PropsInfo, PropsDescriptionArgs, DocsVersion } from '@/types';
import { resolveProp } from '@/utils';
import { PropsDescription as P } from '../descriptions/latest';
import { PropsDescription_v1 as Pv1 } from '../descriptions/v1';

/** Props reference rows for `MUIPasswordInput`. */
const passwordInputRows = (
  args: PropsDescriptionArgs,
  docsVersion?: DocsVersion
): PropsInfo[] => {
  const v1 = docsVersion === 1;
  return [
    P.fieldName,
    P.value_Input,
    P.onValueChange_Inputs,
    P.showPasswordIcon,
    P.hidePasswordIcon,
    ...(!v1
      ? [resolveProp(P.iconButtonProps, args)]
      : [resolveProp(Pv1.iconButtonProps, args)]),
    P.readOnly_PasswordInput,
    P.label,
    resolveProp(P.showLabelAboveFormField, args),
    resolveProp(P.formLabelProps, args),
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

export default passwordInputRows;
