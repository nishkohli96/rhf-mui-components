import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import MuiFolderIcon from '@mui/icons-material/Folder';
import MuiFolderOpenIcon from '@mui/icons-material/FolderOpen';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const FolderIcon = () => <MuiFolderIcon sx={{ color: '#f1d477' }} />;
const FolderOpenIcon = () => <MuiFolderOpenIcon sx={{ color: '#f1d477' }} />;

const FolderStructure = () => {
  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<FolderOpenIcon />}
      defaultExpandIcon={<FolderIcon />}
      expanded={['1']}
      // sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
      <TreeItem
        nodeId="1"
        label="@nish1896/rhf-mui-components"
        collapseIcon={<FolderIcon />}
      >
        <TreeItem nodeId="2" label="Calendar" icon={<InsertDriveFileIcon />} />
      </TreeItem>
    </TreeView>
  );
};

export default FolderStructure;
