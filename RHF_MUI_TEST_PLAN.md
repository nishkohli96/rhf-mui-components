# RHF MUI Components Test Plan

This document lists recommended automated and manual verification scenarios for `@nish1896/rhf-mui-components`.

## Test Levels

- Unit/component tests: render each component with `react-hook-form`, interact with it, and assert RHF state, callbacks, accessibility attributes, and error rendering.
- Type tests: verify key generic props, object option types, callback argument shapes, and ref types compile as expected.
- Demo smoke tests: run the demo app, visit each form page, interact with representative fields, submit, reset, and verify displayed form state.
- Docs smoke tests: build docs and verify examples compile after API changes.

## Shared Scenarios For All Components

Run these for every field component unless explicitly not applicable.

| Area | Test cases |
| --- | --- |
| Basic render | Renders with minimum required props: `fieldName` and `control`. |
| Default value | Displays the value from RHF `defaultValues`. |
| Value update | User interaction updates RHF state with the expected value shape. |
| Validation | `registerOptions.required` displays the expected validation message after submit/blur. |
| Error rendering | Error state sets visual error state and helper/error text correctly. |
| Helper text | `helperText` renders when no error is present. |
| Hide error | `hideErrorMessage` hides message while keeping field error state. |
| Label | Auto-generated label is shown from `fieldName`; custom `label` overrides it. |
| Label position | `showLabelAboveFormField` and config `allLabelsAboveFields` place labels correctly. |
| Hide label | `hideLabel` removes the visible label and keeps field usable. |
| Disabled | MUI `disabled` and RHF form-level `disabled` both prevent interaction. |
| Required UI | `required` marks the label/input as required where applicable. |
| IDs | `customIds` are applied to field, label, helper, and error elements where supported. |
| Callbacks | `onValueChange` fires after default RHF update with object-based args where applicable. |
| Custom change | `customOnChange` overrides default behavior and only updates RHF when `rhfOnChange` is called. |
| Ref | External `ref` is forwarded to the interactive input/control where applicable. |
| Reset | RHF `reset()` restores field value and UI. |
| Submit | Submitted values match expected serialized value shape. |
| Accessibility | Label association, `aria-invalid`, `aria-required`, and helper/error descriptions are correct. |

## Core MUI Components

### RHFTextField

- Types text and updates form value.
- Supports inherited MUI `TextField` props directly.
- Calls `onValueChange({ newValue, event })`.
- Calls `customOnChange({ rhfOnChange, event, newValue })`.
- Handles multiline props.
- Respects RHF disabled state.
- External ref points to input.

### RHFPasswordInput

- Renders password input by default.
- Visibility toggle switches input type between `password` and `text`.
- Toggle button is keyboard accessible.
- Validation works with min length and required rules.
- Disabled state disables input and toggle button.
- Custom `slotProps`/adornments merge without breaking visibility toggle.

### RHFNumberInput

- Accepts integer input.
- Accepts decimal input when configured.
- Rejects invalid non-numeric characters.
- Handles empty value as expected.
- Enforces min/max validation through RHF rules.
- Step controls or keyboard changes update value correctly.
- `onValueChange` returns `{ newValue, event }` where `newValue` is `number | null`.
- `customOnChange` can block or transform numeric value.

### RHFTagsInput

- Pressing Enter adds a tag.
- Pressing delimiter adds a tag.
- Trims whitespace before adding.
- Prevents duplicate tags case-insensitively if that is current behavior.
- `maxTags` prevents additional typed tags.
- Pasting delimiter-separated text adds multiple tags.
- Pasted tags are trimmed and deduplicated.
- Pasted tags are truncated to remaining `maxTags` slots.
- Backspace/Delete on empty input removes the last tag.
- Chip delete removes the selected tag.
- `onTagAdd({ newTag, currentValue })` can block by returning `false`.
- `onTagAdd` can transform a tag by returning a string.
- `onTagDelete({ deletedTag, currentValue })` can block removal.
- `onTagPaste({ pastedTags, currentValue })` can block all pasted tags.
- `onTagPaste` can replace pasted tags by returning `string[]`.
- `limitTags` hides tags while unfocused.
- `limitTags={-1}` always shows all tags.
- `getLimitTagsText` customizes hidden tag summary.
- `renderTagLabel` customizes chip label.
- `ChipProps` customizes tag chips.

### RHFFileUploader

- Single file selection stores a `File`.
- Multiple file selection stores a `File[]`.
- Selecting files in multiple batches preserves previous files.
- Removing a file updates RHF state and calls `onValueChange`.
- Clearing field resets file input value.
- `accept` rejects invalid file types.
- `maxSize` rejects oversized files.
- `maxFiles` counts existing and newly selected files.
- `onUploadError` receives `[{ file, errors }]`.
- Drag-and-drop adds files when enabled.
- `disableDragAndDrop` disables drop behavior.
- Drop zone visual state changes during drag enter/leave.
- `dropZoneProps` object applies custom props/styles.
- `dropZoneProps(state)` receives `{ isDragging, disabled, error }`.
- `renderUploadButton` receives hidden file input and opens file picker when clicked.
- `renderFileItem` customizes new file rendering and removal.
- `existingFiles` renders server-side files.
- `renderExistingFileItem` customizes existing file rendering.
- Existing files satisfy required validation.
- Existing files participate in `maxFiles` validation.
- Disabled state prevents click, drop, and remove actions.

### RHFSelect

- Renders options from `string[]`.
- Renders options from object array with `labelKey` and `valueKey`.
- Throws or validates when object options are missing required keys in non-skipped env.
- Single select stores selected value.
- Multiple select stores selected values array.
- `showDefaultOption` renders default option.
- `defaultOptionText` customizes default option.
- `renderOptionLabel` customizes option display.
- `customOnChange` can override selected value.
- Disabled options cannot be selected.
- Placeholder renders when no value is selected.

### RHFNativeSelect

- Renders native options from `string[]`.
- Renders object options with `labelKey` and `valueKey`.
- Single selection stores the selected option value.
- Default option behavior works.
- Native select remains usable on mobile viewport.
- Validation error displays correctly.
- Disabled state prevents selection.

### RHFCheckbox

- Initial checked value reflects RHF state.
- Click toggles boolean value.
- `onValueChange` receives checked state.
- `customOnChange` can override toggle behavior.
- Label click toggles checkbox.
- Disabled state prevents toggle.
- Required validation behavior for unchecked value is verified and documented.
- Custom checkbox props are applied.

### RHFCheckboxGroup

- Renders string options.
- Renders object options with `labelKey` and `valueKey`.
- Selecting one checkbox adds value to array.
- Deselecting removes value from array.
- Multiple selections preserve existing values.
- `customOnChange` receives current value, toggled value, and checked state.
- `onValueChange` fires with updated array.
- Checkbox props apply to each checkbox.
- Disabled group prevents all selection.
- Disabled option behavior works if supported.
- Required validation fails when no option is selected.

### RHFRadioGroup

- Renders string options.
- Renders object options with `labelKey` and `valueKey`.
- Selecting an option stores single value.
- Selecting another option replaces previous value.
- `renderOptionLabel` customizes display.
- `onValueChange` fires with selected value.
- `customOnChange` can override selected value.
- Disabled group prevents selection.
- Required validation fails when no option is selected.

### RHFSwitch

- Initial checked state reflects RHF boolean value.
- Click toggles boolean value.
- Label click toggles switch.
- `onValueChange` fires with checked value.
- `customOnChange` can override behavior.
- Disabled state prevents toggle.
- Required validation behavior for boolean values is documented and verified.

### RHFSlider

- Initial value reflects default value.
- Dragging thumb updates RHF value.
- Keyboard arrows update value.
- Min/max bounds are respected.
- Step value is respected.
- Range slider stores tuple/array value if supported by MUI props.
- Marks render when provided.
- `onValueChange` fires when the slider value changes.
- Disabled state prevents movement.
- Required/validation rules display errors.

### RHFRating

- Initial rating reflects default value.
- Clicking a rating stores numeric value.
- Hover preview does not commit until selection.
- Clearing rating stores expected empty value.
- Precision prop supports half ratings.
- Disabled/readOnly states prevent updates.
- `onValueChange` fires with selected rating.
- Required validation works when empty.

## Autocomplete Components

### RHFAutocomplete

- Renders string options.
- Renders object options with `labelKey` and `valueKey`.
- Single selection stores primitive value.
- Multiple selection stores primitive array.
- Free solo stores typed string.
- Free solo commit-on-blur works.
- Multiple free solo stores custom string values alongside option values.
- Duplicate labels should be covered by a regression test once `getOptionKey` support is added.
- `getOptionLabel` displays `labelKey`.
- `isOptionEqualToValue` matches by `valueKey`.
- Clear action stores empty/null value as documented.
- `disableClearable` prevents clearing.
- `renderOption` receives correct option shape.
- `renderValue` handles object and string values.
- Loading state renders spinner.
- Async option appending does not duplicate selected value.
- `onValueChange` receives `{ newValue, selectedOption, event, reason, details }`.
- `customOnChange` can override RHF update.

### RHFAutocompleteObject

- Single selection stores full option object.
- Multiple selection stores full option object array.
- Requires object options with `labelKey` and `valueKey`.
- Free solo is not supported.
- `isOptionEqualToValue` matches objects by `valueKey`.
- `renderValue` receives option object(s).
- Clear action resets value.
- Duplicate labels should be covered by a regression test once `getOptionKey` support is added.
- `onValueChange` receives `{ newValue, event, reason, details }`.

### RHFMultiAutocomplete

- Renders string options.
- Renders object options with `labelKey` and `valueKey`.
- Multiple selected values are stored as string array.
- Select All appears when more than one option exists.
- Select All selects all real options.
- Clicking Select All again clears all options.
- Select All shows indeterminate state when partially selected.
- Select All is hidden when `hideSelectAllOption` is true.
- Select All is hidden when `freeSolo` is true.
- Free solo values are committed on blur.
- `renderOptionLabel` customizes real option labels.
- Select All label can be customized separately via `selectAllText`.
- Disabled options cannot be toggled.
- `getLimitTagsText` customizes hidden selection summary.
- `onValueChange` receives updated value and selected option.

### RHFMultiAutocompleteObject

- Stores selected values as full object array.
- Select All selects all option objects.
- Select All clears when all are selected.
- Partial selection shows indeterminate state.
- Select All option is not included in RHF value.
- `renderOptionLabel` only handles real options.
- Free solo is not supported.
- Object equality works by `valueKey`.
- Disabled options cannot be toggled.
- `renderValue` receives real option objects only.

### RHFCountrySelect

- Renders all countries by default.
- Renders provided filtered `countries`.
- `preferredCountries` appear at the top.
- Single select returns `country[valueKey]` when `valueKey` is provided.
- Single select returns full country object when `valueKey` is omitted.
- Multiple select returns an array of selected values/objects.
- `renderOptionLabel` customizes option content.
- Search/filter follows MUI Autocomplete label matching by country name.
- `getOptionKey` defaults to stable country key.
- Required validation works.

## MUI X Picker Components

Run shared picker scenarios for all picker variants:

- `RHFDatePicker`
- `RHFDesktopDatePicker`
- `RHFMobileDatePicker`
- `RHFStaticDatePicker`
- `RHFTimePicker`
- `RHFDesktopTimePicker`
- `RHFMobileTimePicker`
- `RHFStaticTimePicker`
- `RHFDateTimePicker`
- `RHFDesktopDateTimePicker`
- `RHFMobileDateTimePicker`
- `RHFStaticDateTimePicker`

### Shared Picker Scenarios

- Renders inside `ConfigProvider` with `dateAdapter`.
- Initial value reflects RHF default value.
- Valid selection updates RHF state in `onChange`.
- Invalid intermediate value does not update RHF state.
- `onValueChange({ newValue, context })` fires for valid changes.
- `customOnChange({ rhfOnChange, newValue, context })` can override update.
- `onAccept` behavior does not block normal selection.
- Clear action stores expected empty value.
- Min/max date or time validation displays error.
- Disabled and readOnly states prevent updates.
- Slot props and text field props merge correctly.
- External ref points to input where applicable.
- Static picker variants update without popover behavior.
- Desktop/mobile variants render and update in their expected mode.

### RHFDatePicker Family

- Selects date only.
- Does not include time component unexpectedly.
- Respects `disablePast` and `disableFuture`.

### RHFTimePicker Family

- Selects time only.
- Respects 12/24-hour configuration.
- Respects min/max time.

### RHFDateTimePicker Family

- Selects date and time.
- Keeps both date and time when editing either part.
- Respects min/max datetime.

## Misc Components

### RHFColorPicker

- Renders with default black color when field is empty.
- Parses initial hex value.
- Parses initial RGB value.
- Parses initial HSV-compatible value when using `valueKey="hsv"`.
- Color picker interaction updates RHF string value.
- `onValueChange` receives color object with `hex`, `rgb`, and `hsv`.
- `customOnChange` can override default update and use `setColor`.
- `defaultColor` changes empty initial color.
- Disabled state prevents color changes.
- External package CSS is loaded without TypeScript errors.

### RHFPhoneInput

- Accepts initial string value for backward compatibility.
- Accepts initial `RHFPhoneInputValue` object.
- User input stores structured object: `{ phone, country, dialCode, phoneNo }`.
- Country selection updates `country`, `dialCode`, `phone`, and `phoneNo`.
- Shared dial code countries such as US/Canada preserve selected `country`.
- Pasting another country number respects `disableDropdown`/preselected country behavior.
- `disableDropdown` prevents country changes.
- Inline country search filters by country name, ISO2, and dial code.
- Search field stays pinned while country list scrolls.
- Country menu width behaves correctly on desktop and mobile.
- Selecting a country focuses the phone input.
- `searchCountryProps.textFieldProps` customize search field.
- `searchCountryProps.renderCountryMenuItem` customizes menu item content.
- `searchCountryProps.noCountryFoundText` renders when no match exists.
- `onValueChange` receives `{ newValue, phoneData }`.
- `customOnChange` can override RHF update.
- Custom validation can check the structured object shape, especially `phoneNo`.
- External ref points to the phone input.

### RHFRichTextEditor

- Renders editor with default config.
- Initial HTML value appears in editor.
- Typing updates RHF HTML string.
- Toolbar actions update output HTML.
- `onValueChange({ newValue, event, editor })` fires on content change.
- `customOnChange({ rhfOnChange, newValue, event, editor })` can override update.
- Required validation fails for empty content.
- Disabled state prevents editing.
- Custom `editorConfig` replaces the default config.
- External ref exposes editor/input root as intended.
- SSR/build does not crash due to editor imports.

## Export And Packaging Scenarios

- Root package exports all public components.
- Subpath imports work for every component, for example `@nish1896/rhf-mui-components/mui/textfield`.
- Type imports work for every public prop type.
- Built `dist/package.json` has export paths without `./dist`.
- `pnpm lib` succeeds.
- `pnpm lib:lint` succeeds.
- `pnpm demo:build` succeeds.
- `pnpm docs:build` succeeds.

## Recommended Smoke Flow In Demo App

1. Run `pnpm demo`.
2. Visit each demo form route.
3. Submit empty form and verify validation errors.
4. Fill each field with representative valid values.
5. Verify the `FormState` panel shows expected values.
6. Reset the form and verify defaults are restored.
7. Toggle disabled examples and verify fields no longer submit values if RHF form-level disabled is used.
8. Check browser console for React key warnings, controlled/uncontrolled warnings, and accessibility warnings.

## Regression Checks For Recent Changes

- `RHFFileUploader` preserves previously selected files across multiple uploads.
- `RHFFileUploader` validation counts `existingFiles`.
- `RHFFileUploader` required validation passes when `existingFiles.length > 0`.
- `RHFFileUploader` `onUploadError` returns `[{ file, errors }]`.
- `RHFPhoneInput` stores object values after interaction.
- `RHFPhoneInput` country search works and keeps selected country for shared dial codes.
- `RHFTagsInput` tag callbacks use object args and `currentValue`.
- `RHFCountrySelect` uses a stable default option key.
- Picker components update RHF state from `onChange` for valid values.
- Components respect RHF `disabled` from `Controller`.

## Known Follow-Ups Before Automating Every Scenario

- Add `getOptionKey` support to autocomplete wrappers before enabling duplicate-label key-warning tests for those wrappers.
