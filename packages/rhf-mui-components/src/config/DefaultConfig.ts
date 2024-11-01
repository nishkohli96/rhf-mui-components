import { RHFMuiConfig } from '@/types';

const DefaultStyles = Object.freeze({
  margin: {
    top: '0.25rem',
    bottom: '0.75rem',
    left: 0
  },
});

export const DefaultRHFMuiConfig: RHFMuiConfig = {
  defaultFormLabelSx: { mb: DefaultStyles.margin.bottom },
  defaultFormControlLabelSx: {},
  defaultFormHelperTextSx: {
    mt: DefaultStyles.margin.top,
    ml: DefaultStyles.margin.left
  }
};
