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
