import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAwSV6J_kHSMo-c7-TrVT16V3X6bZ2ikxY",
  authDomain: "biomed-lab-web.firebaseapp.com",
  projectId: "biomed-lab-web",
  storageBucket: "biomed-lab-web.firebasestorage.app",
  messagingSenderId: "32714755672",
  appId: "1:32714755672:web:ebda06374a772f714ec42d",
  measurementId: "G-N4FMPFQZ69"
};

// Initialize Firebase (only once)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firebase Authentication
export const auth = getAuth(app);

export default app;
