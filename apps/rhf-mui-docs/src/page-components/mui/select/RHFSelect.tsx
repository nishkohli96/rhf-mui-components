import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription, LegacyPropsDescription } from '@site/src/constants';
import { type PropsInfo, type VersionProps } from '@site/src/types';
import { getPropDetailsByVersion } from '@site/src/utils';

const RHFSelectPropsTable = ({
  docsVersion,
  muiVersion,
  v1,
  v3_1AndAbove,
  v4AndAbove
}: VersionProps) => {
  const binding = !v1
    ? PropsDescription.control
    : LegacyPropsDescription.register;

  let onValueChangeProp;
  if (v4AndAbove) {
    onValueChangeProp = PropsDescription.onValueChange_Select;
  } else if (v1) {
    onValueChangeProp = LegacyPropsDescription.onValueChange_Select_v1;
  } else {
    onValueChangeProp = LegacyPropsDescription.onValueChange_Select_v2_v3;
  }

  const tableRows = [
    PropsDescription.fieldName,
    binding,
    PropsDescription.registerOptions,
    PropsDescription.options,
    PropsDescription.labelKey,
    PropsDescription.valueKey,
    ...(v4AndAbove
      ? [
        PropsDescription.renderOption,
        PropsDescription.getOptionDisabled,
        PropsDescription.customOnChange_Select
      ]
      : []),
    onValueChangeProp,
    ...(!v1 ? [] : [LegacyPropsDescription.defaultValue]),
    PropsDescription.showDefaultOption,
    PropsDescription.defaultOptionText,
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
      : []),
    ...(v3_1AndAbove ? [PropsDescription.placeholder_Select] : []),
    getPropDetailsByVersion(PropsDescription.helperText, { muiVersion }),
    ...(!v4AndAbove
      ? [getPropDetailsByVersion(PropsDescription.errorMessage, { muiVersion })]
      : []),
    PropsDescription.hideErrorMessage,
    getPropDetailsByVersion(PropsDescription.formHelperTextProps, {
      docsVersion,
      muiVersion
    }),
    ...(v4AndAbove ? [PropsDescription.customIds] : [])
  ];

  return (
    <MarkdownTable
      rows={tableRows as PropsInfo[]}
      showType
    />
  );
};

export default RHFSelectPropsTable;
