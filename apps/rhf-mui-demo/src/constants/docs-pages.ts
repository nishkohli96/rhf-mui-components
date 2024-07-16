import { Page } from '@/types';

const pagePrefix = '/docs';

export const DocsPageLinks: Page[] = [
	{
		title: 'Introduction',
		href: `${pagePrefix}/introduction`
	},
	{
		title: 'Inputs',
		href: `${pagePrefix}/inputs`,
		pages: [
			{
				title: 'TextField',
				href: `${pagePrefix}/inputs/RHFTextField`
			},
			{
				title: 'PasswordField',
				href: `${pagePrefix}/inputs/RHFPasswordField`
			},
		]
	},
	{
		title: 'Select',
		href: `${pagePrefix}/select`,
		pages: [
			{
				title: 'Mui',
				href: `${pagePrefix}/inputs/RHFSelect`
			},
			{
				title: 'Native',
				href: `${pagePrefix}/inputs/RHFNativeSelect`
			},
		]
	},
	{
		title: 'Checkbox',
		href: `${pagePrefix}/checkbox`,
		pages: [
			{
				title: 'Single',
				href: `${pagePrefix}/inputs/RHFCheckbox`
			},
			{
				title: 'Group',
				href: `${pagePrefix}/inputs/RHFCheckboxGroup`
			},
		]
	},
	{
		title: 'Radio-Group',
		href: `${pagePrefix}/RHFRadioGroup`,
	},
	{
		title: 'Switch',
		href: `${pagePrefix}/RHFSwitch`,
	},
	{
		title: 'Slider',
		href: `${pagePrefix}/RHFSlider`,
	},
	{
		title: 'Rating',
		href: `${pagePrefix}/RHFRating`,
	},
	{
		title: 'Pickers',
		href: `${pagePrefix}/pickers`,
		pages: [
			{
				title: 'Date Picker',
				href: `${pagePrefix}/pickers/RHFDatePicker`
			},
			{
				title: 'Time Picker',
				href: `${pagePrefix}/pickers/RHFTimePicker`
			},
			{
				title: 'Date-Time Picker',
				href: `${pagePrefix}/pickers/RHFDateTimePicker`
			},
		]
	},
]