import {
  useContext,
  Fragment,
  type ReactNode,
  type ChangeEvent
} from 'react';
import {
  Controller,
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { type SwitchProps } from '@mui/material/Switch';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import { FormHelperText } from '@/common';
import type { FormControlLabelProps, FormHelperTextProps } from '@/types';
import { fieldNameToLabel } from '@/utils';

export type RHFSwitchProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  customOnChange?: (
    rhfOnChange: (isChecked: boolean) => void,
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
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
} & Omit<SwitchProps, 'name'>;

const RHFSwitch = <T extends FieldValues>({
  fieldName,
  control,
  registerOptions,
  customOnChange,
  onValueChange,
  label,
  formControlLabelProps,
  helperText,
  errorMessage,
  hideErrorMessage,
  formHelperTextProps,
  onBlur,
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
        const { value, onChange, onBlur: rhfOnBlur, ...otherFieldParams } = field;
        return (
          <Fragment>
            <FormControlLabel
              control={
                <Switch
                  {...otherFieldParams}
                  {...rest}
                  checked={Boolean(value)}
                  onChange={(event, isChecked) => {
                    if(customOnChange) {
                      customOnChange(onChange, event, isChecked);
                      return;
                    }
                    onChange(event);
                    if(onValueChange) {
                      onValueChange(isChecked, event);
                    }
                  }}
                  onBlur={blurEvent => {
                    {
                      rhfOnBlur();
                      onBlur?.(blurEvent);
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
