import type { PropsInfo, VersionProps } from '@/types';
import { resolveProp } from '@/utils';
import PropsDescription from '../descriptions/props';
import LegacyPropsDescription from '../descriptions/legacy-props';

/** Props reference rows for `RHFFileUploader`. Added in v2.1, rewritten in v4. */
const fileUploaderRows = ({ docsVersion, muiVersion, v2, v4AndAbove }: VersionProps): PropsInfo[] => {
  const args = { docsVersion, muiVersion };

  if (v4AndAbove) {
    return [
      resolveProp(PropsDescription.fieldName, args),
      resolveProp(PropsDescription.control, args),
      resolveProp(PropsDescription.registerOptions, args),
      resolveProp(PropsDescription.required, args),
      resolveProp(PropsDescription.customOnChange_FileUploader, args),
      resolveProp(PropsDescription.onValueChange_FileUploader, args),
      resolveProp(PropsDescription.onUploadError, args),
      resolveProp(PropsDescription.onBlur_FileUploader, args),
      resolveProp(PropsDescription.accept, args),
      resolveProp(PropsDescription.multiple_FileUploader, args),
      resolveProp(PropsDescription.maxSize, args),
      resolveProp(PropsDescription.maxFiles, args),
      resolveProp(PropsDescription.disabled, args),
      resolveProp(PropsDescription.dropZoneProps, args),
      resolveProp(PropsDescription.disableDragAndDrop, args),
      resolveProp(PropsDescription.renderUploadButton, args),
      resolveProp(PropsDescription.existingFiles, args),
      resolveProp(PropsDescription.renderExistingFileItem, args),
      resolveProp(PropsDescription.existingFileListProps, args),
      resolveProp(PropsDescription.uploadedFileListProps, args),
      resolveProp(PropsDescription.renderFileItem, args),
      resolveProp(PropsDescription.label, args),
      resolveProp(PropsDescription.showLabelAboveFormField, args),
      resolveProp(PropsDescription.formLabelProps, args),
      resolveProp(PropsDescription.hideLabel, args),
      resolveProp(PropsDescription.renderError, args),
      resolveProp(PropsDescription.hideErrorMessage, args),
      resolveProp(PropsDescription.helperText, args),
      resolveProp(PropsDescription.formHelperTextProps, args),
      resolveProp(PropsDescription.fullWidth_FileUploader, args),
      resolveProp(PropsDescription.customIds, args)
    ];
  }

  return [
    resolveProp(PropsDescription.fieldName, args),
    resolveProp(PropsDescription.control, args),
    resolveProp(PropsDescription.registerOptions, args),
    resolveProp(PropsDescription.required, args),
    resolveProp(v2 ? LegacyPropsDescription.accept_v2 : PropsDescription.accept, args),
    resolveProp(PropsDescription.multiple_FileUploader, args),
    resolveProp(LegacyPropsDescription.maxFiles_v2_v3, args),
    resolveProp(PropsDescription.maxSize, args),
    resolveProp(LegacyPropsDescription.showFileSize, args),
    resolveProp(LegacyPropsDescription.hideFileList, args),
    resolveProp(LegacyPropsDescription.onValueChange_FileUploader_v2_v3, args),
    resolveProp(LegacyPropsDescription.onUploadError_v2_v3, args),
    ...(!v2 ? [resolveProp(LegacyPropsDescription.onBlur_FileUploader_v3, args)] : []),
    resolveProp(LegacyPropsDescription.renderUploadButton_v2_v3, args),
    resolveProp(LegacyPropsDescription.renderFileItem_v2_v3, args),
    resolveProp(PropsDescription.disabled, args),
    resolveProp(PropsDescription.label, args),
    resolveProp(PropsDescription.showLabelAboveFormField, args),
    resolveProp(PropsDescription.formLabelProps, args),
    resolveProp(PropsDescription.hideErrorMessage, args),
    resolveProp(PropsDescription.helperText, args),
    resolveProp(PropsDescription.formHelperTextProps, args),
    resolveProp(PropsDescription.fullWidth_FileUploader, args)
  ];
};

export default fileUploaderRows;
