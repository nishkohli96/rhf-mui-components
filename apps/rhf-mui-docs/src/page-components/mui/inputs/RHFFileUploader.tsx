import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';
import { type PropsInfo, type VersionProps } from '@site/src/types';
import { getPropDetailsByVersion } from '@site/src/utils';

const RHFFileUploaderPropsTable = ({
  muiVersion,
  docsVersion,
}: VersionProps) => {
  const tableRows = [
    PropsDescription.fieldName,
    PropsDescription.control,
    PropsDescription.registerOptions,
    PropsDescription.required,
    PropsDescription.accept,
    PropsDescription.multiple_FileUploader,
    PropsDescription.maxSize,
    PropsDescription.maxFiles,
    PropsDescription.disabled,
    getPropDetailsByVersion(PropsDescription.dropZoneProps, { muiVersion }),
    PropsDescription.disableDragAndDrop,
    getPropDetailsByVersion(PropsDescription.renderUploadButton, {
      docsVersion
    }),
    PropsDescription.existingFiles,
    PropsDescription.renderExistingFileItem,
    getPropDetailsByVersion(PropsDescription.existingFileListProps, { muiVersion }),
    getPropDetailsByVersion(PropsDescription.uploadedFileListProps, { muiVersion }),
    getPropDetailsByVersion(PropsDescription.renderFileItem, { docsVersion }),
    PropsDescription.customOnChange_FileUploader,
    PropsDescription.onValueChange_FileUploader,
    PropsDescription.onUploadError,
    getPropDetailsByVersion(PropsDescription.label, {
      docsVersion,
      muiVersion
    }),
    getPropDetailsByVersion(PropsDescription.showLabelAboveFormField, {
      muiVersion
    }),
    getPropDetailsByVersion(PropsDescription.formLabelProps, {
      docsVersion,
      muiVersion
    }),
    PropsDescription.hideLabel,
    PropsDescription.hideErrorMessage,
    getPropDetailsByVersion(PropsDescription.helperText, { muiVersion }),
    getPropDetailsByVersion(PropsDescription.formHelperTextProps, {
      docsVersion,
      muiVersion
    }),
    PropsDescription.fullWidth_FileUploader,
    PropsDescription.customIds
  ];

  return (
    <MarkdownTable
      rows={tableRows as PropsInfo[]}
      showType
    />
  );
};

export default RHFFileUploaderPropsTable;
