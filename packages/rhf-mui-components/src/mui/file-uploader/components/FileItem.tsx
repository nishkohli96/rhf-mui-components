import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { getFileSize } from '@/utils';

type FileItemProps = {
  index: number;
  file: File;
  showFileSize?: boolean;
  removeFile: (index: number) => void;
};

const FileItem = ({
  index,
  file,
  showFileSize,
  removeFile
}: FileItemProps) => {
  const fileText = `${file.name} ${showFileSize ? `(${getFileSize(file.size)})` : ''}`;
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Typography>
        {fileText.trim()}
      </Typography>
      <IconButton size="small" onClick={() => removeFile(index)}>
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default FileItem;
