import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY_FIREBASE,
  authDomain: 'lyricsapp-76075.firebaseapp.com',
  projectId: 'lyricsapp-76075',
  storageBucket: 'lyricsapp-76075.firebasestorage.app',
  messagingSenderId: '641770859748',
  appId: '1:641770859748:web:0e54f7f9c002954d82d0f1',
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
