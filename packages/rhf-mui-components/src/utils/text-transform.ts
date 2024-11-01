/**
 * Convert a string, for example, "fullName" to "Full Name"
 * by splitting the string at each uppercase letter,
 * adding a space before each capital letter. This also works
 * with snake-case (e.g., last_name).
 */
export function fieldNameToLabel(str: string) {
  const result = str
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, char => char.toUpperCase())
    .trim();

  return result;
}

export function generateLabelValueErrMsg(formElement: string) {
  return `Provide "labelKey" & "valueKey" props in ${formElement} if options are an array of objects`;
}
