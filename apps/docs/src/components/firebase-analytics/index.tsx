'use client';

import { Fragment, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function FirebaseAnalytics() {
  const pathName = usePathname();

  useEffect(() => {
    if (!pathName) {
      return;
    }
    (async () => {
      try {
        const { logFirebaseEvent } = await import('@/utils');
        await logFirebaseEvent('page_view', { pathName });
      } catch (error) {
        console.error('Failed to log Firebase page_view event:', error);
      }
    })();
  }, [pathName]);

  return <Fragment />;
}
