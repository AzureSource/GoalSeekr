// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: 'AIzaSyAnhcPEPH55md3azdoE3ITWapNEwIpZVDk',
  authDomain: 'goalseekr-eff36.firebaseapp.com',
  projectId: 'goalseekr-eff36',
  storageBucket: 'goalseekr-eff36.appspot.com',
  messagingSenderId: '193575622934',
  appId: '1:193575622934:web:98ee92d61fa35f5b93d837'

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
