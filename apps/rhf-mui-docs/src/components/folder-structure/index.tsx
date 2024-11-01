import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import FileView from './FileView';
import { FolderIcon, FolderOpenIcon, FileIcon } from './Icons';
import {
	muiPickersFoldersList,
	miscFoldersList 
} from './routesList';

const FolderStructure = () => {
  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<FolderOpenIcon />}
      defaultExpandIcon={<FolderIcon />}
      expanded={['1']}
    >
      <TreeItem
        nodeId="1"
        label="@nish1896/rhf-mui-components"
        collapseIcon={<FolderIcon />}
      >
				{/* <FileView
          nodeId='2'
					folderName='misc1'
					fileList={miscFoldersList}
				/>
				<FileView
          nodeId='3'
					folderName='mui-pickers'
					fileList={miscFoldersList}
				/> */}
				{/* <FileView
          nodeId='4'
					folderName='misc'
					fileList={miscFoldersList}
				/> */}
      </TreeItem>
    </TreeView>
  );
};

export default FolderStructure;
