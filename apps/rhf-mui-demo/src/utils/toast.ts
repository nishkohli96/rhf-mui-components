import { toast } from 'react-toastify';
import { ToastDialog } from '@/components';
import { printJSONObject } from '@/utils';

export function showToastMessage(
  msg: object | string,
  type: 'error' | 'success' = 'success'
) {
  const msgContent = typeof msg === 'string' ? msg : printJSONObject(msg);
  toast(ToastDialog, {
    autoClose: 10000,
    data: {
      content: msgContent
    },
    type
  });
}
