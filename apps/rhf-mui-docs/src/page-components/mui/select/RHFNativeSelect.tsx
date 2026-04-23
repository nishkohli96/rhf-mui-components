import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription, LegacyPropsDescription } from '@site/src/constants';
import { type PropsInfo, type VersionProps } from '@site/src/types';
import { getPropDetailsByVersion } from '@site/src/utils';

const RHFNativeSelectPropsTable = ({
  docsVersion,
  muiVersion,
  v1,
  v4AndAbove
}: VersionProps) => {
  const onValueChangeProp = v4AndAbove
    ? PropsDescription.onValueChange_NativeSelect
    : v1
      ? LegacyPropsDescription.onValueChange_Default_v1
      : LegacyPropsDescription.onValueChange_NativeSelect_v2_v3;

  const tableRows = [
    PropsDescription.fieldName,
    ...(!v1 ? [PropsDescription.control] : [LegacyPropsDescription.register]),
    PropsDescription.registerOptions,
    PropsDescription.options,
    PropsDescription.labelKey,
    PropsDescription.valueKey,
    ...(v4AndAbove
      ? [
        PropsDescription.renderOption,
        PropsDescription.getOptionDisabled,
        PropsDescription.customOnChange_NativeSelect
      ]
      : []),
    onValueChangeProp,
    ...(!v1
      ? []
      : [
        LegacyPropsDescription.defaultValue,
        PropsDescription.showDefaultOption,
        LegacyPropsDescription.label_v1
      ]),
    PropsDescription.defaultOptionText,
    ...(!v1
      ? [
        getPropDetailsByVersion(PropsDescription.label, {
          docsVersion,
          muiVersion
        }),
        PropsDescription.showLabelAboveFormField_Default,
        getPropDetailsByVersion(PropsDescription.formLabelProps, {
          docsVersion,
          muiVersion
        }),
        getPropDetailsByVersion(PropsDescription.helperText, { muiVersion })
      ]
      : [LegacyPropsDescription.label_v1]),
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

  return <MarkdownTable rows={tableRows as PropsInfo[]} showType />;
};

export default RHFNativeSelectPropsTable;
