import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';
import { type PropsInfo, type VersionProps } from '@site/src/types';
import { getPropByDocsAndMuiVersion, getPropDetailsByVersion } from '@site/src/utils';

const RHFCountrySelectPropsTable = ({ docsVersion, muiVersion }: VersionProps) => {
  const tableRows = [
    PropsDescription.fieldName,
    PropsDescription.control,
    PropsDescription.registerOptions,
    PropsDescription.countries,
    PropsDescription.preferredCountries,
    PropsDescription.valueKey_CountrySelect,
    PropsDescription.required,
    PropsDescription.onValueChange_CountrySelect,
    PropsDescription.displayFlagOnSelect,
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
    getPropDetailsByVersion(PropsDescription.textFieldProps, muiVersion),
    getPropDetailsByVersion(PropsDescription.ChipProps, muiVersion),
  ];

  return <MarkdownTable rows={tableRows as PropsInfo[]} showType />;
};

export default RHFCountrySelectPropsTable;
