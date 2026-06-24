import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription, LegacyPropsDescription } from '@site/src/constants';
import { type PropsInfo, type VersionProps } from '@site/src/types';
import { getPropDetailsByVersion } from '@site/src/utils';

const RHFCountrySelectPropsTable = ({
  docsVersion,
  muiVersion,
  v4AndAbove
}: VersionProps) => {
  const valueKey = v4AndAbove
    ? PropsDescription.valueKey_CountrySelect
    : LegacyPropsDescription.valueKey_CountrySelect_v2_v3;
  const valueChangeProps = v4AndAbove
    ? [
      PropsDescription.customOnChange_CountrySelect,
      PropsDescription.onValueChange_CountrySelect
    ]
    : [LegacyPropsDescription.onValueChange_CountrySelect_v2_v3];

  const tableRows = [
    PropsDescription.fieldName,
    PropsDescription.control,
    PropsDescription.registerOptions,
    PropsDescription.countries,
    PropsDescription.multiple_CountrySelect,
    PropsDescription.preferredCountries,
    valueKey,
    ...valueChangeProps,
    getPropDetailsByVersion(PropsDescription.label, {
      docsVersion,
      muiVersion
    }),
    getPropDetailsByVersion(PropsDescription.showLabelAboveFormField, {
      muiVersion
    }),
    getPropDetailsByVersion(PropsDescription.formLabelProps, {
      docsVersion,
      muiVersion
    }),
    ...(v4AndAbove
      ? [
        getPropDetailsByVersion(PropsDescription.hideLabel, { muiVersion }),
        PropsDescription.renderOptionLabel_CountrySelect
      ]
      : [PropsDescription.displayFlagOnSelect]),
    PropsDescription.required,
    getPropDetailsByVersion(PropsDescription.helperText, { muiVersion }),
    ...(!v4AndAbove ? [getPropDetailsByVersion(LegacyPropsDescription.errorMessage, { muiVersion })] : []),
    PropsDescription.hideErrorMessage,
    getPropDetailsByVersion(PropsDescription.formHelperTextProps, {
      docsVersion,
      muiVersion
    }),
    getPropDetailsByVersion(PropsDescription.textFieldProps, { muiVersion }),
    getPropDetailsByVersion(PropsDescription.ChipProps_Autocomplete, { muiVersion }),
    ...(v4AndAbove ? [PropsDescription.customIds] : [])
  ];

  return <MarkdownTable rows={tableRows as PropsInfo[]} showType />;
};

export default RHFCountrySelectPropsTable;
