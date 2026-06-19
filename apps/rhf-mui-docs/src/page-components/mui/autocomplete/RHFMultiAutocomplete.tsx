import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription, LegacyPropsDescription } from '@site/src/constants';
import { type PropsInfo, type VersionProps } from '@site/src/types';
import { getPropDetailsByVersion } from '@site/src/utils';

const RHFMultiAutocompletePropsTable = ({
  docsVersion,
  muiVersion,
  v3_2AndAbove,
  v4AndAbove
}: VersionProps) => {
  const onValueChangeProp = v4AndAbove
    ? PropsDescription.onValueChange_MultiAutocomplete
    : LegacyPropsDescription.onValueChange_MultiAutocomplete_v2_v3;

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
    onValueChangeProp,
    getPropDetailsByVersion(PropsDescription.label, {
      docsVersion,
      muiVersion
    }),
    ...(v4AndAbove
      ? [
        PropsDescription.renderOptionLabel_MultiAutocomplete,
        PropsDescription.renderSelectAllOptionLabel
      ]
      : []),
    getPropDetailsByVersion(PropsDescription.showLabelAboveFormField, {
      muiVersion
    }),
    getPropDetailsByVersion(PropsDescription.formLabelProps, {
      docsVersion,
      muiVersion
    }),
    ...(v4AndAbove
      ? [getPropDetailsByVersion(PropsDescription.hideLabel, { muiVersion })]
      : []),
    getPropDetailsByVersion(PropsDescription.checkboxProps, { muiVersion }),
    getPropDetailsByVersion(PropsDescription.formControlLabelProps, {
      docsVersion,
      muiVersion
    }),
    getPropDetailsByVersion(PropsDescription.helperText, { muiVersion }),
    ...(v4AndAbove
      ? []
      : [getPropDetailsByVersion(PropsDescription.errorMessage, { muiVersion })]
    ),
    PropsDescription.hideErrorMessage,
    getPropDetailsByVersion(PropsDescription.formHelperTextProps, {
      docsVersion,
      muiVersion
    }),
    getPropDetailsByVersion(PropsDescription.textFieldProps, { muiVersion }),
    getPropDetailsByVersion(PropsDescription.ChipProps, { muiVersion }),
    ...(v4AndAbove ? [PropsDescription.customIds] : [])
  ];

  return <MarkdownTable rows={tableRows as PropsInfo[]} showType />;
};

export default RHFMultiAutocompletePropsTable;
