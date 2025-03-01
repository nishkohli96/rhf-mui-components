export type FileInputProps = {
	multiple?: boolean;
	accept?: string;
	disabled?: boolean;
	maxSize?: number;
}

export type FileInputError = 'FILE_SIZE_EXCEED' | 'FILE_TYPE_NOT_ALLOWED';
