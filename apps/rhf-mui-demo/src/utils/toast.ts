import { toast } from 'react-toastify';
import { ToastDialog } from '@/components';

export function showToastMessage(msg: string) {
	toast.success(ToastDialog, {
		data: {
			content: msg,
		}
	});
}
