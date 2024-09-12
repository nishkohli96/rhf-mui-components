import { Page } from '@site/src/types';

const pagePrefix = '/demo';

export const DemoPageLinks: Page[] = [
  {
    title: 'TextField & Password Input',
    href: `${pagePrefix}/textfield-and-passwordfield`
  },
  {
    title: 'Select with Class-Validator',
    href: `${pagePrefix}/select-with-class-validator`
  },
  {
    title: 'Checkbox & RadioGroup with zod',
    href: `${pagePrefix}/checkbox-and-radiogroup-with-zod`
  },
  {
    title: 'Switch, Slider & Rating with superstruct',
    href: `${pagePrefix}/switch-slider-rating-with-superstruct`
  },
  {
    title: 'Date & Time Pickers',
    href: `${pagePrefix}/date-time-pickers`
  },
  {
    title: 'Styled Form with Config Provider',
    href: `${pagePrefix}/styled-form-with-reusable-component`
  },
  {
    title: 'Miscellaneous Components',
    href: `${pagePrefix}/miscellaneous-components`
  },
  {
    title: 'Complete Form with Joi validation',
    href: `${pagePrefix}/complete-form-with-joi`
  }
];
