import { ENV_VARS } from './env-vars';
import { Page } from '@/types';

const sandboxRoute = ENV_VARS.SANDBOX_URL;
const sandboxPrefix = 'CodeSandbox - '
const commonRoute = 'https://github.com/nishkohli96/rhf-mui-components/tree/main/apps/rhf-mui-demo/src/forms';

export const SourceCodeLinks: Record<string, Page> = {
  inputs: {
		title: 'Inputs with Register Options',
		href: `${commonRoute}/inputs-with-register-options/index.tsx`
	},
	select: {
		title: 'Select',
		href: `${commonRoute}/select-with-class-validator/index.tsx`
	},
	checkboxRadio: {
		title: 'Checkbox & Radio with Zod',
		href: `${commonRoute}/checkbox-and-radiogroup-with-zod/index.tsx`
	},
	switchSliderRating: {
		title: 'Switch, Slider & Rating with Superstruct',
		href: `${commonRoute}/switch-slider-rating-with-superstruct/index.tsx`
	},
	dateTimePickers: {
		title: 'Date & Time Pickers',
		href: `${commonRoute}/date-time-pickers/index.tsx`
	},
	miscellaneous: {
		title: 'Miscellaneous Components',
		href: `${commonRoute}/miscellaneous-components/index.tsx`
	},
	styledFormComponent: {
		title: 'Styled Form with reusable component',
		href: `${commonRoute}/styled-form-with-reusable-component/index.tsx`
	},
	completeForm: {
		title: 'Complete Form with Joi',
		href: `${commonRoute}/complete-form-with-joi/index.tsx`
	}
}

export const CodeSandboxLinks: Record<string, Page> = {
  inputs: {
		title: `${sandboxPrefix}Inputs with Register Options`,
		href: `${sandboxRoute}/inputs-with-register-options/index.tsx`
	},
	select: {
		title: `${sandboxPrefix}Select`,
		href: `${sandboxRoute}/select-with-class-validator/index.tsx`
	},
	checkboxRadio: {
		title: `${sandboxPrefix}Checkbox & Radio with Zod`,
		href: `${sandboxRoute}/checkbox-and-radiogroup-with-zod/index.tsx`
	},
	switchSliderRating: {
		title: `${sandboxPrefix}Switch, Slider & Rating with Superstruct`,
		href: `${sandboxRoute}/switch-slider-rating-with-superstruct/index.tsx`
	},
	dateTimePickers: {
		title: `${sandboxPrefix}Date & Time Pickers`,
		href: `${sandboxRoute}/date-time-pickers/index.tsx`
	},
	miscellaneous: {
		title: `${sandboxPrefix}Miscellaneous Components`,
		href: `${sandboxRoute}/miscellaneous-components/index.tsx`
	},
	styledFormComponent: {
		title: `${sandboxPrefix}Styled Form with reusable component`,
		href: `${sandboxRoute}/styled-form-with-reusable-component/index.tsx`
	},
	completeForm: {
		title: `${sandboxPrefix}Complete Form with Joi`,
		href: `${sandboxRoute}/complete-form-with-joi/index.tsx`
	}
}