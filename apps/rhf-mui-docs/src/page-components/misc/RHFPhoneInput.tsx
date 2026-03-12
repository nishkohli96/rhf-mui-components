import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';
import { type PropsInfo, type VersionProps } from '@site/src/types';
import {
  getPropByDocsAndMuiVersion,
  getPropDetailsByVersion
} from '@site/src/utils';

const RHFPhoneInputPropsTable = ({
  docsVersion,
  muiVersion,
  v1
}: VersionProps) => {
  const tableRows = [
    PropsDescription.fieldName,
    PropsDescription.control,
    PropsDescription.registerOptions,
    ...(!v1 ? [PropsDescription.required] : []),
    PropsDescription.value_PhoneInput,
    PropsDescription.required,
    PropsDescription.onValueChange_PhoneInput,
    ...(!v1
      ? [
        getPropByDocsAndMuiVersion(
          PropsDescription.label,
          docsVersion,
          muiVersion
        )
      ]
      : [PropsDescription.label_v1]),
    getPropDetailsByVersion(
      PropsDescription.showLabelAboveFormField,
      muiVersion
    ),
    getPropByDocsAndMuiVersion(
      PropsDescription.formLabelProps,
      docsVersion,
      muiVersion
    ),
    getPropDetailsByVersion(PropsDescription.helperText, muiVersion),
    getPropDetailsByVersion(PropsDescription.errorMessage, muiVersion),
    PropsDescription.hideErrorMessage,
    getPropByDocsAndMuiVersion(
      PropsDescription.formHelperTextProps,
      docsVersion,
      muiVersion
    ),
    PropsDescription.phoneInputProps
  ];

  return <MarkdownTable rows={tableRows as PropsInfo[]} showType />;
};

export default RHFPhoneInputPropsTable;
