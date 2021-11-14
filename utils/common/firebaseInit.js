import { getApps, initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';

const firebaseInit = () => {
  if (getApps.length === 0) {
    initializeApp({
      apiKey: process.env.apiKey,
      authDomain: process.env.authDomain,
      projectId: process.env.projectId,
      storageBucket: process.env.storageBucket,
      messagingSenderId: process.env.messagingSenderId,
      appId: process.env.appId,
      measurementId: process.env.measurementId,
    });
    // getAnalytics();
  }
};

export default firebaseInit;
