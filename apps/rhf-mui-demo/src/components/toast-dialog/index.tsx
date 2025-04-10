import Typography from '@mui/material/Typography';
import { ToastContentProps, toast } from 'react-toastify';

type CustomNotificationProps = ToastContentProps<{
  content: string;
  title?: string;
}>;

const ToastDialog = ({
  data,
  toastProps,
}: CustomNotificationProps) => {
  return (
    <div className="flex flex-col w-full">
      <Typography variant='h6' component='h6' color='success'>
        {data.title ?? 'Form Submitted with values:'}
      </Typography>
      <Typography variant='body1'>
        {data.content}
      </Typography>
    </div>
  );
}

export default ToastDialog;
