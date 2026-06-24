import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import Link from '@mui/material/Link';
import { type VersionProps } from '@site/src/types';
import FileView from './FileView';
import { FolderIcon, FileIcon } from './Icons';
import {
  getMuiFoldersList,
  getMuiPickersFoldersList,
  getMiscFoldersList,
  newlyAddedComponents,
  newlyAddedV3_3Components,
} from './routesList';

const FolderStructure = ({ v1, v3_3AndAbove, docsVersion }: VersionProps) => {
  const muiFolders = getMuiFoldersList(docsVersion);
  let muiList;
  if (v1) {
    muiList = muiFolders.filter(
      folder => !newlyAddedComponents.includes(folder.name)
    );
  } else if (v3_3AndAbove) {
    muiList = muiFolders;
  } else {
    muiList = muiFolders.filter(
      folder => !newlyAddedV3_3Components.includes(folder.name)
    );
  }

  const miscList = v1
    ? getMiscFoldersList(docsVersion).filter(
      folder => !newlyAddedComponents.includes(folder.name)
    )
    : getMiscFoldersList(docsVersion);

  return (
    <SimpleTreeView
      aria-label="rhf-mui-components directory"
      defaultExpandedItems={['1']}
    >
      <TreeItem
        itemId="1"
        label="@nish1896/rhf-mui-components"
        slots={{ icon: FolderIcon }}
      >
        <FileView
          itemId="2"
          folderName="mui"
          fileList={muiList}
        />
        <FileView
          itemId="3"
          folderName="mui-pickers"
          fileList={getMuiPickersFoldersList(docsVersion)}
        />
        <FileView
          itemId="4"
          folderName="misc"
          fileList={miscList}
        />
        <TreeItem
          itemId="5"
          label={(
            <Link href="customization">
              config
            </Link>
          )}
          slots={{ icon: FileIcon }}
        />
        {!v1 && (
          <TreeItem
            itemId="6"
            label={(
              <Link href="form-helpers">
                form-helpers
              </Link>
            )}
            slots={{ icon: FileIcon }}
          />
        )}
      </TreeItem>
    </SimpleTreeView>
  );
};

export default FolderStructure;
