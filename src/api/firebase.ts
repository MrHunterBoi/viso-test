import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'viso-test-1acbb.firebaseapp.com',
  projectId: 'viso-test-1acbb',
  storageBucket: 'viso-test-1acbb.appspot.com',
  messagingSenderId: '556128881689',
  appId: '1:556128881689:web:79270af2b586f3491aae88',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
