import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';

const RHFCountrySelectPropsTable = () => {
  const tableRows = [
    PropsDescription.fieldName,
    PropsDescription.control,
    PropsDescription.registerOptions,
    PropsDescription.label,
    PropsDescription.countries,
    PropsDescription.preferredCountries,
    PropsDescription.valueKey_CountrySelect,
    PropsDescription.onValueChange_CountrySelect,
    PropsDescription.showLabelAboveFormField,
    PropsDescription.formLabelProps,
    PropsDescription.helperText,
    PropsDescription.errorMessage,
    PropsDescription.hideErrorMessage,
    PropsDescription.formHelperTextProps,
    PropsDescription.textFieldProps_CountrySelect
  ];

  return (
    <MarkdownTable rows={tableRows} showType/>
  );
};

export default RHFCountrySelectPropsTable;
