import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription, LegacyPropsDescription } from '@site/src/constants';
import { type PropsInfo, type VersionProps } from '@site/src/types';
import { getPropDetailsByVersion } from '@site/src/utils';

const RHFPhoneInputPropsTable = ({
  docsVersion,
  muiVersion,
  v1,
  v4AndAbove
}: VersionProps) => {
  const valueChangeProps = v4AndAbove
    ? [
      PropsDescription.customOnChange_PhoneInput,
      PropsDescription.onValueChange_PhoneInput,
      PropsDescription.searchCountryProps
    ]
    : [LegacyPropsDescription.onValueChange_PhoneInput_v2_v3];

  const tableRows = [
    PropsDescription.fieldName,
    PropsDescription.control,
    PropsDescription.registerOptions,
    ...(!v1
      ? [
        ...valueChangeProps,
        getPropDetailsByVersion(PropsDescription.label, {
          docsVersion,
          muiVersion
        })
      ]
      : [
        LegacyPropsDescription.value_PhoneInput,
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
    ...(!v1 ? [PropsDescription.required] : []),
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
    PropsDescription.phoneInputProps,
    ...(v4AndAbove ?
      [
      PropsDescription.disableDropdown,
      PropsDescription.customIds
    ] : []
  )
  ];

  return (
    <MarkdownTable
      rows={tableRows as PropsInfo[]}
      showType
    />
  );
};

export default RHFPhoneInputPropsTable;
