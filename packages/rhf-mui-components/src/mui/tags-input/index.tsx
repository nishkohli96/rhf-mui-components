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

  const handleKeyPress = (
    event: KeyboardEvent<HTMLDivElement>,
    value: string[]
  ) => {
    console.log('event: ', event.target);
    console.log('event: ', event.currentTarget);
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      // const input = event.target.value
      // if (input && !value.includes(input)) {
      //   const updatedTags = [...value, input];
      //   if (!maxTags || updatedTags.length <= maxTags) {
      //     // onChange(updatedTags);
      //     // event.currentTarget.value = "";
      //   }
      // }
    }
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    value: string[]
  ) => {
    if (event.target.value.includes(",")) {
      const parts = event.target.value.split(",");
      const newTags = parts
        .map((tag) => tag.trim())
        .filter((tag) => tag && !value.includes(tag));
      // onChange([...value, ...newTags]);
      event.target.value = "";
    }
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
              onKeyDown={e => {
                handleKeyPress(e, value);
              }}
              onChange={(e) => handleInputChange(e, value)}
              error={isError}
              multiline
              minRows={2}
              maxRows={4}
              InputProps={{
                startAdornment: (
                  <Box>
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
