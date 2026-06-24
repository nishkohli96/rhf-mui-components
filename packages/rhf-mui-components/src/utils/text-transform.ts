/**
 * Function to generate easy-to-read form labels from a given string.
 *
 * Examples -
 * "fullName" to "Full Name"
 * "last_name" to "Last Name"
 * "parseJSONData" to "Parse JSON Data"
 * "enable_HTTP_Config" to "Enable HTTP Config"
 * users.0.email -> Users Email
 */
export function fieldNameToLabel(str: string) {
  return str
    // remove array indexes like .0 .1 .23
    .replace(/\.\d+/g, '')
    // replace separators with space
    .replace(/[._]/g, ' ')
    // split camelCase
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    // handle acronyms before words (JSONData -> JSON Data)
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    // capitalize words
    .replace(/\b\w/g, char => char.toUpperCase())
    // Trim leading/trailing spaces
    .trim();
}

export function fieldNameToId(fieldName: string): string {
  return fieldName
    .replace(/\[(\d+)\]/g, '-$1') // phones[0] -> phones-0
    .replace(/\./g, '-') // user.email -> user-email
    .replace(/[^a-zA-Z0-9-]/g, '-') // remove invalid characters
    .replace(/-+/g, '-') // collapse multiple dashes
    .replace(/^-|-$/g, ''); // trim leading/trailing dash
}

export function normalizeString(str: string) {
  return str.trim().toLowerCase().replace(/\s+/g, '');
}

/**
 * Strips/truncates pasted text to fit the active numeric constraints.
 * Returns `null` when nothing salvageable remains.
 *
 * @example
 * sanitizePastedNumber('43.234', false, true)      // '43'   (onlyIntegers)
 * sanitizePastedNumber('-43.5', true,  false)      // '43.5' (nonNegative strips '-')
 * sanitizePastedNumber('3.14159', false, false, 2) // '3.14' (maxDecimalPlaces=2)
 * sanitizePastedNumber('-3.999', false, true)      // '-3'   (both sign + integer)
 */
export function sanitizePastedNumber(
  raw: string,
  nonNegative: boolean,
  onlyIntegers: boolean,
  maxDecimalPlaces?: number,
): string | null {
  let s = raw.trim();
  if (!s) {
    return null;
  }

  /* Preserve sign only when negatives are allowed */
  let sign = '';
  if (s.startsWith('-')) {
    if (!nonNegative) {
      sign = '-';
    }
    s = s.slice(1);
  }

  /* Strip everything except digits and the first decimal point */
  s = s.replace(/[^0-9.]/g, '');
  const firstDot = s.indexOf('.');
  if (firstDot !== -1) {
    s = s.slice(0, firstDot + 1) + s.slice(firstDot + 1).replace(/\./g, '');
  }

  if (onlyIntegers) {
    s = s.split('.')[0];
  } else if (maxDecimalPlaces !== undefined) {
    const n = Math.max(0, Math.floor(maxDecimalPlaces));
    const [intPart, decPart] = s.split('.');
    s = decPart !== undefined
      ? intPart + (n > 0 ? `.${decPart.slice(0, n)}` : '')
      : intPart;
  }

  /* Strip trailing dot — paste should never leave an in-progress state */
  s = (sign + s).replace(/\.$/, '');
  return s || null;
}
