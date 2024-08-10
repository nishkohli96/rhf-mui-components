import { Paragraph, Link, Code } from '@site/src/components/page-heading';
import { ExternalLinks } from '@site/src/constants';

export const PropsDesc = Object.freeze({
  fieldName: {
    name: 'fieldName',
    description: 'React Hook Form requires `name` as a key for the registration process',
    isRequired: true,
    type: 'string'
  },
  register: {
    name: 'register',
    description: 'The `register` option yielded on calling the `useForm` hook',
    isRequired: true,
    type: 'UserFormRegister'
  },
  // registerOptions: {
  //   name: 'registerOptions',
  //   description: (
  //     <Paragraph>
  //       <Link href={ExternalLinks.rhf.register}>Register</Link>
  //       {' '}options if using react-hook-form without any validation libraries
  //     </Paragraph>
  //   ),
  //   isRequired: false,
  // },
  // control: {
  //   name: 'control',
  //   description: (
  //     <Paragraph>
  //       The{' '}
  //       <Code>" control "</Code>{' '}
  //       option yielded on calling the
  //       <Code>useForm</Code> hook. Required when using
  //       <Code>RHFCheckbox</Code>,
  //       <Code>RHFCheckboxGroup</Code>,
  //       <Code>RHFRadioGroup</Code>,
  //       <Code>RHFRating</Code>and
  //       <Code>RHFSwitch</Code>
  //       components
  //     </Paragraph>
  //   ),
  //   isRequired: true
  // },
  // setValue: {
  //   name: 'setValue',
  //   description: (
  //     <Paragraph>
  //       The{' '}
  //       <Code>" setValue "</Code>{' '}
  //       option yielded on calling the
  //       <Code>useForm</Code> hook. Required when using{' '}
  //       <Code>RHFDatePicker</Code>,
  //       <Code>RHFTimePicker</Code> and
  //       <Code>RHFDateTimeGroup</Code>
  //       components
  //     </Paragraph>
  //   ),
  //   isRequired: true
  // },
  // onValueChange: {
  //   name: 'onValueChange',
  //   description: (
  //     <Paragraph>
  //       An optional callback function when the value of a field changes.
  //       Each component has its own 
  //       <Code>onValueChange</Code>
  //       method declaration in its documentation page
  //     </Paragraph>
  //   ),
  //   isRequired: false
  // },
  // errorMsg: {
  //   name: 'errorMsg',
  //   description: (
  //     <Paragraph>
  //       Show field error message in{' '}
  //       <Link href={ExternalLinks.muiComponents.formHelperText}>
  //         FormHelperText
  //       </Link>
  //       {' '}component if it exists
  //     </Paragraph>
  //   ),
  //   isRequired: false
  // },
  // hideErrorMsg: {
  //   name: 'hideErrorMsg',
  //   description: (
  //     <Paragraph>
  //       Prevent showing error message, if you want to retain formHelper text,
  //       even in case of an error in your form field
  //     </Paragraph>
  //   ),
  //   isRequired: false,
  // },
  // showLabelAboveFormField: {
  //   name: 'showLabelAboveFormField',
  //   description: (
  //     <Paragraph>
  //       Render form label above the form field in{' '}
  //       <Link href={ExternalLinks.muiComponents.formLabel}>
  //         FormLabel
  //       </Link>
  //       {' '}component
  //     </Paragraph>
  //   ),
  //   isRequired: false
  // },
  // formLabelProps: {
  //   name: 'formLabelProps',
  //   description: (
  //     <Paragraph>
  //       <Link href={ExternalLinks.muiComponents.formLabel}>
  //         FormLabel Props
  //       </Link>
  //       {' '}to customise css for a field.
  //     </Paragraph>
  //   ),
  //   isRequired: false
  // },
  // formHelperTextProps: {
  //   name: 'formHelperTextProps',
  //   description: (
  //     <Paragraph>
  //       <Link href={ExternalLinks.muiComponents.formHelperText}>
  //         FormHelperText Props
  //       </Link>
  //       {' '}to customise css for a field.
  //     </Paragraph>
  //   ),
  //   isRequired: false
  // },
});
