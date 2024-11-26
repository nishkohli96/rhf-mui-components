---
sidebar_position: 6
sidebar_label: Migration Guide
title: Migration Guide
description: Page about the form helper functions exported by this package. 
---

# Migration Guide

## Why is it Recommended ?

Version 2 introduces significant enhancements and optimizations for nearly all components from Version 1. In addition to these improvements, the package now includes four new components:

- [RHFCountrySelect](./components/mui/RHFCountrySelect.mdx)
- [RHFMultiSelectDropdown](./components/mui/RHFMultiSelectDropdown.mdx)
- [RHFTagsInput](./components/mui/RHFTagsInput.mdx)
- [RHFPhoneInput](./components/misc/RHFPhoneInput.mdx)

These additions expand the package's utility, making it a compelling upgrade for developers.

### Limitations of Version 1

**1. Validation Support**: Some of the components in version 1 like `RHFRadioGroup` lacked validation through [registerOptions](https://react-hook-form.com/docs/useform/register#registerRef) and required third-party libraries like [Joi](https://www.npmjs.com/package/joi) for validation.

**2. Disabling Form Fields**: `RHFCheckboxGroup` and `RHFRadioGroup` components did not provide the option to disable form fields.

**3. onValueChange**: In Version 1, the `onValueChange` function included the __ChangeEvent__ as the first argument and the updated values as the second or even third arguments. In practice, most use cases require only the changed values, making the event parameter unused, affecting the readability and maintainability of the code. 

**All of these issues have been addressed in version 2.**

:::caution
**Deprecation of Version 1**<br/>
Given these improvements and the resolution of key limitations, Version 1 will NO LONGER receive updates. Developers are encouraged to upgrade to Version 2 to benefit from these enhancements and new features. 
:::

## Code Changes

Version 2 introduces updates and enhancements to various components, aligning them with the `control` prop from the `useForm` hook for consistent and optimized functionality. While the majority of props for each component remain unchanged, the updates made to the affected props are minimal yet highly impactful. Below are the detailed changes:

### Migration to control Prop

The following components now use the `control` prop instead of `register`:

- [RHFTextField](./components/mui//RHFTextField.mdx)
- [RHFPasswordInput](./components/mui/RHFPasswordInput.mdx)
- [RHFSelect](./components/mui/RHFSelect.mdx)
- [RHFNativeSelect](./components/mui/RHFNativeSelect.mdx)
- [RHFSlider](./components/mui/RHFSlider.mdx)
- [RHFDatePicker](./components/mui-pickers/RHFDatePicker.mdx)
- [RHFTimePicker](./components/mui-pickers/RHFTimePicker.mdx)
- [RHFDateTimePicker](./components/mui-pickers/RHFDateTimePicker.mdx)
- [RHFRichTextEditor](./components/misc/RHFRichTextEditor.mdx)

```diff
<RHFTextField
  fieldName="firstName"
- register={register}
+ control={control}
  errorMessage={errors?.firstName?.message}
/>
```

### Enhanced Validation

The `registerOptions` prop has been added to improve validation capabilities for:

- [RHFCheckbox](./components/mui/RHFCheckbox.mdx)
- [RHFCheckboxGroup](./components/mui/RHFCheckboxGroup.mdx)
- [RHFRadioGroup](./components/mui/RHFRadioGroup.mdx)
- [RHFSwitch](./components/mui/RHFSwitch.mdx)
- [RHFRating](./components/mui/RHFRating.mdx)
- [RHFRichTextEditor](./components/misc/RHFRichTextEditor.mdx)

### Disabling fields

The `disabled` prop has been added to the following components, enabling better control over form fields:

- [RHFCheckboxGroup](./components/mui/RHFCheckboxGroup.mdx)
- [RHFRadioGroup](./components/mui/RHFRadioGroup.mdx)

### Component Changes

**[1. RHFNativeSelect](./components/mui/RHFNativeSelect.mdx)**

**Removed Props -** 
  - `defaultValue`
  - `showDefaultOption`
  - `showDefaultOption`
  - `defaultOptionText`

**Added Props -** 
  - `helperText`

**[2. RHFSwitch](./components/mui/RHFSwitch.mdx)**

**New Props Added -**
  - `errorMessage`
  - `helperText`
  - `hideErrorMessage`
  - `formHelperTextProps`

### OnValueChange

As previously mentioned, the changed value(s) can now be accessed earlier in the `onValueChange` callback function, followed by the event handler(s) for that component. This ensures that the relevant data is easily accessible without requiring developers to handle unused parameters. For detailed usage, refer to the `onValueChange` function in the API reference section for each component.