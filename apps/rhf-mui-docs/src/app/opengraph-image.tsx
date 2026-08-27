import { ImageResponse } from 'next/og';
import { defaultPageTitle, defaultPageDescription } from '@/constants';

export const alt = defaultPageTitle;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/* Build-time generated social card — no external assets or fonts. */
const OpengraphImage = () =>
  new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #0a0f1e 0%, #131b33 100%)',
          color: '#fff',
          fontFamily: 'sans-serif'
        }}
      >
        <div style={{ fontSize: 40, color: '#7ea6ff', fontWeight: 700 }}>
          @nish1896/rhf-mui-components
        </div>
        <div style={{ fontSize: 76, fontWeight: 800, marginTop: 24, lineHeight: 1.1 }}>
          {defaultPageTitle}
        </div>
        <div style={{ fontSize: 34, color: '#c3cad9', marginTop: 28, lineHeight: 1.35 }}>
          {defaultPageDescription}
        </div>
      </div>
    ),
    size
  );

export default OpengraphImage;
