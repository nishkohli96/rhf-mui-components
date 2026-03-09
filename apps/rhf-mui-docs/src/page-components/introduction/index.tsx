import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';
import { type PropsInfo, type VersionProps } from '@site/src/types';
import { getProp } from '@site/src/utils';

const IntroductionPageTable = ({
  v1,
  v4AndAbove,
  docsVersion
}: VersionProps) => {
  const tableRows = [
    PropsDescription.fieldName,
    ...(v1 ? [PropsDescription.register] : []),
    PropsDescription.control,
    PropsDescription.registerOptions,
    ...(!v1
      ? [PropsDescription.required, PropsDescription.disabled]
      : [PropsDescription.setValue]),
    ...(v4AndAbove ? [PropsDescription.customOnChange] : []),
    PropsDescription.onValueChange,
    ...(!v1 ? [PropsDescription.label] : [PropsDescription.label_v1]),
    PropsDescription.showLabelAboveFormField,
    getProp(PropsDescription.formLabelProps, docsVersion),
    getProp(PropsDescription.formControlLabelProps, docsVersion),
    PropsDescription.helperText,
    PropsDescription.errorMessage,
    PropsDescription.hideErrorMessage,
    getProp(PropsDescription.formHelperTextProps, docsVersion)
  ];

  return <MarkdownTable rows={tableRows as PropsInfo[]} />;
};

export default IntroductionPageTable;
