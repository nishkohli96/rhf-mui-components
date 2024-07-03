/**
 * To convert a string say "fullName" to "Full Name"
 * by splitting the string at each uppercase letter,
 * adding a space before each match, and converting
 * to array.
 */
export function fieldNameToLabel(str: string) {
  const result = str.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
}

export function generateLabelValueErrMsg(formElement: string): string {
  return `Provide "labelKey" & "valueKey" props in ${formElement} if options are an array of objects`;
}
