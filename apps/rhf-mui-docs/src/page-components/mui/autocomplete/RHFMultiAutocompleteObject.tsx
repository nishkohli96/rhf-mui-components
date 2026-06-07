import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription, LegacyPropsDescription } from '@site/src/constants';
import { type PropsInfo, type VersionProps } from '@site/src/types';
import { getPropDetailsByVersion } from '@site/src/utils';

const RHFMultiAutocompleteObjectPropsTable = ({
  v4AndAbove,
  docsVersion,
  muiVersion
}: VersionProps) => {
  const onValueChange = v4AndAbove
    ? [
      PropsDescription.onValueChange_MultiAutocompleteObject,
      PropsDescription.customOnChange_MultiAutocompleteObject
    ]
    : [LegacyPropsDescription.onValueChange_MultiAutocompleteObject_v3]
  const tableRows = [
    PropsDescription.fieldName,
    PropsDescription.control,
    PropsDescription.registerOptions,
    PropsDescription.options_Obj,
    PropsDescription.labelKey_Obj,
    PropsDescription.valueKey_Obj,
    PropsDescription.selectAllText,
    PropsDescription.hideSelectAllOption_MultiAutocompleteObject,
    PropsDescription.required,
    ...onValueChange,
    PropsDescription.label,
    PropsDescription.showLabelAboveFormField,
    ...(v4AndAbove
      ? [getPropDetailsByVersion(PropsDescription.hideLabel, { muiVersion })]
      : []),
    PropsDescription.formLabelProps,
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

  return (
    <MarkdownTable rows={tableRows as PropsInfo[]} showType/>
  );
};

export default RHFMultiAutocompleteObjectPropsTable;
