---
sidebar_position: 6
sidebar_label: Migration Guide
title: Migration Guide
description: Page about the form helper functions exported by this package. 
---

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