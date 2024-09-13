/**
 * Convert a string, for example, "fullName" to "Full Name"
 * by splitting the string at each uppercase letter,
 * adding a space before each capital letter.
 */
export function fieldNameToLabel(str: string) {
  const result = str.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
}

export function generateLabelValueErrMsg(formElement: string) {
  return `Provide "labelKey" & "valueKey" props in ${formElement} if options are an array of objects`;
}
