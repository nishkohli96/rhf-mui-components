import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';
import { type PropsInfo, type VersionProps } from '@site/src/types';
import { getPropByDocsAndMuiVersion, getPropDetailsByVersion } from '@site/src/utils';

const RHFMultiAutocompletePropsTable = ({
  docsVersion,
  muiVersion,
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
    getPropDetailsByVersion(
      PropsDescription.showLabelAboveFormField,
      muiVersion
    ),
    getPropByDocsAndMuiVersion(
      PropsDescription.formLabelProps,
      docsVersion,
      muiVersion
    ),
    getPropDetailsByVersion(PropsDescription.checkboxProps, muiVersion),
    getPropByDocsAndMuiVersion(
      PropsDescription.formControlLabelProps,
      docsVersion,
      muiVersion
    ),
    PropsDescription.helperText,
    getPropDetailsByVersion(PropsDescription.errorMessage, muiVersion),
    PropsDescription.hideErrorMessage,
    getPropByDocsAndMuiVersion(
      PropsDescription.formHelperTextProps,
      docsVersion,
      muiVersion
    ),
    getPropDetailsByVersion(PropsDescription.textFieldProps, muiVersion),
    getPropDetailsByVersion(PropsDescription.ChipProps, muiVersion),
  ];

  return <MarkdownTable rows={tableRows as PropsInfo[]} showType />;
};

export default RHFMultiAutocompletePropsTable;
