import type { PropsInfo, PropsDescriptionArgs } from '@/types';
import { resolveProp } from '@/utils';
import { PropsDescription as P } from '../descriptions/latest';

/** Props reference rows for `MUITagsInput`. */
const tagsInputRows = (args: PropsDescriptionArgs): PropsInfo[] => [
  P.fieldName,
  P.value_TagsInput,
  P.onValueChange_TagsInput,
  P.delimiter,
  P.onTagAdd,
  P.onTagDelete,
  P.onTagPaste,
  P.limitTags_TagsInput,
  P.getLimitTagsText,
  P.maxTags_TagsInput,
  P.renderTagLabel,
  resolveProp(P.ChipProps, args),
  P.label,
  resolveProp(P.showLabelAboveFormField, args),
  P.hideLabel,
  resolveProp(P.formLabelProps, args),
  P.required,
  P.errorMessage,
  P.renderError,
  P.hideErrorMessage,
  resolveProp(P.formHelperTextProps, args),
  P.customIds
];

export default tagsInputRows;
