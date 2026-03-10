import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';
import { type PropsInfo, type VersionProps } from '@site/src/types';
import { getPropDetailsByVersion } from '@site/src/utils';

const RHFMultiAutocompletePropsTable = ({
  docsVersion,
  v3_2AndAbove,
  v4AndAbove
}: VersionProps) => {
  const tableRows = [
    PropsDescription.fieldName,
    PropsDescription.control,
    PropsDescription.registerOptions,
    PropsDescription.options_StrOrObj,
    PropsDescription.labelKey,
    PropsDescription.valueKey,
    PropsDescription.selectAllText,
    ...(v3_2AndAbove ? [PropsDescription.hideSelectAllOption] : []),
    PropsDescription.required,
    PropsDescription.onValueChange_MultiAutocomplete,
    getPropDetailsByVersion(PropsDescription.label, docsVersion),
    ...(v4AndAbove ? [PropsDescription.renderOptionLabel] : []),
    PropsDescription.showLabelAboveFormField,
    PropsDescription.formLabelProps,
    PropsDescription.checkboxProps,
    PropsDescription.formControlLabelProps,
    PropsDescription.helperText,
    PropsDescription.errorMessage,
    PropsDescription.hideErrorMessage,
    PropsDescription.formHelperTextProps,
    PropsDescription.textFieldProps,
    PropsDescription.ChipProps
  ];

  return <MarkdownTable rows={tableRows as PropsInfo[]} showType />;
};

export default RHFMultiAutocompletePropsTable;
