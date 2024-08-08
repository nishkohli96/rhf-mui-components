import { Paragraph, Link } from '@/components/page-heading';
import { ExternalLinks } from '@/constants';

export const PropsDesc = Object.freeze({
  fieldName: {
    name: 'fieldName',
    description: (
      <Paragraph>
        React Hook Form requires name as a key for the registration process.
      </Paragraph>
    ),
    isRequired: true,
  },
  register: {
    name: 'register',
    description: (
      <Paragraph>
        The{' '}
        <b>
          <i>register</i>
        </b>{' '}
        option yielded on calling the
        <span className="code">useForm</span> hook.
      </Paragraph>
    ),
    isRequired: true,
  },
  registerOptions: {
    name: 'registerOptions',
    description: (
      <Paragraph>
        <Link href={ExternalLinks.rhf.register}>Register options</Link>
        if using rhf without any validation libraries
      </Paragraph>
    ),
    isRequired: false,
  },
  control: {
    name: 'control',
    description: (
      <Paragraph>
        The{' '}
        <b>
          <i>control</i>
        </b>{' '}
        option yielded on calling the
        <span className="code">useForm</span> hook. Required when using{' '}
        <span className="code">
          RHFCheckbox, RHFCheckboxGroup, RHFRadioGroup, RHFRating, RHFSwitch
        </span>
        components.
      </Paragraph>
    ),
    isRequired: true,
  },
  setValue: {
    name: 'setValue',
    description: (
      <Paragraph>
        The{' '}
        <b>
          <i>setValue</i>
        </b>{' '}
        option yielded on calling the
        <span className="code">useForm</span> hook. Required when using{' '}
        <span className="code">
          RHFDatePicker, RHFTimePicker, RHFDateTimeGroup
        </span>
        components.
      </Paragraph>
    ),
    isRequired: true,
  },
  onValueChange: {
    name: 'onValueChange',
    description: <Paragraph>The</Paragraph>,
    isRequired: false,
  },
  errorMsg: {
    name: 'errorMsg',
    description: <Paragraph>The</Paragraph>,
    isRequired: true,
  },
  hideErrorMsg: {
    name: 'hideErrorMsg',
    description: <Paragraph>The</Paragraph>,
    isRequired: true,
  },
  showLabelAboveFormField: {
    name: 'showLabelAboveFormField',
    description: <Paragraph>The</Paragraph>,
    isRequired: true,
  },
  formLabelProps: {
    name: 'formLabelProps',
    description: <Paragraph>The</Paragraph>,
    isRequired: true,
  },
  formHelperTextProps: {
    name: 'formHelperTextProps',
    description: <Paragraph>The</Paragraph>,
    isRequired: true,
  },
});
