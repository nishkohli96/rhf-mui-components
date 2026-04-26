import MarkdownTable from '@site/src/components/markdown-table';
import { LegacyPropsDescription, PropsDescription } from '@site/src/constants';
import { type VersionProps, type PropsInfo } from '@site/src/types';
import { getPropDetailsByVersion } from '@site/src/utils';

const RHFAutocompleteObjectPropsTable = ({
  docsVersion,
  muiVersion,
  v4AndAbove
}: VersionProps) => {
  const onValueChange = v4AndAbove
    ? [
      PropsDescription.onValueChange_AutocompleteObject,
      PropsDescription.customOnChange_AutocompleteObject
    ]
    : [LegacyPropsDescription.onValueChange_AutocompleteObject_v3];

  const tableRows = [
    PropsDescription.fieldName,
    PropsDescription.control,
    PropsDescription.registerOptions,
    PropsDescription.options_Obj,
    PropsDescription.labelKey_Obj,
    PropsDescription.valueKey_Obj,
    PropsDescription.required,
    PropsDescription.multiple,
    ...onValueChange,
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
      ? [getPropDetailsByVersion(PropsDescription.hideLabel, { muiVersion })]
      : [
        getPropDetailsByVersion(PropsDescription.errorMessage, { muiVersion })
      ]),
    getPropDetailsByVersion(PropsDescription.helperText, { muiVersion }),
    PropsDescription.hideErrorMessage,
    getPropDetailsByVersion(PropsDescription.formHelperTextProps, {
      docsVersion,
      muiVersion
    }),
    getPropDetailsByVersion(PropsDescription.textFieldProps, { muiVersion }),
    ...(v4AndAbove ? [PropsDescription.customIds] : [])
  ];

  return (
    <MarkdownTable rows={tableRows as PropsInfo[]} showType/>
  );
};

export default RHFAutocompleteObjectPropsTable;
