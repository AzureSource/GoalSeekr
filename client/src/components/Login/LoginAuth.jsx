import React,{useState} from 'react';
import EnterUserName from './EnterUserName.jsx';

import {auth,provider} from '../../firebase.js';
import {signInWithPopup} from 'firebase/auth';

import '../../../assets/login.css';

export default function LoginAuth() {

  const [isAuth,setIsAuth] = useState(false);

  const signInWithGoogle = ()=>{
    signInWithPopup(auth,provider)
      .then((result)=>{
        console.log('show result auth: ',result);
        localStorage.setItem('isAuth',true);
        setIsAuth(true);
        const email = result.user.email;
        const profilePic = result.user.photoURL;
        const uid = result.user.uid;
      })
      .catch((err)=>{
        console.log(err);
      });
  };

  return (
    <div>
      <button className="login-with-google-btn" onClick = {signInWithGoogle}> Sign In With Google</button>;
      {isAuth && <EnterUserName />}
    </div>
  );

}




