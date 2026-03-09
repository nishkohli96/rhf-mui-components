import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';
import { PropsInfo, type VersionProps } from '@site/src/types';
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
    PropsDescription.formControlLabelProps,
    PropsDescription.helperText,
    PropsDescription.errorMessage,
    PropsDescription.hideErrorMessage,
    PropsDescription.formHelperTextProps
  ];

  return <MarkdownTable rows={tableRows} />;
};

export default IntroductionPageTable;
