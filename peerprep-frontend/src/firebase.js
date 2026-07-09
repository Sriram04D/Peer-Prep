import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBBvbo4fsMN_13dYEc7W3SXFTL-3HrHtYU",
  authDomain: "peerprep-ec799.firebaseapp.com",
  projectId: "peerprep-ec799",
  storageBucket: "peerprep-ec799.appspot.com",
  messagingSenderId: "855747648837",
  appId: "1:855747648837:web:4e2e1ffe4bad59e8b6b22c"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
