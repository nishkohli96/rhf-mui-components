import { ReactNode, KeyboardEvent, ChangeEvent, useState, useContext } from 'react';
import {
  FieldValues,
  Path,
  Controller,
  Control,
  RegisterOptions
} from 'react-hook-form';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import MuiTextField, { TextFieldProps } from '@mui/material/TextField';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { FormControl, FormLabel, FormHelperText } from '@/mui/common';
import { FormLabelProps, FormHelperTextProps } from '@/types';
import { fieldNameToLabel, keepLabelAboveFormField } from '@/utils';

type TextFieldInputProps = Omit<
  TextFieldProps,
  | 'name'
  | 'value'
  | 'defaultValue'
  | 'onChange'
  | 'error'
>

export type RHFTagsInputProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  onValueChange?: (
    value: string,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  showLabelAboveFormField?: boolean;
  formLabelProps?: FormLabelProps;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
  maxTags?: number;
} & TextFieldInputProps;

const RHFTagsInput = <T extends FieldValues>({
  fieldName,
  control,
  registerOptions,
  onValueChange,
  label,
  showLabelAboveFormField,
  formLabelProps,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  maxTags,
  ...rest
}: RHFTagsInputProps<T>) => {
  const [inputValue, setInputValue] = useState('');
  const { allLabelsAboveFields } = useContext(RHFMuiConfigContext);
  const isError = Boolean(errorMessage);
  const fieldLabel = label ?? fieldNameToLabel(fieldName);
  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    let newTag: string | null = null;
    if (event.key === "Enter") {
      newTag = inputValue;
      setInputValue('');
    }
    return newTag;
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(event.target.value);
    // let newTags = [];
    // if (event.target.value.includes(",")) {
    //   const parts = event.target.value.split(",");
    //   newTags = parts
    //     .map((tag) => tag.trim())
    //     .filter((tag) => tag && !value.includes(tag));
    //   event.target.value = "";
    // }
  };

  const handleDelete = (tag: string, onChange: (tags: string[]) => void, value: string[]) => {
    const updatedTags = value.filter(item => item !== tag);
    onChange(updatedTags);
  };

  return (
    <FormControl error={isError}>
      <FormLabel
        label={fieldLabel}
        isVisible={isLabelAboveFormField}
        error={isError}
        formLabelProps={formLabelProps}
      />
      <Controller
        name={fieldName}
        control={control}
        rules={registerOptions}
        render={({ field }) => {
          const { value = [], onChange, ...otherFieldParams } = field;
          return (
            <MuiTextField    
              autoComplete={fieldName}
              label={!isLabelAboveFormField ? fieldLabel : undefined}
              value={inputValue}
              onKeyDown={event => {
                const newTag = handleKeyPress(event);
                if(newTag) {
                  onChange([...value, newTag]);
                }
              }}
              onChange={event => handleInputChange(event)}
              error={isError}
              multiline
              minRows={2}
              InputProps={{
                startAdornment: (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1, width: '100%' }}>
                    {value.map((val, idx) => (
                      <Chip
                        key={idx}
                        label={val}
                        // onDelete={handleDelete}
                      />
                    ))}
                  </Box>
                )
              }}
              {...rest}
              {...otherFieldParams}    
            />
          );
        }}
      />
      <FormHelperText
        error={isError}
        errorMessage={errorMessage}
        hideErrorMessage={hideErrorMessage}
        helperText={helperText}
        formHelperTextProps={formHelperTextProps}
      />
    </FormControl>
  );
};

export default RHFTagsInput;
