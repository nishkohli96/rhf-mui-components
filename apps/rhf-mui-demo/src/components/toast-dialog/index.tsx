import Typography from '@mui/material/Typography';
import { type ToastContentProps } from 'react-toastify';

type CustomNotificationProps = ToastContentProps<{
  content: string;
  title?: string;
}>;

/**
 * ToastDialog component used as a custom content renderer for react-toastify.
 *
 * Displays an optional title and formatted content (typically JSON or text)
 * inside a toast notification.
 *
 * @param data - Object containing:
 *   - title (optional): Heading for the toast
 *   - content: Main content to display (stringified data)
 */
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
