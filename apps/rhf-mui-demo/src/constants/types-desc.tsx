import { Fragment } from 'react';
import { Paragraph, Link, Code } from '@/components/page-heading';
import { ExternalLinks } from '@/constants';

export const TypesDesc = Object.freeze({
	fieldName: {
		name: 'fieldName',
		description: 'ReactNode',
		required: true
	},
	register: {
		name: 'register',
		description: (
			<Link href={ExternalLinks.rhf.register}>
				UseFormRegister
			</Link>
		),
		required: true
	},
	registerOptions: {
		name: 'registerOptions',
		description: (
			<Link href={ExternalLinks.rhf.register}>
				RegisterOptions
			</Link>
		),
		required: false
	},
	errorMsg: {
		name: 'errorMsg',
		description: 'ReactNode',
		required: false
	},
	hideErrorMsg: {
		name: 'hideErrorMsg',
		description: 'boolean',
		required: false
	},
	showLabelAboveFormField: {
		name: 'showLabelAboveFormField',
		description: 'boolean',
		required: false
	},
	formLabelProps: {
		name: 'formLabelProps',
		description: (
			<Fragment>
				{'Omit<'}
				<Link href={ExternalLinks.muiComponents.formLabel}>
					FormLabelProps
				</Link>
				{', "error">'}
			</Fragment>
		),
		required: false
	},
	formHelperTextProps: {
		name: 'formHelperTextProps',
		description: (
			<Fragment>
				{'Omit<'}
				<Link href={ExternalLinks.muiComponents.formHelperText}>
					FormHelperTextProps
				</Link>
				{', "children" | "error">'}
			</Fragment>
		),
		required: false
	},
	onValueChange_Default: {
		name: 'onValueChange',
		description: '(e: ChangeEvent) => void',
		required: false
	},
})