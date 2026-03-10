import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';
import { type PropsInfo, type VersionProps } from '@site/src/types';
import { getPropDetailsByVersion } from '@site/src/utils';

const RHFFileUploaderPropsTable = ({
  muiVersion,
  docsVersion,
  v2,
  v4AndAbove
}: VersionProps) => {
  const tableRows = [
    PropsDescription.fieldName,
    PropsDescription.control,
    PropsDescription.registerOptions,
    PropsDescription.required,
    ...(!v2
      ? [PropsDescription.accept_FileUploader]
      : [PropsDescription.accept_FileUploader_v2]),
    PropsDescription.multiple_FileUploader,
    PropsDescription.maxFiles,
    PropsDescription.maxSize_FileUploader,
    PropsDescription.showFileSize,
    PropsDescription.hideFileList,
    PropsDescription.onValueChange_FileUploader,
    PropsDescription.onUploadError,
    PropsDescription.renderUploadButton,
    PropsDescription.renderFileItem,
    PropsDescription.disabled,
    getPropDetailsByVersion(PropsDescription.label, docsVersion),
    PropsDescription.showLabelAboveFormField,
    ...(v4AndAbove ? [PropsDescription.hideLabel] : []),
    PropsDescription.formLabelProps,
    PropsDescription.errorMessage,
    PropsDescription.hideErrorMessage,
    PropsDescription.helperText,
    PropsDescription.formHelperTextProps,
    PropsDescription.fullWidth_FileUploader
  ];

  return <MarkdownTable rows={tableRows as PropsInfo[]} showType />;
};

export default RHFFileUploaderPropsTable;
