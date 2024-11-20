import { Page } from '@/types';

const pagePrefix = '';

export const DemoPageLinks: Page[] = [
  {
    title: 'Introduction',
    href: '/'
  },
  {
    title: 'TextField & PasswordInput',
    href: `${pagePrefix}/textfield-and-passwordinput`
  },
  {
    title: 'Select',
    href: `${pagePrefix}/select`
  },
  {
    title: 'Country Select',
    href: `${pagePrefix}/country-select`
  },
  {
    title: 'Checkbox & RadioGroup',
    href: `${pagePrefix}/checkbox-and-radiogroup`
  },
  {
    title: 'Switch, Slider & Rating',
    href: `${pagePrefix}/switch-slider-rating`
  },
  {
    title: 'Date & Time Pickers',
    href: `${pagePrefix}/date-time-pickers`
  },
  {
    title: 'Miscellaneous Components',
    href: `${pagePrefix}/miscellaneous-components`
  },
  {
    title: 'Customization',
    href: `${pagePrefix}/customization`
  },
  {
    title: 'Complete Form',
    href: `${pagePrefix}/complete-form`
  }
];
