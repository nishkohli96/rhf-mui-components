import { useContext, Fragment, ReactNode, ChangeEvent } from 'react';
import {
  Controller,
  Control,
  FieldValues,
  RegisterOptions,
  Path
} from 'react-hook-form';
import FormControlLabel from '@mui/material/FormControlLabel';
import MuiCheckbox, { CheckboxProps } from '@mui/material/Checkbox';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { FormHelperText } from '@/mui/common';
import { FormControlLabelProps, FormHelperTextProps } from '@/types';

export type RHFCheckboxProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  onValueChange?: (
    isChecked: boolean,
    event: ChangeEvent<HTMLInputElement>
  ) => void;
  label?: ReactNode;
  formControlLabelProps?: FormControlLabelProps;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
} & Omit<CheckboxProps, 'name' | 'checked' | 'onChange'>;

const RHFCheckbox = <T extends FieldValues>({
  fieldName,
  control,
  registerOptions,
  onValueChange,
  label,
  formControlLabelProps,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  ...rest
}: RHFCheckboxProps<T>) => {
  const { defaultFormControlLabelSx } = useContext(RHFMuiConfigContext);
  const isError = Boolean(errorMessage);

  const { sx, ...otherFormControlLabelProps } = formControlLabelProps ?? {};
  const appliedFormControlLabelSx = {
    ...defaultFormControlLabelSx,
    ...sx,
  };

  return (
    <Fragment>
      <Controller
        name={fieldName}
        control={control}
        rules={registerOptions}
        render={({ field }) => {
          const { value, onChange, ...otherFieldParams } = field;
          return (
            <FormControlLabel
              control={
                <MuiCheckbox
                  {...otherFieldParams}
                  {...rest}
                  checked={Boolean(value)}
                  onChange={(event, checked) => {
                    onChange(checked);
                    if(onValueChange) {
                      onValueChange(checked, event);
                    }
                  }}
                />
              }
              label={label}
              sx={appliedFormControlLabelSx}
              {...otherFormControlLabelProps}
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
    </Fragment>
  );
};

export default RHFCheckbox;
