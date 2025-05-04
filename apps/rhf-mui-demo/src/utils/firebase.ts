import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported, logEvent } from 'firebase/analytics';
import { ENV_VARS } from '@/constants';

const firebaseApp = initializeApp(ENV_VARS.firebaseConfig);

const analyticsPromise = typeof window !== 'undefined'
  ? isSupported().then(supported =>
      supported ? getAnalytics(firebaseApp) : undefined
    )
  : Promise.resolve(undefined);

export async function logFirebaseEvent(
  eventName: string = 'page_view',
  eventParams?: Record<string, unknown>
) {
  const analytics = await analyticsPromise;
  if (analytics) {
    logEvent(analytics, eventName, eventParams);
  }
}
