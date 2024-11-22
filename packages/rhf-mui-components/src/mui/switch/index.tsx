import { useContext, Fragment, ReactNode, ChangeEvent } from 'react';
import {
  FieldValues,
  Controller,
  Control,
  RegisterOptions,
  Path
} from 'react-hook-form';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { FormHelperText } from '@/mui/common';
import { FormControlLabelProps, FormHelperTextProps } from '@/types';
import { fieldNameToLabel } from '@/utils';

export type RHFSwitchProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  label?: ReactNode;
  formControlLabelProps?: FormControlLabelProps;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: FormHelperTextProps;
  onValueChange?: (
    isChecked: boolean,
    event: ChangeEvent<HTMLInputElement>
  ) => void;
} & Omit<SwitchProps, 'name'>;

const RHFSwitch = <T extends FieldValues>({
  fieldName,
  control,
  registerOptions,
  label,
  formControlLabelProps,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  onValueChange,
  ...rest
}: RHFSwitchProps<T>) => {
  const fieldLabel = label ?? fieldNameToLabel(fieldName);

  const { defaultFormControlLabelSx } = useContext(RHFMuiConfigContext);
  const isError = Boolean(errorMessage);
  const { sx, ...otherFormControlLabelProps } = formControlLabelProps ?? {};
  const appliedFormControlLabelSx = {
    ...defaultFormControlLabelSx,
    ...sx,
  };

  return (
    <Controller
      name={fieldName}
      control={control}
      rules={registerOptions}
      render={({ field }) => {
        const { value, onChange, ...otherFieldParams } = field;
        return (
          <Fragment>
            <FormControlLabel
              control={
                <Switch
                  {...otherFieldParams}
                  {...rest}
                  checked={Boolean(value)}
                  onChange={(event, isChecked) => {
                    onChange(event);
                    if(onValueChange) {
                      onValueChange(isChecked, event);
                    }
                  }}
                />
              }
              label={fieldLabel}
              sx={appliedFormControlLabelSx}
              {...otherFormControlLabelProps}
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
      }}
    />
  );
};

export default RHFSwitch;
