import { CreateFormDialogContext } from '@/context/form-dialog-context';
import { useContext } from 'react';

export function useFormDialog() {
  const ctx = useContext(CreateFormDialogContext);
  if (!ctx) {
    throw new Error('useFormDialog must be used within CreateFormDialogProvider');
  }
  return ctx;
}
