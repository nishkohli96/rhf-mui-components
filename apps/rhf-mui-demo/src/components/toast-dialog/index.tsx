import Typography from '@mui/material/Typography';
import { type ToastContentProps } from 'react-toastify';

type CustomNotificationProps = ToastContentProps<{
  content: string;
  title?: string;
}>;

const ToastDialog = ({
  data,
}: CustomNotificationProps) => {
  return (
    <div>
      <Typography variant="h6" component="h6" color="success">
        {data.title ?? 'Form Submitted with values:'}
      </Typography>
      <Typography component="div">
        <pre>
          {data.content}
        </pre>
      </Typography>
    </div>
  );
};

export default ToastDialog;
