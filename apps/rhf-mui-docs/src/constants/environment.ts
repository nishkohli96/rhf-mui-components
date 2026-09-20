export const envVariables = {
  algoliaConfig: {
    appId: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
    apiKey: process.env.NEXT_PUBLIC_ALGOLIA_API_KEY as string,
    indexName: process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME as string,
  },
  firebaseConfig: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN as string,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID as string,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID as string,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID as string,
  }
};
