/**
 * Function to generate easy-to-read form labels from a given string.
 *
 * Examples -
 * "fullName" to "Full Name"
 * "last_name" to "Last Name"
 * "parseJSONData" to "Parse JSON Data"
 * "enable_HTTP_Config" to "Enable HTTP Config"
 */
export function fieldNameToLabel(str: string) {
  const result = str
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Split camelCase or PascalCase
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2') // Handle acronyms followed by capitalized words
    .replace(/_/g, ' ') // Replace underscores with spaces
    .replace(/\b([A-Z]+)\b/g, match => match.toUpperCase()) // Preserve full uppercase words (acronyms)
    .replace(/\b\w/g, char => char.toUpperCase()) // Capitalize first letters
    .trim(); // Trim leading/trailing spaces

  return result;
}


export function generateLabelValueErrMsg(formElement: string) {
  return `Provide "labelKey" & "valueKey" props in ${formElement} if options are an array of objects.`;
}
