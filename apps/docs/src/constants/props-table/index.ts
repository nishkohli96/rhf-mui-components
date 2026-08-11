/**
 * Props reference rows for every component, defined per component in files
 * mirroring the package structure (`mui` / `mui-pickers` / `misc`). Shared
 * descriptions live in `descriptions.ts`; the `componentProps` record below
 * is what doc pages feed into `PropsTable`.
 *
 * Each entry is the raw row-builder function, not a precomputed array: doc
 * pages pass `docsVersion`/`muiVersion`/`v1`/`v2`/`v3AndAbove`/`v4AndAbove`
 * straight to `<PropsTable>`, which forwards them to the builder. This keeps
 * one row set per component regardless of how many docs versions reference
 * it, rather than precomputing a separate array per version.
 */

import { default as introductionPageRows } from './introduction';
import textFieldRows from './mui/textfield';
import passwordInputRows from './mui/password-input';
import numberInputRows from './mui/number-input';
import tagsInputRows from './mui/tags-input';
import fileUploaderRows from './mui/file-uploader';
import selectRows from './mui/select';
import nativeSelectRows from './mui/native-select';
import autocompleteRows from './mui/autocomplete';
import autocompleteObjectRows from './mui/autocomplete-object';
import multiAutocompleteRows from './mui/multi-autocomplete';
import multiAutocompleteObjectRows from './mui/multi-autocomplete-object';
import countrySelectRows from './mui/country-select';
import checkboxRows from './mui/checkbox';
import checkboxGroupRows from './mui/checkbox-group';
import radioGroupRows from './mui/radio-group';
import switchRows from './mui/switch';
import sliderRows from './mui/slider';
import ratingRows from './mui/rating';
import { datePickerRows } from './mui-pickers/date';
import { timePickerRows } from './mui-pickers/time';
import { dateTimePickerRows } from './mui-pickers/date-time';
import colorPickerRows from './misc/color-picker';
import phoneInputRows from './misc/phone-input';
import richTextEditorRows from './misc/rich-text-editor';

export { PropsDescription } from './descriptions/latest';
export { PropsDescription_v1 } from './descriptions/v1';

/** Props row-builders for every component — consumed by `<PropsTable>` across every docs version. */
export const componentProps = Object.freeze({
  Introduction: introductionPageRows,
  RHFTextField: textFieldRows,
  RHFPasswordInput: passwordInputRows,
  RHFNumberInput: numberInputRows,
  RHFTagsInput: tagsInputRows,
  RHFFileUploader: fileUploaderRows,
  RHFSelect: selectRows,
  RHFNativeSelect: nativeSelectRows,
  RHFAutocomplete: autocompleteRows,
  RHFAutocompleteObject: autocompleteObjectRows,
  RHFCountrySelect: countrySelectRows,
  RHFMultiAutocomplete: multiAutocompleteRows,
  RHFMultiAutocompleteObject: multiAutocompleteObjectRows,
  RHFCheckbox: checkboxRows,
  RHFCheckboxGroup: checkboxGroupRows,
  RHFRadioGroup: radioGroupRows,
  RHFSwitch: switchRows,
  RHFSlider: sliderRows,
  RHFRating: ratingRows,

  /* All four variants per family (responsive/desktop/mobile/static) share one row set. */
  RHFDatePicker: datePickerRows,
  RHFTimePicker: timePickerRows,
  RHFDateTimePicker: dateTimePickerRows,

  RHFColorPicker: colorPickerRows,
  RHFRichTextEditor: richTextEditorRows,
  RHFPhoneInput: phoneInputRows
});
