import { ReactNode, ChangeEvent } from 'react';
import {
  Control,
  Controller,
  Path,
  FieldValues
} from 'react-hook-form';
import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { fieldNameToLabel } from '../../../utils';

export type RHFSwitchProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  label?: ReactNode;
  onValueChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  formControlLabelProps?: Omit<FormControlLabelProps, 'control' | 'label'>;
} & Omit<SwitchProps, 'name'>;

export function RHFSwitch<T extends FieldValues>({
  fieldName,
  control,
  label,
  onValueChange,
  formControlLabelProps,
  ...rest
}: RHFSwitchProps<T>
) {
  const fieldLabel = label ?? fieldNameToLabel(fieldName);

  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field }) => {
        const { value, onChange, ...otherFieldParams } = field;
        return (
          <FormControlLabel
            control={
              <Switch
                {...otherFieldParams}
                {...rest}
                checked={value}
                onChange={e => {
                  onChange(e);
                  onValueChange && onValueChange(e);
                }}
              />
            }
            label={fieldLabel}
            {...formControlLabelProps}
          />
        );
      }}
    />
  );
}
