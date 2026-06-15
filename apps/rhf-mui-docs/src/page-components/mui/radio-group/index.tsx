import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription, LegacyPropsDescription } from '@site/src/constants';
import { type PropsInfo, type VersionProps } from '@site/src/types';
import { getPropDetailsByVersion } from '@site/src/utils';

const RHFRadioGroupPropsTable = ({
  docsVersion,
  muiVersion,
  v1,
  v4AndAbove
}: VersionProps) => {
  const onValueChange = v4AndAbove
    ? PropsDescription.onValueChange_RadioGroup
    : LegacyPropsDescription.onValueChange_RadioGroup_v2_v3;

  const tableRows = [
    PropsDescription.fieldName,
    PropsDescription.control,
    ...(!v1 ? [PropsDescription.registerOptions] : []),
    PropsDescription.options_StrOrObj,
    PropsDescription.labelKey,
    PropsDescription.valueKey,
    ...(!v1 ? [PropsDescription.required] : []),
    ...(v4AndAbove ? [PropsDescription.customOnChange_RadioGroup] : []),
    ...(!v1
      ? [
        onValueChange,
        PropsDescription.disabled,
        ...(v4AndAbove
          ? [
            PropsDescription.renderOption,
            PropsDescription.getOptionDisabled
          ]
          : []),
        getPropDetailsByVersion(PropsDescription.label, {
          docsVersion,
          muiVersion
        })
      ]
      : [
        LegacyPropsDescription.onValueChange_CheckboxGroup_v1,
        LegacyPropsDescription.label_v1
      ]),
    PropsDescription.showLabelAboveFormField_Default,
    getPropDetailsByVersion(PropsDescription.formLabelProps, {
      docsVersion,
      muiVersion
    }),
    getPropDetailsByVersion(PropsDescription.radioProps, { muiVersion }),
    getPropDetailsByVersion(PropsDescription.formControlLabelProps, {
      docsVersion,
      muiVersion
    }),
    getPropDetailsByVersion(PropsDescription.helperText, { muiVersion }),
    ...(!v4AndAbove ? [getPropDetailsByVersion(PropsDescription.errorMessage, { muiVersion })] : []),
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

export default RHFRadioGroupPropsTable;
