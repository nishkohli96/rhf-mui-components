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
});
