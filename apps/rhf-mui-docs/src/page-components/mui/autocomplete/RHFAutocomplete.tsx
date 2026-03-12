import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';
import { type PropsInfo, type VersionProps } from '@site/src/types';
import {
  getPropByDocsAndMuiVersion,
  getPropDetailsByVersion
} from '@site/src/utils';

const RHFAutocompletePropsTable = ({
  docsVersion,
  muiVersion
}: VersionProps) => {
  const tableRows = [
    PropsDescription.fieldName,
    PropsDescription.control,
    PropsDescription.registerOptions,
    PropsDescription.options_StrOrObj,
    PropsDescription.labelKey,
    PropsDescription.valueKey,
    PropsDescription.required,
    PropsDescription.multiple,
    PropsDescription.onValueChange_Autocomplete,
    getPropDetailsByVersion(PropsDescription.label, docsVersion),
    getPropDetailsByVersion(
      PropsDescription.showLabelAboveFormField,
      muiVersion
    ),
    getPropByDocsAndMuiVersion(
      PropsDescription.formLabelProps,
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
    getPropDetailsByVersion(PropsDescription.textFieldProps, muiVersion)
  ];

  return <MarkdownTable rows={tableRows as PropsInfo[]} showType />;
};

export default RHFAutocompletePropsTable;
