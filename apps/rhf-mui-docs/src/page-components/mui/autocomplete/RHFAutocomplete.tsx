import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription, LegacyPropsDescription } from '@site/src/constants';
import { type PropsInfo, type VersionProps } from '@site/src/types';
import { getPropDetailsByVersion } from '@site/src/utils';

const RHFAutocompletePropsTable = ({
  docsVersion,
  muiVersion,
  v4AndAbove
}: VersionProps) => {
  const onValueChange = v4AndAbove
    ? [
      PropsDescription.customOnChange_Autocomplete,
      PropsDescription.onValueChange_Autocomplete
    ]
    : [LegacyPropsDescription.onValueChange_Autocomplete_v2_v3];

  const tableRows = [
    PropsDescription.fieldName,
    PropsDescription.control,
    PropsDescription.registerOptions,
    PropsDescription.options_StrOrObj,
    PropsDescription.labelKey,
    PropsDescription.valueKey,
    PropsDescription.multiple,
    ...(v4AndAbove
      ? [PropsDescription.freeSolo]
      : []
    ),
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
      : []
    ),
    PropsDescription.required,
    getPropDetailsByVersion(PropsDescription.helperText, { muiVersion }),
    ...(!v4AndAbove
      ? [getPropDetailsByVersion(PropsDescription.errorMessage, { muiVersion })]
      : []
    ),
    PropsDescription.hideErrorMessage,
    getPropDetailsByVersion(PropsDescription.formHelperTextProps, {
      docsVersion,
      muiVersion
    }),
    getPropDetailsByVersion(PropsDescription.textFieldProps, { muiVersion }),
    ...(v4AndAbove
      ? [
          getPropDetailsByVersion(PropsDescription.ChipProps_Autocomplete, { muiVersion }),
          PropsDescription.customIds
        ]
      : []
    )
  ];

  return (
    <MarkdownTable
      rows={tableRows as PropsInfo[]}
      showType
    />
  );
};

export default RHFAutocompletePropsTable;
