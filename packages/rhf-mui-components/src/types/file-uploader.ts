export type FileInputProps = {
	accept?: string;
	multiple?: boolean;
	maxSize?: number;
	disabled?: boolean;
}

export type FileInputError = 'FILE_SIZE_EXCEED' | 'FILE_TYPE_NOT_ALLOWED';
