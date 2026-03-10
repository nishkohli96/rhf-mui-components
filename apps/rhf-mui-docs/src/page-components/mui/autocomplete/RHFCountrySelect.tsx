import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';
import { type PropsInfo, type VersionProps } from '@site/src/types';
import { getPropDetailsByVersion } from '@site/src/utils';

const RHFCountrySelectPropsTable = ({ docsVersion }: VersionProps) => {
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
    PropsDescription.showLabelAboveFormField,
    PropsDescription.formLabelProps,
    PropsDescription.helperText,
    PropsDescription.errorMessage,
    PropsDescription.hideErrorMessage,
    PropsDescription.formHelperTextProps,
    PropsDescription.textFieldProps,
    PropsDescription.ChipProps
  ];

  return <MarkdownTable rows={tableRows as PropsInfo[]} showType />;
};

export default RHFCountrySelectPropsTable;
