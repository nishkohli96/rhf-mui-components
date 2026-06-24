import { type RHFPhoneInputValue } from '@nish1896/rhf-mui-components/misc/phone-input';

export function getPhoneNoValue(value?: string | RHFPhoneInputValue) {
  return typeof value === 'string' ? value : value?.phoneNo;
}
