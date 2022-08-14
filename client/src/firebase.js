// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
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

const provider = new GoogleAuthProvider();
export const signInWithGoogle = ()=>{
  signInWithPopup(auth,provider)
    .then((result)=>{
      console.log('show result auth: ',result);
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;
    })
    .catch((err)=>{
      console.log(err);
    });
};