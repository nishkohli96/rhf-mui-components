import { type CustomComponentIds } from '@/types';
import { fieldNameToId } from '@/utils';

export function useFieldIds(
  fieldName: string,
  customIds?: CustomComponentIds
) {
  const fieldId = fieldNameToId(fieldName);
  return {
    fieldId: customIds?.field ?? fieldId,
    labelId: customIds?.label ?? `${fieldId}-label`,
    helperTextId: customIds?.helperText ?? `${fieldId}-helper-text`,
    errorId: customIds?.error ?? `${fieldId}-error`
  };
}
