import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import Link from '@mui/material/Link';
import { type VersionProps } from '@site/src/types';
import FileView from './FileView';
import { FolderIcon, FileIcon } from './Icons';
import {
  muiFoldersList,
  muiPickersFoldersList,
  miscFoldersList,
  newlyAddedComponents_v2,
  newlyAddedComponents_v3_3,
} from './routesList';

const FolderStructure = ({ v1, v3_3AndAbove }: VersionProps) => {

  const getMuiList = () => {
    if (v1) {
      return muiFoldersList.filter(
        folder =>
          ![...newlyAddedComponents_v2, ...newlyAddedComponents_v3_3].includes(
            folder.name
          )
      );
    }
    if (!v3_3AndAbove) {
      return muiFoldersList.filter(
        folder => !newlyAddedComponents_v3_3.includes(folder.name)
      );
    }
    return muiFoldersList;
  };

  const muiList = getMuiList();

  const miscList = v1
    ? miscFoldersList.filter(folder => !newlyAddedComponents_v2.includes(folder.name))
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
