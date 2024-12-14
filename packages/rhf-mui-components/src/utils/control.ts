export function keepLabelAboveFormField(
  showLabelAboveFormField?: boolean,
  allLabelsAboveFields?: boolean
) {
  return Boolean(showLabelAboveFormField ?? allLabelsAboveFields);
}
