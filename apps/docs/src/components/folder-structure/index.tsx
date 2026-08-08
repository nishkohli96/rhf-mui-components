'use client';

import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { type VersionProps } from '@/types';
import FileView from './FileView';
import { FolderIcon, FileIcon } from './Icons';
import {
  getMuiFoldersList,
  getMuiPickersFoldersList,
  getMiscFoldersList
} from './routesList';

export default function FolderStructure({ docsVersion }: VersionProps) {
  const muiList = getMuiFoldersList(docsVersion);
  const muiPickersList = getMuiPickersFoldersList(docsVersion);
  const miscList = getMiscFoldersList(docsVersion);

  return (
    <SimpleTreeView
      aria-label="mui-components directory"
      defaultExpandedItems={['1']}
    >
      <TreeItem
        itemId="1"
        label="@nish1896/mui-components"
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
          fileList={muiPickersList}
        />
        <FileView
          itemId="4"
          folderName="misc"
          fileList={miscList}
        />
        <TreeItem
          itemId="5"
          label="config"
          slots={{ icon: FileIcon }}
        />
        <TreeItem
          itemId="6"
          label="form-helpers"
          slots={{ icon: FileIcon }}
        />
      </TreeItem>
    </SimpleTreeView>
  );
}
