/**
 * Props reference rows for every component, defined per component in files
 * mirroring the package structure (`mui` / `mui-pickers` / `misc`). Shared
 * descriptions live in `descriptions.ts`; the `componentProps` record below
 * is what doc pages feed into `PropsTable`.
 *
 * Each row-builder is a function of `PropsDescriptionArgs` — props that link
 * to MUI/MUI X docs resolve their URL from `muiVersion`/`muiPickersVersion`
 * (see `descriptions.ts`).
 *
 * One row set is built per docs version, since each documents a different MUI
 * major. The current docs target the latest MUI, so they pass no version at
 * all and link to the unprefixed `mui.com` — which always resolves to latest —
 * rather than pinning a `vN.mui.com` host that would go stale on the next
 * MUI release.
 */

import type { PropsInfo, PropsDescriptionArgs, DocsVersion } from '@/types';
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
 * Current docs (v2, MUI v9). Deliberately empty: omitting the versions makes
 * every generated URL unprefixed (`https://mui.com/...`), which always points
 * at the latest MUI docs.
 */
export const latestVersionArgs: PropsDescriptionArgs = {};

/** v1 docs, which documented MUI v7 and MUI X Date Pickers v8. */
export const v1VersionArgs: PropsDescriptionArgs = {
  muiVersion: 7,
  muiPickersVersion: 8
};

const buildComponentProps = (
  args: PropsDescriptionArgs,
  docsVersion?: DocsVersion
): Record<string, PropsInfo[]> =>
  Object.freeze({
    RHFTextField: textFieldRows(args),
    RHFPasswordInput: passwordInputRows(args, docsVersion),
    RHFNumberInput: numberInputRows(args),
    RHFTagsInput: tagsInputRows(args),
    RHFFileUploader: fileUploaderRows(args),
    RHFSelect: selectRows(args, docsVersion),
    RHFNativeSelect: nativeSelectRows(args),
    RHFAutocomplete: autocompleteRows(args, docsVersion),
    RHFAutocompleteObject: autocompleteObjectRows(args, docsVersion),
    RHFCountrySelect: countrySelectRows(args),
    RHFMultiAutocomplete: multiAutocompleteRows(args, docsVersion),
    RHFMultiAutocompleteObject: multiAutocompleteObjectRows(args, docsVersion),
    RHFCheckbox: checkboxRows(args),
    RHFCheckboxGroup: checkboxGroupRows(args),
    RHFRadioGroup: radioGroupRows(args),
    RHFSwitch: switchRows(args),
    RHFSlider: sliderRows(args),
    RHFRating: ratingRows(args),

    /* All four variants per family (responsive/desktop/mobile/static) share one row set. */
    RHFDatePicker: datePickerRows(args),
    RHFTimePicker: timePickerRows(args),
    RHFDateTimePicker: dateTimePickerRows(args),

    RHFColorPicker: colorPickerRows(args),
    RHFRichTextEditor: richTextEditorRows(args),
    RHFPhoneInput: phoneInputRows(args, docsVersion)
  });

/** Props rows for the current docs — consumed by `app/**` pages. */
export const componentProps = buildComponentProps(latestVersionArgs);

/** Props rows for the v1 docs — consumed by `app/v1/**` pages. */
export const componentPropsV1 = buildComponentProps(v1VersionArgs, 1);
