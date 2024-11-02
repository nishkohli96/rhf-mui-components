export function keepLabelAboveFormField(
  showLabelAboveFormField?: boolean,
  allLabelsAboveFormField?: boolean
) {
  return Boolean(showLabelAboveFormField ?? allLabelsAboveFormField);
}
