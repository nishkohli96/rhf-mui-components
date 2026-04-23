import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';
import { type PropsInfo, type VersionProps } from '@site/src/types';
import { getPropByDocsAndMuiVersion, getPropDetailsByVersion } from '@site/src/utils';

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
    getPropDetailsByVersion(PropsDescription.renderUploadButton, docsVersion),
    getPropDetailsByVersion(PropsDescription.renderFileItem, docsVersion),
    PropsDescription.disabled,
    getPropByDocsAndMuiVersion(PropsDescription.label, docsVersion, muiVersion),
    getPropDetailsByVersion(
      PropsDescription.showLabelAboveFormField,
      muiVersion
    ),
    getPropByDocsAndMuiVersion(
      PropsDescription.formLabelProps,
      docsVersion,
      muiVersion
    ),
    ...(v4AndAbove
      ? [PropsDescription.hideLabel]
      : [getPropDetailsByVersion(PropsDescription.errorMessage, muiVersion)]),
    PropsDescription.hideErrorMessage,
    getPropDetailsByVersion(PropsDescription.helperText, muiVersion),
    getPropByDocsAndMuiVersion(
      PropsDescription.formHelperTextProps,
      docsVersion,
      muiVersion
    ),
    PropsDescription.fullWidth_FileUploader
  ];

  return <MarkdownTable rows={tableRows as PropsInfo[]} showType />;
};

export default RHFFileUploaderPropsTable;
