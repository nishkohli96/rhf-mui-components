import type { PropsInfo, VersionProps } from '@/types';
import { resolveProp } from '@/utils';
import PropsDescription from '../descriptions/props';
import LegacyPropsDescription from '../descriptions/legacy-props';

/** Props reference rows for `RHFTagsInput`. Added in v2 — no v1 rows. */
const tagsInputRows = ({
  docsVersion,
  muiVersion,
  v4AndAbove
}: VersionProps): PropsInfo[] => {
  const args = { docsVersion, muiVersion };
  const onValueChange = v4AndAbove
    ? PropsDescription.onValueChange_tagsInput
    : LegacyPropsDescription.onValueChange_tagsInput_v2_v3;

  return [
    resolveProp(PropsDescription.fieldName, args),
    resolveProp(PropsDescription.control, args),
    resolveProp(PropsDescription.registerOptions, args),
    resolveProp(onValueChange, args),
    ...(v4AndAbove
      ? [
        resolveProp(PropsDescription.onTagAdd, args),
        resolveProp(PropsDescription.onTagDelete, args),
        resolveProp(PropsDescription.onTagPaste, args),
        resolveProp(PropsDescription.delimiter, args),
        resolveProp(PropsDescription.maxTags, args)
      ]
      : []),
    resolveProp(PropsDescription.label, args),
    resolveProp(PropsDescription.showLabelAboveFormField, args),
    resolveProp(PropsDescription.formLabelProps, args),
    ...(v4AndAbove ? [resolveProp(PropsDescription.hideLabel, args)] : []),
    resolveProp(PropsDescription.ChipProps_TagsInput, args),
    resolveProp(PropsDescription.limitTags, args),
    resolveProp(PropsDescription.getLimitTagsText, args),
    ...(v4AndAbove
      ? [resolveProp(PropsDescription.renderError, args)]
      : [resolveProp(LegacyPropsDescription.errorMessage, args)]),
    resolveProp(PropsDescription.hideErrorMessage, args),
    resolveProp(PropsDescription.helperText, args),
    resolveProp(PropsDescription.formHelperTextProps, args),
    ...(v4AndAbove ? [resolveProp(PropsDescription.customIds, args)] : [])
  ];
};

export default tagsInputRows;
