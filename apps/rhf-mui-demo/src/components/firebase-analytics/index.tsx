'use client';

import { useEffect, Fragment } from 'react';
import { usePathname } from 'next/navigation';
import { logFirebaseEvent } from '@/utils';

export default function FirebaseAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      console.log('pathname: ', pathname);
      const trackAnalytics = async () => {
        await logFirebaseEvent('page_view', {
					page_location: pathname
				});
      };
      trackAnalytics();
    }
  }, [pathname]);

  return <Fragment />;
}
