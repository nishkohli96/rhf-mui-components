export function generateLabelValueErrMsg(formElement: string) {
  return `Provide "labelKey" & "valueKey" props in ${formElement} if options are an array of objects.`;
}

export function generateDateAdapterErrMsg(formElement: string) {
  return `Missing "dateAdapter" for ${formElement}. Please wrap your component tree with "ConfigProvider dateAdapter={...}>" to configure it.`;
}

export function generateLargeOptionsErrMsg(
  formElement: string,
  optionsLength: number
) {
  return `[${formElement}]: options length (${optionsLength}) is relatively large. For better performance, searchability, and user experience, consider using RHFAutocomplete or RHFMuiAutocomplete instead.`;
}
