import { TreeItem } from '@mui/x-tree-view/TreeItem';
import Link from '@mui/material/Link';
import { FolderIcon, FolderOpenIcon, FileIcon } from './Icons';

type FileViewProps = {
  itemId: string;
  folderName: string;
  fileList: {
    name: string;
    path: string;
  }[];
};

const FileView = ({
  itemId,
  folderName,
  fileList
}: FileViewProps) => {
  return (
    <TreeItem
      itemId={itemId}
      label={folderName}
      slots={{
        expandIcon: FolderIcon,
        collapseIcon: FolderOpenIcon
      }}
    >
      {fileList.map((file, idx) => (
        <TreeItem
          itemId={`${itemId}/${idx + 1}`}
          key={`${itemId}/${idx + 1}`}
          label={(
            <Link href={file.path}>
              {file.name}
            </Link>
          )}
          slots={{ icon: FileIcon }}
        />
      ))}
    </TreeItem>
  );
};

export default FileView;
