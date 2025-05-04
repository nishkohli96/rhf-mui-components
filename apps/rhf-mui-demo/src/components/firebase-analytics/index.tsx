'use client';

import { Fragment, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function FirebaseAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) {
      return;
    }
    (async () => {
      try {
        const { logFirebaseEvent } = await import('@/utils');
        await logFirebaseEvent('page_view', { page_location: pathname });
      } catch (error) {
        console.error('Failed to log Firebase page_view event:', error);
      }
    })();
  }, [pathname]);

  return <Fragment />;
}
