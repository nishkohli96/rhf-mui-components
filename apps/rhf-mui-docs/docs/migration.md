# Migration Guide

register to control

- RHFTextField
- RHFPasswordInput
- RHFSelect
- RHFNativeSelect

now required control instead of register
  onValueChange?: (e: SelectChangeEvent_SelectValueType_, newValue: SelectValueType, child: ReactNode) => void;

add registerOptions to
- RHFCheckbox
- RHFCheckboxGroup
- RHFRadioGroup
- RHFSwitch
- RHFSlider

add `disabled` in RHFCheckboxGroup RHFRadioGroup

### RHFNativeSelect
Removed `defaultValue`, `showDefaultOption`, `defaultOptionText`. Added `helperText` prop

added `errorMessage`, `helprText` to RHFSwitch