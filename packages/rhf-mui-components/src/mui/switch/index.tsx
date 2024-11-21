import { useContext, Fragment, ReactNode, ChangeEvent } from 'react';
import {
  Control,
  Controller,
  Path,
  FieldValues,
  RegisterOptions
} from 'react-hook-form';
import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';
import { FormHelperTextProps } from '@mui/material/FormHelperText';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { FormHelperText } from '../common';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { fieldNameToLabel } from '@/utils';

export type RHFSwitchProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  label?: ReactNode;
  formControlLabelProps?: Omit<FormControlLabelProps, 'control' | 'label'>;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  hideErrorMessage?: boolean;
  formHelperTextProps?: Omit<FormHelperTextProps, 'children' | 'error'>;
  onValueChange?: (e: ChangeEvent<HTMLInputElement>) => void;
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
                  onChange={e => {
                    onChange(e);
                    if(onValueChange) {
                      onValueChange(e);
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
