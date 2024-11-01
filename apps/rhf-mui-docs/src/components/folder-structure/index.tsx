import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import FileView from './FileView';
import { FolderIcon, FolderOpenIcon } from './Icons';
import {
	muiFoldersList,
	muiPickersFoldersList,
	miscFoldersList
} from './routesList';

const FolderStructure = () => {
  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<FolderOpenIcon />}
      defaultExpandIcon={<FolderIcon />}
    >
      <TreeItem
        nodeId="1"
        label="@nish1896/rhf-mui-components"
        collapseIcon={<FolderIcon />}
      >
        <FileView
          nodeId='2'
					folderName='mui'
					fileList={muiFoldersList}
				/>
				<FileView
          nodeId='3'
					folderName='mui-pickers'
					fileList={muiPickersFoldersList}
				/> 
				<FileView
          nodeId='4'
					folderName='misc'
					fileList={miscFoldersList}
				/>
			</TreeItem>
    </TreeView>
  );
};

export default FolderStructure;
