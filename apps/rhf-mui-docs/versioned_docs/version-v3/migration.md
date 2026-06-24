---
sidebar_position: 6
sidebar_label: Migration Guide
title: Migration Guide
description: Page about the form helper functions exported by this package. 
---

# Migration Guide

## Migrate to v3

**Version 3** introduces compatibility with [MUI v7](https://v7.mui.com/material-ui/) and [@mui/x-date-pickers v8](https://v8.mui.com/x/react-date-pickers/), while maintaining backward compatibility with MUI [v5](https://v5.mui.com/material-ui/) and [v6](https://v6.mui.com/material-ui/), and @mui/x-date-pickers [v6](https://v6.mui.com/x/react-date-pickers/) and [v7](https://v7.mui.com/x/react-date-pickers/).

If your project has been upgraded to @mui/material v7, it is recommended to update this package to version 3 for optimal compatibility.

Refer to the official migration guides for [@mui/material](https://v7.mui.com/material-ui/migration/upgrade-to-v7/) and [@mui/x-date-pickers](https://v8.mui.com/x/.migration/migration-pickers-v7/) for detailed upgrade instructions.


## Migrate to v2

**Why is it Recommended ?**

Version 2 introduces significant enhancements and optimizations for nearly all components from Version 1. In addition to these improvements, the package now includes five new components:

- [RHFAutocomplete](../version-v2/components/mui/RHFAutocomplete.mdx)
- [RHFMultiAutocomplete](../version-v2/components/mui/RHFMultiAutocomplete.mdx)
- [RHFCountrySelect](../version-v2/components/mui/RHFCountrySelect.mdx)
- [RHFTagsInput](../version-v2/components/mui/RHFTagsInput.mdx)
- [RHFPhoneInput](../version-v2/components/misc/RHFPhoneInput.mdx)

These additions expand the package's utility, making it a compelling upgrade for developers.

### Limitations of Version 1

**1. Validation Support**: Some of the components in version 1 like `RHFRadioGroup` lacked validation through [registerOptions](https://react-hook-form.com/docs/useform/register#registerRef) and required third-party libraries like [Joi](https://www.npmjs.com/package/joi) for validation.

**2. Disabling Form Fields**: `RHFCheckboxGroup` and `RHFRadioGroup` components did not provide the option to disable form fields.

**3. onValueChange**: In Version 1, the `onValueChange` function included the __ChangeEvent__ as the first argument and the updated values as the second or even third arguments. In practice, most use cases require only the changed values, making the event parameter unused, affecting the readability and maintainability of the code. 

**All of these issues have been addressed in version 2.**

:::caution
**Deprecation of Version 1**<br/>
Given these improvements and the resolution of key limitations, Version 1 will **NO LONGER** receive updates. Developers are encouraged to upgrade to Version 2 to benefit from these enhancements and new features. 
:::

### Code Changes

Version 2 introduces updates and enhancements to various components, aligning them with the `control` prop from the `useForm` hook for consistent and optimized functionality. While the majority of props for each component remain unchanged, the updates made to the affected props are minimal yet highly impactful. Below are the detailed changes:

#### Migration to control Prop

The following components now use the `control` prop instead of `register`:

- [RHFTextField](../version-v2/components/mui//RHFTextField.mdx)
- [RHFPasswordInput](../version-v2/components/mui/RHFPasswordInput.mdx)
- [RHFSelect](../version-v2/components/mui/RHFSelect.mdx)
- [RHFNativeSelect](../version-v2/components/mui/RHFNativeSelect.mdx)
- [RHFSlider](../version-v2/components/mui/RHFSlider.mdx)
- [RHFDatePicker](../version-v2/components/mui-pickers/RHFDatePicker.mdx)
- [RHFTimePicker](../version-v2/components/mui-pickers/RHFTimePicker.mdx)
- [RHFDateTimePicker](../version-v2/components/mui-pickers/RHFDateTimePicker.mdx)
- [RHFRichTextEditor](../version-v2/components/misc/RHFRichTextEditor.mdx)

```diff
<RHFTextField
  fieldName="firstName"
- register={register}
+ control={control}
  errorMessage={errors?.firstName?.message}
/>
```

#### Enhanced Validation

The `registerOptions` prop has been added to improve validation capabilities for:

- [RHFCheckbox](../version-v2/components/mui/RHFCheckbox.mdx)
- [RHFCheckboxGroup](../version-v2/components/mui/RHFCheckboxGroup.mdx)
- [RHFRadioGroup](../version-v2/components/mui/RHFRadioGroup.mdx)
- [RHFSwitch](../version-v2/components/mui/RHFSwitch.mdx)
- [RHFRating](../version-v2/components/mui/RHFRating.mdx)
- [RHFRichTextEditor](../version-v2/components/misc/RHFRichTextEditor.mdx)

#### Required Validation

Every field now includes support for the `required` prop. When enabled, it appends an asterisk (*) to the field label, visually signaling that the field requires a valid value. This ensures users are aware of the necessity to provide input.

#### Disabling fields

The `disabled` prop has been added to the following components, enabling better control over form fields:

- [RHFCheckboxGroup](../version-v2/components/mui/RHFCheckboxGroup.mdx)
- [RHFRadioGroup](../version-v2/components/mui/RHFRadioGroup.mdx)

#### OnValueChange

As previously mentioned, the changed value(s) can now be accessed earlier in the `onValueChange` callback function, followed by the event handler(s) for that component. This ensures that the relevant data is easily accessible without requiring developers to handle unused parameters. For detailed usage, refer to the `onValueChange` function in the API reference section for each component.

### Component-Specific Updates

Significant changes have been made to each of the components listed below that enhance its functionality and makes it more compatible with other core components of this package.

**[1. RHFNativeSelect](../version-v2/components/mui/RHFNativeSelect.mdx)**

Use `FormLabel` instead of `InputLabel`to display label text for the field. 

**Removed Props -** 
  - `defaultValue`
  - `showDefaultOption`

**Added Props -**
  - `showLabelAboveFormField`
  - `formLabelProps`
  - `helperText`

**[2. RHFSwitch](../version-v2/components/mui/RHFSwitch.mdx)**

**New Props Added -**
  - `errorMessage`
  - `helperText`
  - `hideErrorMessage`
  - `formHelperTextProps`

**[3. RHFColorPicker](../version-v2/components/misc/RHFColorPicker.mdx)**

Unlike the previous implementation of v1, the field value is now handled internally whenever the user selects a color.

**New Props Added -**
  - `control`
  - `registerOptions`
  - `defaultColor`
  - `excludeAlpha`
  - `valueKey`

`onValueChange` prop is now optional, but its implementation remains unchanged.
