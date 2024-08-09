import { Fragment } from 'react';
import { Paragraph, Link, Code } from '@site/src/components/page-heading';
import { ExternalLinks } from '@site/src/constants';

export const TypesDesc = Object.freeze({
	fieldName: {
		name: 'fieldName',
		description: 'ReactNode',
		isRequired: true
	},
	register: {
		name: 'register',
		description: (
			<Link href={ExternalLinks.rhf.register}>
				UseFormRegister
			</Link>
		),
		isRequired: true
	},
	registerOptions: {
		name: 'registerOptions',
		description: (
			<Link href={ExternalLinks.rhf.register}>
				RegisterOptions
			</Link>
		),
		isRequired: false
	},
	errorMsg: {
		name: 'errorMsg',
		description: 'ReactNode',
		isRequired: false
	},
	hideErrorMsg: {
		name: 'hideErrorMsg',
		description: 'boolean',
		isRequired: false
	},
	showLabelAboveFormField: {
		name: 'showLabelAboveFormField',
		description: 'boolean',
		isRequired: false
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
		isRequired: false
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
		isRequired: false
	},
	onValueChange_Input: {
		name: 'onValueChange',
		description: '(e: ChangeEvent) => void',
		isRequired: false
	},
})