/**
 * Props reference rows for every component, defined per component in files
 * mirroring the package structure (`mui` / `mui-pickers` / `misc`). Shared
 * descriptions live in `descriptions.ts`; the `componentProps` record below
 * is what doc pages feed into `PropsTable`.
 *
 * Each row-builder is a function of `PropsDescriptionArgs` — props that link
 * to MUI/MUI X docs resolve their URL from `muiVersion`/`muiXVersion`
 * (see `descriptions.ts`).
 *
 * One row set is built per docs version, since each documents a different MUI
 * major. The current docs target the latest MUI, so they pass no version at
 * all and link to the unprefixed `mui.com` — which always resolves to latest —
 * rather than pinning a `vN.mui.com` host that would go stale on the next
 * MUI release.
 */

import type { PropsInfo, VersionProps } from '@/types';
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

/**
 * Current docs (v5, MUI v9). Deliberately empty: omitting the versions makes
 * every generated URL unprefixed (`https://mui.com/...`), which always points
 * at the latest MUI docs.
 */
export const latestVersionArgs: VersionProps = {
  v4AndAbove: true
};

/** v1 docs, which documented MUI v5 and MUI X Date Pickers v6. */
export const v1VersionArgs: VersionProps = {
  docsVersion: 1,
  muiVersion: 5,
  muiXVersion: 6,
  v1: true
};

/** v2 docs, which documented MUI v6 and MUI X Date Pickers v7. */
export const v2VersionArgs: VersionProps = {
  docsVersion: 2,
  muiVersion: 6,
  muiXVersion: 7,
  v2: true
};

/** v3 docs, which documented MUI v7 and MUI X Date Pickers v8. */
export const v3VersionArgs: VersionProps = {
  docsVersion: 3,
  muiVersion: 7,
  muiXVersion: 8,
  v3AndAbove: true,
};

/** v4 docs, which documented MUI v7 and MUI X Date Pickers v8. */
export const v4VersionArgs: VersionProps = {
  docsVersion: 4,
  muiVersion: 7,
  muiXVersion: 8,
  v4AndAbove: true
};

const buildComponentProps = (args: VersionProps) => {
  return Object.freeze({
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

    /*
     * Misc components: also kept as raw row-builders, same as `Introduction`
     * above — their doc pages pass `docsVersion`/`muiVersion`/`v1`/etc.
     * straight to `<PropsTable>` instead of picking from a precomputed
     * per-version record.
     */
    RHFColorPicker: colorPickerRows,
    RHFRichTextEditor: richTextEditorRows,
    RHFPhoneInput: phoneInputRows
  });
};

/** Props rows for the current docs — consumed by `app/**` pages. */
export const componentProps = buildComponentProps(latestVersionArgs);

/** Props rows for the v1 docs — consumed by `app/v1/**` pages. */
export const componentPropsV1 = buildComponentProps(v1VersionArgs);

/** Props rows for the v2 docs — consumed by `app/v2/**` pages. */
export const componentPropsV2 = buildComponentProps(v2VersionArgs);

/** Props rows for the v3 docs — consumed by `app/v3/**` pages. */
export const componentPropsV3 = buildComponentProps(v3VersionArgs);

/** Props rows for the v4 docs — consumed by `app/v4/**` pages. */
export const componentPropsV4 = buildComponentProps(v4VersionArgs);
