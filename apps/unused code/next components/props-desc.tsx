import { Paragraph } from '@/components/page-heading';

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
});
