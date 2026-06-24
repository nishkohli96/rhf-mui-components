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
      PropsDescription.customOnChange_MultiAutocompleteObject,
      PropsDescription.onValueChange_MultiAutocompleteObject
    ]
    : [LegacyPropsDescription.onValueChange_MultiAutocompleteObject_v3];

  const tableRows = [
    PropsDescription.fieldName,
    PropsDescription.control,
    PropsDescription.registerOptions,
    PropsDescription.options_Obj,
    PropsDescription.labelKey_Obj,
    PropsDescription.valueKey_Obj,
    ...onValueChange,
    PropsDescription.selectAllText,
    PropsDescription.hideSelectAllOption_MultiAutocompleteObject,
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
        PropsDescription.renderOptionLabel_MultiAutocomplete
      ]
      : []),
    getPropDetailsByVersion(PropsDescription.checkboxProps_MultiAutocomplete, { muiVersion }),
    getPropDetailsByVersion(PropsDescription.formControlLabelProps, {
      docsVersion,
      muiVersion
    }),
    PropsDescription.required,
    getPropDetailsByVersion(PropsDescription.helperText, { muiVersion }),
    ...(v4AndAbove
      ? []
      : [getPropDetailsByVersion(LegacyPropsDescription.errorMessage, { muiVersion })]
    ),
    PropsDescription.hideErrorMessage,
    getPropDetailsByVersion(PropsDescription.formHelperTextProps, {
      docsVersion,
      muiVersion
    }),
    getPropDetailsByVersion(PropsDescription.textFieldProps, { muiVersion }),
    getPropDetailsByVersion(PropsDescription.ChipProps_Autocomplete, { muiVersion }),
    ...(v4AndAbove ? [PropsDescription.customIds] : [])
  ];

  return (
    <MarkdownTable rows={tableRows as PropsInfo[]} showType/>
  );
};

export default RHFMultiAutocompleteObjectPropsTable;
