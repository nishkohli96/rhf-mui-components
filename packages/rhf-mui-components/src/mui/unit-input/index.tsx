'use client';

import {
  useContext,
  forwardRef,
  type JSX,
  type ReactNode,
  type Ref
} from 'react';
import {
  Controller,
  type FieldError,
  type FieldValues,
  type Path,
  type Control,
  type RegisterOptions
} from 'react-hook-form';
import MUIUnitInput, {
  type MUIUnitInputProps
} from '@nish1896/mui-components/mui/unit-input';
import type { StrObjOption } from '@nish1896/mui-components/types';
import {
  type FormLabelProps,
  type FormHelperTextProps,
  type CustomOnChangeProps
} from '@/common';
import { RHFMuiConfigContext } from '@/config/ConfigProvider';
import {
  keepLabelAboveFormField,
  mergeRefs,
  mergeSx,
  resolveRequired
} from '@/utils';

type UnitInputPropsBase<
  Option extends StrObjOption,
  LabelKey extends Extract<keyof Option, string>,
  ValueKey extends Extract<keyof Option, string>
> = MUIUnitInputProps<Option, LabelKey, ValueKey>;

/** Value stored by the field: the chosen `unit` and the numeric `value`. */
type UnitInputValue<
  Option extends StrObjOption,
  LabelKey extends Extract<keyof Option, string>,
  ValueKey extends Extract<keyof Option, string>
> = NonNullable<UnitInputPropsBase<Option, LabelKey, ValueKey>['value']>;

type OnValueChangeProps<
  Option extends StrObjOption,
  LabelKey extends Extract<keyof Option, string>,
  ValueKey extends Extract<keyof Option, string>
> = Parameters<UnitInputPropsBase<Option, LabelKey, ValueKey>['onValueChange']>[0];

export type RHFUnitInputProps<
  T extends FieldValues,
  Option extends StrObjOption = StrObjOption,
  LabelKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
  ValueKey extends Extract<keyof Option, string> = Extract<keyof Option, string>
> = {
  /**
   * Name/path of the React Hook Form field this component controls.
   * The field stores an object: `{ unit, value }`.
   */
  fieldName: Path<T>;
  /**
   * React Hook Form control object returned by `useForm`.
   */
  control: Control<T>;
  /**
   * Validation rules passed to React Hook Form for this field.
   * The rules receive the whole `{ unit, value }` object. Errors reported on the
   * nested `<field>.value` or `<field>.unit` paths (for example by a schema
   * resolver) are shown as well.
   */
  registerOptions?: RegisterOptions<T, Path<T>>;
  /**
   * Options of the unit dropdown: an array of strings, or of objects when
   * `labelKey` and `valueKey` are set.
   */
  unitOptions: UnitInputPropsBase<Option, LabelKey, ValueKey>['unitOptions'];
  /**
   * Property used as each unit's visible label. Required for object options.
   */
  labelKey?: LabelKey;
  /**
   * Property used as each unit's value. Required for object options.
   */
  valueKey?: ValueKey;
  /**
   * Overrides the default unit input change handling.
   * Receives the next `{ unit, value }` object and the original change event.
   * Call `rhfOnChange` with the object that should be stored; else the form value will not be updated.
   *
   * @param rhfOnChange - React Hook Form field change handler for the `{ unit, value }` object.
   * @param newValue - Next `{ unit, value }` object.
   * @param event - Original change event of the number input or the unit select.
   */
  customOnChange?: ({
    rhfOnChange,
    newValue,
    event
  }: CustomOnChangeProps<
    OnValueChangeProps<Option, LabelKey, ValueKey>,
    UnitInputValue<Option, LabelKey, ValueKey>
  >) => void;
  /**
   * Called after the default unit input handler stores the next `{ unit, value }`
   * object in React Hook Form.
   *
   * ⚠️ Important:
   * This callback is not called when `customOnChange` is used.
   *
   * @param newValue - Next `{ unit, value }` object.
   * @param event - Original change event of the number input or the unit select.
   */
  onValueChange?: ({
    newValue,
    event
  }: OnValueChangeProps<Option, LabelKey, ValueKey>) => void;
  /**
   * Lower bound of the number. An out-of-range value is clamped on blur.
   */
  min?: UnitInputPropsBase<Option, LabelKey, ValueKey>['min'];
  /**
   * Upper bound of the number. An out-of-range value is clamped on blur.
   */
  max?: UnitInputPropsBase<Option, LabelKey, ValueKey>['max'];
  /**
   * When true, only whole numbers are accepted.
   */
  onlyIntegers?: UnitInputPropsBase<Option, LabelKey, ValueKey>['onlyIntegers'];
  /**
   * When true, negative numbers are not accepted.
   */
  nonNegative?: UnitInputPropsBase<Option, LabelKey, ValueKey>['nonNegative'];
  /**
   * Maximum number of digits allowed after the decimal point.
   */
  maxDecimalPlaces?: UnitInputPropsBase<Option, LabelKey, ValueKey>['maxDecimalPlaces'];
  /**
   * The amount to increase/decrease the value by with the arrow keys.
   */
  stepAmount?: UnitInputPropsBase<Option, LabelKey, ValueKey>['stepAmount'];
  /**
   * Formats the number for display while the number input is not focused.
   */
  renderValue?: UnitInputPropsBase<Option, LabelKey, ValueKey>['renderValue'];
  /**
   * Which side of the number the unit dropdown sits on.
   * @default 'end'
   */
  unitPosition?: UnitInputPropsBase<Option, LabelKey, ValueKey>['unitPosition'];
  /**
   * Width of the unit dropdown segment. Accepts a responsive value.
   */
  unitWidth?: UnitInputPropsBase<Option, LabelKey, ValueKey>['unitWidth'];
  /**
   * Props forwarded to the unit `Select`.
   */
  unitSelectProps?: UnitInputPropsBase<Option, LabelKey, ValueKey>['unitSelectProps'];
  /**
   * Props forwarded to the number input.
   */
  valueInputProps?: UnitInputPropsBase<Option, LabelKey, ValueKey>['valueInputProps'];
  /**
   * Props forwarded to the `Box` that wraps both segments.
   */
  containerProps?: UnitInputPropsBase<Option, LabelKey, ValueKey>['containerProps'];
  /**
   * Props forwarded to the divider between the two segments.
   */
  dividerProps?: UnitInputPropsBase<Option, LabelKey, ValueKey>['dividerProps'];
  /**
   * Label content shown for the field. Defaults to a label generated from `fieldName`.
   */
  label?: ReactNode;
  /**
   * When `true`, renders the label above the component instead of within the field layout.
   */
  showLabelAboveFormField?: boolean;
  /**
   * Props forwarded to the internal `FormLabel`. The `id` is managed by the component.
   */
  formLabelProps?: Omit<FormLabelProps, 'id'>;
  /**
   * When true, hides the rendered field label while preserving accessible labeling where possible.
   */
  hideLabel?: boolean;
  /**
   * When true, marks the field as required in the UI and accessibility attributes.
   */
  required?: boolean;
  /**
   * Placeholder of the number input.
   */
  placeholder?: string;
  /**
   * Disables both the number input and the unit dropdown.
   */
  disabled?: boolean;
  /**
   * Custom renderer for the React Hook Form field error.
   * Receives the current field error and must return renderable content, such as `error.message` or a custom element.
   *
   * @param error - React Hook Form field error for this field.
   */
  renderError?: (error: FieldError) => ReactNode;
  /**
   * If true, hides the error message text while keeping the field in an error state.
   */
  hideErrorMessage?: boolean;
  /**
   * Helper text shown below the field when there is no visible validation error.
   */
  helperText?: ReactNode;
  /**
   * Props forwarded to the internal `FormHelperText`. The `id` is managed by the component.
   */
  formHelperTextProps?: Omit<FormHelperTextProps, 'id'>;
  /**
   * Custom ids for the unit and value elements.
   */
  customIds?: UnitInputPropsBase<Option, LabelKey, ValueKey>['customIds'];
};

const RHFUnitInputInner = forwardRef(function RHFUnitInput<
  T extends FieldValues,
  Option extends StrObjOption = StrObjOption,
  LabelKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
  ValueKey extends Extract<keyof Option, string> = Extract<keyof Option, string>
>({
  fieldName,
  control,
  registerOptions,
  customOnChange,
  onValueChange,
  unitSelectProps,
  valueInputProps,
  disabled: muiDisabled,
  showLabelAboveFormField,
  formLabelProps,
  required,
  renderError,
  formHelperTextProps,
  ...otherUnitInputProps
}: RHFUnitInputProps<T, Option, LabelKey, ValueKey>, ref: Ref<HTMLInputElement>) {
  const {
    allLabelsAboveFields,
    defaultFormLabelSx,
    defaultFormHelperTextSx
  } = useContext(RHFMuiConfigContext);

  const isLabelAboveFormField = keepLabelAboveFormField(
    showLabelAboveFormField,
    allLabelsAboveFields
  );
  const isFieldRequired = resolveRequired(required, registerOptions?.required);

  const {
    sx: formLabelSx,
    ...otherFormLabelProps
  } = formLabelProps ?? {};
  const {
    sx: formHelperTextSx,
    ...otherFormHelperTextProps
  } = formHelperTextProps ?? {};

  return (
    <Controller
      name={fieldName}
      control={control}
      rules={registerOptions}
      render={({
        field: {
          name: rhfFieldName,
          value: rhfValue,
          onChange: rhfOnChange,
          onBlur: rhfOnBlur,
          ref: rhfRef,
          disabled: rhfDisabled
        },
        fieldState: { error: fieldStateError }
      }) => {
        const isDisabled = muiDisabled || rhfDisabled;
        /*
         * A schema resolver reports errors on the nested paths (`<field>.value`,
         * `<field>.unit`) rather than on the field itself, so fall back to them.
         */
        const nestedErrors = fieldStateError as
          | Partial<Record<'unit' | 'value', FieldError>>
          | undefined;
        const fieldError = fieldStateError?.message
          ? fieldStateError
          : nestedErrors?.value ?? nestedErrors?.unit ?? fieldStateError;

        return (
          <MUIUnitInput<Option, LabelKey, ValueKey>
            {...otherUnitInputProps}
            fieldName={{
              unit: `${rhfFieldName}.unit`,
              value: `${rhfFieldName}.value`
            }}
            value={rhfValue}
            onValueChange={({ newValue, event }) => {
              if (customOnChange) {
                customOnChange({ rhfOnChange, newValue, event });
                return;
              }
              rhfOnChange(newValue);
              onValueChange?.({ newValue, event });
            }}
            unitSelectProps={{
              ...unitSelectProps,
              onBlur: blurEvent => {
                rhfOnBlur();
                unitSelectProps?.onBlur?.(blurEvent);
              }
            }}
            valueInputProps={{
              ...valueInputProps,
              inputRef: mergeRefs(rhfRef, ref, valueInputProps?.inputRef),
              onBlur: blurEvent => {
                rhfOnBlur();
                valueInputProps?.onBlur?.(blurEvent);
              }
            }}
            disabled={isDisabled}
            showLabelAboveFormField={isLabelAboveFormField}
            formLabelProps={{
              ...otherFormLabelProps,
              sx: mergeSx(defaultFormLabelSx, formLabelSx)
            }}
            required={isFieldRequired}
            errorMessage={fieldError?.message?.toString()}
            renderError={() => fieldError
              ? renderError?.(fieldError)
              : undefined}
            formHelperTextProps={{
              ...otherFormHelperTextProps,
              sx: mergeSx(defaultFormHelperTextSx, formHelperTextSx)
            }}
          />
        );
      }}
    />
  );
});

/**
 * Controlled number input paired with a unit dropdown (for example a weight
 * with `kg` / `lb`), wired to a React Hook Form field via `control`.
 *
 * The field stores a single object, `{ unit, value }`, where `value` is a
 * `number` or `null`. The number follows the same rules as `RHFNumberInput`.
 *
 * Docs: [RHFUnitInput](https://rhf-mui-components.vercel.app/components/mui/RHFUnitInput)
 *
 * API: [RHFUnitInputProps](https://rhf-mui-components.vercel.app/components/mui/RHFUnitInput#api)
 */
const RHFUnitInput = RHFUnitInputInner as <
  T extends FieldValues,
  Option extends StrObjOption = StrObjOption,
  LabelKey extends Extract<keyof Option, string> = Extract<keyof Option, string>,
  ValueKey extends Extract<keyof Option, string> = Extract<keyof Option, string>
>(
  props: RHFUnitInputProps<T, Option, LabelKey, ValueKey> & {
    ref?: Ref<HTMLInputElement>;
  }
) => JSX.Element;

export default RHFUnitInput;
