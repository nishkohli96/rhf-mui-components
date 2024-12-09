import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import Link from '@mui/material/Link';
import { VersionProps } from '@site/src/types';
import FileView from './FileView';
import { FolderIcon, FileIcon } from './Icons';
import {
  muiFoldersList,
  muiPickersFoldersList,
  miscFoldersList,
  newlyAddedComponents
} from './routesList';

const FolderStructure = ({ v1 }: VersionProps) => {
  const muiList = v1
    ? muiFoldersList.filter(folder => !newlyAddedComponents.includes(folder.name))
    : muiFoldersList;

  const miscList = v1
    ? miscFoldersList.filter(folder => !newlyAddedComponents.includes(folder.name))
    : miscFoldersList;

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
          fileList={muiPickersFoldersList}
        />
        <FileView
          itemId="4"
          folderName="misc"
          fileList={miscList}
        />
        <TreeItem
          itemId="5"
          label={(
            <Link href="/customization">
              config
            </Link>
          )}
          slots={{ icon: FileIcon }}
        />
        {!v1 && (
          <TreeItem
            itemId="6"
            label={(
              <Link href="/form-helpers">
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
