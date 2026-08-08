import { type MUIPhoneInputValue } from '@nish1896/mui-components/misc/phone-input';

export function getPhoneNoValue(value?: string | MUIPhoneInputValue) {
  return typeof value === 'string' ? value : value?.phoneNo;
}
