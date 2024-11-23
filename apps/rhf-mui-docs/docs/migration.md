# Migration Guide

register to control

- RHFTextField
- RHFPasswordInput
- RHFSelect
- RHFNativeSelect
- RHFSlider
- RHFDatePicker
- RHFTimePicker
- RHFDateTimePicker
- RHFRichTextEditor

add registerOptions to
- RHFCheckbox
- RHFCheckboxGroup
- RHFRadioGroup
- RHFSwitch
- RHFRating
- RHFRichTextEditor

add `disabled` in RHFCheckboxGroup RHFRadioGroup

### RHFNativeSelect
Removed `defaultValue`, `showDefaultOption`, `defaultOptionText`. Added `helperText` prop

added `errorMessage`, `helperText` , `hideErrorMessage`, `formHelperTextProps` to RHFSwitch