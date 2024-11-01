import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { FileIcon } from './Icons';

type FileViewProps = {
	nodeId: string;
	folderName: string;
	fileList: {
    name: string;
    path: string;
  }[];
}

const FileView = ({
	nodeId,
  folderName,
	fileList
}: FileViewProps) => {
	return (
		<TreeItem
      nodeId={nodeId}
      label={folderName}
    >
			{fileList.map((file, idx) => (
        <TreeItem
          nodeId={`${nodeId}/${idx+1}`}
					label={file.name}
					icon={<FileIcon />}
				/>
			))}
    </TreeItem>
	);
}

export default FileView;
