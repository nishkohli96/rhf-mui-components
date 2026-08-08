/**
 * Adapters that normalize a form library's native error shape into the
 * `string | string[]` that every @nish1896/mui-components field's
 * `errorMessage` prop accepts.
 */

/**
 * TanStack Form's `field.state.meta.errors` is an array that may nest — a
 * validator returning `string[]` yields `[[ruleA, ruleB]]`. Flatten one level
 * and keep the resolved strings.
 */
export function tanstackErrors(errors: unknown[]): string[] {
  return errors.flat().filter((error): error is string => typeof error === 'string');
}

/**
 * Formik surfaces `touched && errors.x` as `string | string[] | false`.
 * Collapse the `false` (untouched) case to `undefined` so the field clears.
 */
export function formikError<T extends string | string[]>(
  error: T | false | undefined
): T | undefined {
  return error === false ? undefined : error;
}
