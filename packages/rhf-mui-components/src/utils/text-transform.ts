
export function fieldNameToId(fieldName: string): string {
  return fieldName
    .replace(/\[(\d+)\]/g, '-$1') // phones[0] -> phones-0
    .replace(/\./g, '-') // user.email -> user-email
    .replace(/[^a-zA-Z0-9-]/g, '-') // remove invalid characters
    .replace(/-+/g, '-') // collapse multiple dashes
    .replace(/^-|-$/g, ''); // trim leading/trailing dash
}
