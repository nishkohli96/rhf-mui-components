import MuiFolderIcon from '@mui/icons-material/Folder';
import MuiFolderOpenIcon from '@mui/icons-material/FolderOpen';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const fileIconColor = '#f1d477';

export const FolderIcon = () => (
  <MuiFolderIcon
    sx={{ color: fileIconColor }}
  />
);

export const FolderOpenIcon = () => (
  <MuiFolderOpenIcon
    sx={{ color: fileIconColor }}
  />
);

export const FileIcon = () => (
  <InsertDriveFileIcon />
);
