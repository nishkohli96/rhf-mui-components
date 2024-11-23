# Migration Guide

register to control

- RHFTextField
- RHFPasswordInput
- RHFSelect
- RHFNativeSelect
- RHFSlider



add registerOptions to
- RHFCheckbox
- RHFCheckboxGroup
- RHFRadioGroup
- RHFSwitch
- RHFRating

add `disabled` in RHFCheckboxGroup RHFRadioGroup

### RHFNativeSelect
Removed `defaultValue`, `showDefaultOption`, `defaultOptionText`. Added `helperText` prop

added `errorMessage`, `helperText` , `hideErrorMessage`, `formHelperTextProps` to RHFSwitch