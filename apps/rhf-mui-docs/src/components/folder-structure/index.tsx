import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { VersionProps } from '@site/src/types';
import FileView from './FileView';
import { FolderIcon, FolderOpenIcon, FileIcon } from './Icons';
import {
  muiFoldersList,
  muiPickersFoldersList,
  miscFoldersList,
  newlyAddedComponents
} from './routesList';

const FolderStructure = ({ isV1 }: VersionProps) => {
  const muiList = isV1 
    ? muiFoldersList.filter(folder => !newlyAddedComponents.includes(folder.name))
    : muiFoldersList;

  const miscList = isV1
    ? miscFoldersList.filter(folder => !newlyAddedComponents.includes(folder.name))
    : miscFoldersList

  return (
    <TreeView
      aria-label="rhf-mui-components directory"
      defaultCollapseIcon={<FolderOpenIcon />}
      defaultExpandIcon={<FolderIcon />}
      defaultExpanded={['1']}
    >
      <TreeItem
        nodeId="1"
        label="@nish1896/rhf-mui-components"
        collapseIcon={<FolderIcon />}
      >
        <FileView
          nodeId="2"
          folderName="mui"
          fileList={muiList}
        />
        <FileView
          nodeId="3"
          folderName="mui-pickers"
          fileList={muiPickersFoldersList}
        />
        <FileView
          nodeId="4"
          folderName="misc"
          fileList={miscList}
        />
        <TreeItem
          nodeId="5"
          label="config"
          icon={<FileIcon />}
        />
        {!isV1 && (
          <TreeItem
            nodeId="6"
            label="form-helpers"
            icon={<FileIcon />}
          />
        )}
      </TreeItem>
    </TreeView>
  );
};

export default FolderStructure;
