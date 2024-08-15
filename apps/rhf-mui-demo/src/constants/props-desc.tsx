import { Paragraph, Link, Code } from '@/components/page-heading';
import { ExternalLinks } from '@/constants';

export const PropsDesc = Object.freeze({
  fieldName: {
    name: 'fieldName',
    description: (
      <Paragraph>
        React Hook Form requires name as a key for the registration process
      </Paragraph>
    ),
    required: true
  },
  register: {
    name: 'register',
    description: (
      <Paragraph>
        The{' '}
        <Code>" register "</Code>{' '}
        option yielded on calling the
        <Code>useForm</Code>hook
      </Paragraph>
    ),
    required: true
  },
  registerOptions: {
    name: 'registerOptions',
    description: (
      <Paragraph>
        <Link href={ExternalLinks.rhf.register}>Register</Link>
        {' '}options if using react-hook-form without any validation libraries
      </Paragraph>
    ),
    required: false,
  },
  control: {
    name: 'control',
    description: (
      <Paragraph>
        The{' '}
        <Code>" control "</Code>{' '}
        option yielded on calling the
        <Code>useForm</Code> hook. Required when using
        <Code>RHFCheckbox</Code>,
        <Code>RHFCheckboxGroup</Code>,
        <Code>RHFRadioGroup</Code>,
        <Code>RHFRating</Code>and
        <Code>RHFSwitch</Code>
        components
      </Paragraph>
    ),
    required: true
  },
  setValue: {
    name: 'setValue',
    description: (
      <Paragraph>
        The{' '}
        <Code>" setValue "</Code>{' '}
        option yielded on calling the
        <Code>useForm</Code> hook. Required when using{' '}
        <Code>RHFDatePicker</Code>,
        <Code>RHFTimePicker</Code> and
        <Code>RHFDateTimeGroup</Code>
        components
      </Paragraph>
    ),
    required: true
  },
  onValueChange: {
    name: 'onValueChange',
    description: (
      <Paragraph>
        An optional callback function when the value of a field changes.
        Each component has its own 
        <Code>onValueChange</Code>
        method declaration in its documentation page
      </Paragraph>
    ),
    required: false
  },
  errorMessage: {
    name: 'errorMessage',
    description: (
      <Paragraph>
        Show field error message in{' '}
        <Link href={ExternalLinks.muiComponents.formHelperText}>
          FormHelperText
        </Link>
        {' '}component if it exists
      </Paragraph>
    ),
    required: false
  },
  hideErrorMessage: {
    name: 'hideErrorMessage',
    description: (
      <Paragraph>
        Prevent showing error message, if you want to retain formHelper text,
        even in case of an error in your form field
      </Paragraph>
    ),
    required: false,
  },
  showLabelAboveFormField: {
    name: 'showLabelAboveFormField',
    description: (
      <Paragraph>
        Render form label above the form field in{' '}
        <Link href={ExternalLinks.muiComponents.formLabel}>
          FormLabel
        </Link>
        {' '}component
      </Paragraph>
    ),
    required: false
  },
  formLabelProps: {
    name: 'formLabelProps',
    description: (
      <Paragraph>
        <Link href={ExternalLinks.muiComponents.formLabel}>
          FormLabel Props
        </Link>
        {' '}to customise css for a field.
      </Paragraph>
    ),
    required: false
  },
  formHelperTextProps: {
    name: 'formHelperTextProps',
    description: (
      <Paragraph>
        <Link href={ExternalLinks.muiComponents.formHelperText}>
          FormHelperText Props
        </Link>
        {' '}to customise css for a field.
      </Paragraph>
    ),
    required: false
  },
});
