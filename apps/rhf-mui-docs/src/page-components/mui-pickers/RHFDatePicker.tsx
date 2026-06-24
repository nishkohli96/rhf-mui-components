import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription, LegacyPropsDescription } from '@site/src/constants';
import { type PropsInfo, type VersionProps } from '@site/src/types';
import { getPropDetailsByVersion } from '@site/src/utils';

const RHFDatePickerPropsTable = ({
  docsVersion,
  muiVersion,
  v1,
  v4AndAbove
}: VersionProps) => {
  const pickerChangeProps = v4AndAbove
    ? [
      PropsDescription.customOnChange_DatePicker,
      PropsDescription.onValueChange_DatePicker
    ]
    : [LegacyPropsDescription.onValueChange_DatePicker_v2_v3];

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
        }),
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
      : []
    ),
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
    ...(v4AndAbove ? [PropsDescription.customIds] : [])
  ];

  return (
    <MarkdownTable
      rows={tableRows as PropsInfo[]}
      showType
    />
  );
};

export default RHFDatePickerPropsTable;
