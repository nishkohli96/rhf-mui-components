export function reqdMsg(fieldName: string) {
	return `Please enter ${fieldName}`
}

export function minCharMsg(min: number) {
	return `Enter a minimum of ${min} characters`;
}

export function maxCharMsg(max: number) {
	return `No more than ${max} characters are allowed`;
}
