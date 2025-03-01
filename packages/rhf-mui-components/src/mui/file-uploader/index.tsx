import { useContext, Fragment, ReactNode, ChangeEvent } from 'react';
import {
  FieldValues,
  Path,
  Controller,
  Control,
  RegisterOptions
} from 'react-hook-form';
import Box from '@mui/material/Box';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { FormControl, FormLabel, FormHelperText } from '@/mui/common';
import { FormLabelProps, FormHelperTextProps, FileInputProps } from '@/types';
import { fieldNameToLabel, keepLabelAboveFormField } from '@/utils';
import { FileItem, HiddenInput, UploadButton } from './components';

export type RHFFileUploaderProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  required?: boolean;
	hideFileList?: boolean;
  showFileSize?: boolean;
  onValueChange?: (
    value: string,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  label?: ReactNode;
  showLabelAboveFormField?: boolean;
  formLabelProps?: FormLabelProps;
  errorMessage?: ReactNode;
  helperText?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
  renderUploadButton?: (fileInput: ReactNode) => ReactNode;
  renderFileItem?: (file: File, index: number) => ReactNode;
  fullWidth?: boolean;
} & FileInputProps;

const RHFFileUploader = <T extends FieldValues>({
  fieldName,
  control,
  registerOptions,
	multiple,
  accept = '*',
  hideFileList,
  showFileSize,
  onValueChange,
  label,
  showLabelAboveFormField,
  formLabelProps,
  required,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  renderUploadButton,
  renderFileItem,
  disabled,
  fullWidth,
  ...rest
}: RHFFileUploaderProps<T>) => {
  const { allLabelsAboveFields } = useContext(RHFMuiConfigContext);
  const isError = Boolean(errorMessage);
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );

  return (
    <FormControl fullWidth={fullWidth ?? false} error={isError}>
      <FormLabel
        label={fieldLabel}
        isVisible={isLabelAboveFormField}
        required={required}
        error={isError}
        formLabelProps={formLabelProps}
      />
      <Controller
        name={fieldName}
        control={control}
        rules={registerOptions}
        render={({ field }) => {
          const { value, onChange, ...otherFieldParams } = field;

          const FileInput = () => (
            <HiddenInput
              type="file"
              accept={accept}
              onChange={(event) => {
                const fileList = event.target.files;
                if (fileList && fileList.length > 0) {
                  onChange(multiple ? Array.from(fileList) : fileList[0]);
                }
              }}
              multiple={multiple}
              disabled={disabled}
              {...otherFieldParams}
            />
          );

          const removeFile = (index: number) => {
            if (multiple) {
              const newFiles = value.filter(
                (_: File, i: number) => i !== index
              );
              onChange(newFiles);
            } else {
              onChange(null);
            }
          };

          return (
            <Fragment>
              {renderUploadButton ? (
                renderUploadButton(<FileInput />)
              ) : (
                <UploadButton
                  fieldName={fieldName}
                  disabled={disabled}
                  multiple={multiple}
                >
                  <FileInput />
                </UploadButton>
              )}
              <FormHelperText
                error={isError}
                errorMessage={errorMessage}
                hideErrorMessage={hideErrorMessage}
                helperText={helperText}
                formHelperTextProps={formHelperTextProps}
              />
              {!hideFileList && (
                <Box>
                  {value &&
                    (Array.isArray(value) ? value : [value]).map(
                      (file: File, index) => (
                        <Fragment key={index}>
                          {renderFileItem ? (
                            renderFileItem(file, index)
                          ) : (
                            <FileItem
                              index={index}
                              file={file}
                              showFileSize={showFileSize}
                              removeFile={removeFile}
                            />
                          )}
                        </Fragment>
                      )
                    )}
                </Box>
              )}
            </Fragment>
          );
        }}
      />
    </FormControl>
  );
};

export default RHFFileUploader;
