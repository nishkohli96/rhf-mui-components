import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription, LegacyPropsDescription } from '@site/src/constants';
import { type PropsInfo, type VersionProps } from '@site/src/types';
import { getPropDetailsByVersion } from '@site/src/utils';

const RHFTimePickerPropsTable = ({
  docsVersion,
  muiVersion,
  v1,
  v4AndAbove
}: VersionProps) => {
  const pickerChangeProps = v4AndAbove
    ? [
      PropsDescription.customOnChange_TimePicker,
      PropsDescription.onValueChange_TimePicker
    ]
    : [LegacyPropsDescription.onValueChange_TimePicker_v2_v3];

  const tableRows = [
    PropsDescription.fieldName,
    !v1 ? PropsDescription.control : LegacyPropsDescription.register,
    PropsDescription.registerOptions,
    ...(!v1
      ? [
        PropsDescription.required,
        ...pickerChangeProps,
        getPropDetailsByVersion(PropsDescription.label, {
          docsVersion,
          muiVersion
        })
      ]
      : [
        LegacyPropsDescription.setValue,
        LegacyPropsDescription.onValueChange_Pickers_v1,
        LegacyPropsDescription.label_v1
      ]),
    getPropDetailsByVersion(PropsDescription.showLabelAboveFormField, {
      muiVersion
    }),
    getPropDetailsByVersion(PropsDescription.formLabelProps, {
      docsVersion,
      muiVersion
    }),
    ...(v4AndAbove
      ? [getPropDetailsByVersion(PropsDescription.hideLabel, { muiVersion })]
      : [getPropDetailsByVersion(LegacyPropsDescription.errorMessage, { muiVersion })]
    ),
    ...(v4AndAbove ? [PropsDescription.renderError] : []),
    PropsDescription.hideErrorMessage,
    getPropDetailsByVersion(PropsDescription.helperText, { muiVersion }),
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

export default RHFTimePickerPropsTable;
