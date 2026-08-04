import { type Ref } from 'react';
import type { Message, ValidationRule } from 'react-hook-form';

export function keepLabelAboveFormField(
  showLabelAboveFormField?: boolean,
  allLabelsAboveFields?: boolean
) {
  return Boolean(showLabelAboveFormField ?? allLabelsAboveFields);
}

/**
 * Whether the shared `FormLabel` should render above the control.
 * For components with **no** built-in label (e.g. `NativeSelect`, `Rating`), the
 * default is to show the label above unless overridden.
 *
 * Precedence: `allLabelsAboveFields` (config) → `showLabelAboveFormField` (prop) → `true`.
 *
 * Contrast with `keepLabelAboveFormField`, which defaults to `false` for controls
 * that already provide a floating/integrated label (e.g. `TextField`).
 */
export function resolveLabelAboveControl(
  showLabelAboveFormField?: boolean,
  allLabelsAboveFields?: boolean
): boolean {
  return allLabelsAboveFields ?? showLabelAboveFormField ?? true;
}

/**
 * Whether a field is required, combining the explicit `required` prop with
 * RHF's `registerOptions.required` validation rule — a boolean, a message
 * string (truthy), or a `{ value, message }` object.
 */
export function resolveRequired(
  required: boolean | undefined,
  registerRequired: Message | ValidationRule<boolean> | undefined
): boolean {
  const isRegisterRequired = typeof registerRequired === 'object'
    ? registerRequired.value
    : !!registerRequired;
  return !!required || isRegisterRequired;
}

export function mergeRefs<T>(...refs: (Ref<T> | undefined)[]) {
  return (value: T | null) => {
    refs.forEach(ref => {
      if (!ref) {
        return;
      }
      if (typeof ref === 'function') {
        ref(value);
      } else {
        (ref).current = value;
      }
    });
  };
}
