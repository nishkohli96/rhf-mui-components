import { fieldNameToId } from '@/utils';

export function useFieldIds(fieldName: string) {
  const fieldId = fieldNameToId(fieldName);
  return {
    fieldId,
    labelId: `${fieldId}-label`,
    helperTextId: `${fieldId}-helper-text`,
    errorId: `${fieldId}-error`
  };
}
