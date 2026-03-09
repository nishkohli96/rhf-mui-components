import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';
import { type PropsInfo, type VersionProps } from '@site/src/types';
import { getPropDetailsByVersion } from '@site/src/utils';

const RHFCheckboxPropsTable = ({
  docsVersion,
  v1,
  v4AndAbove
}: VersionProps) => {
  const tableRows = [
    PropsDescription.fieldName,
    PropsDescription.control,
    ...(!v1 ? [PropsDescription.registerOptions] : []),
    ...(v4AndAbove ? [PropsDescription.customOnChange_Cbx_Switch] : []),
    ...(!v1
      ? [PropsDescription.onValueChange_Checkbox, PropsDescription.label]
      : [
        PropsDescription.onValueChange_Checkbox_v1,
        PropsDescription.label_v1
      ]),
    getPropDetailsByVersion(PropsDescription.formControlLabelProps, docsVersion),
    PropsDescription.helperText,
    PropsDescription.errorMessage,
    PropsDescription.hideErrorMessage,
    getPropDetailsByVersion(PropsDescription.formHelperTextProps, docsVersion),
  ];

  return <MarkdownTable rows={tableRows as PropsInfo[]} showType />;
};

export default RHFCheckboxPropsTable;
