import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription, LegacyPropsDescription } from '@site/src/constants';
import { type PropsInfo, type VersionProps } from '@site/src/types';
import { getPropDetailsByVersion } from '@site/src/utils';

const RHFFileUploaderLegacyPropsTable = ({
  muiVersion,
  docsVersion,
  v2
}: VersionProps) => {
  const tableRows = [
    PropsDescription.fieldName,
    PropsDescription.control,
    PropsDescription.registerOptions,
    PropsDescription.required,
    ...(!v2
      ? [PropsDescription.accept]
      : [LegacyPropsDescription.accept_v2]),
    PropsDescription.multiple_FileUploader,
    LegacyPropsDescription.maxFiles_v2_v3,
    PropsDescription.maxSize,
    LegacyPropsDescription.showFileSize,
    LegacyPropsDescription.hideFileList,
    LegacyPropsDescription.onValueChange_FileUploader_v2_v3,
    LegacyPropsDescription.onUploadError_v2_v3,
    getPropDetailsByVersion(LegacyPropsDescription.renderUploadButton_v2_v3, {
      docsVersion
    }),
    getPropDetailsByVersion(LegacyPropsDescription.renderFileItem_v2_v3, { docsVersion }),
    PropsDescription.disabled,
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
    PropsDescription.hideErrorMessage,
    getPropDetailsByVersion(PropsDescription.helperText, { muiVersion }),
    getPropDetailsByVersion(PropsDescription.formHelperTextProps, {
      docsVersion,
      muiVersion
    }),
    PropsDescription.fullWidth_FileUploader
  ];

  return (
    <MarkdownTable
      rows={tableRows as PropsInfo[]}
      showType
    />
  );
};

export default RHFFileUploaderLegacyPropsTable;
