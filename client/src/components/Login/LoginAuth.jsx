import React,{ useState, useEffect } from 'react';
import EnterUserName from './EnterUserName.jsx';
import { Flex } from '@chakra-ui/react';

import {auth,provider} from '../../firebase.js';
import {signInWithPopup} from 'firebase/auth';


export default function LoginAuth({ setTitle }) {

  const [isAuth,setIsAuth] = useState(false);
  const [authData,setAuthdata]=useState({});
  const signInWithGoogle = ()=>{
    signInWithPopup(auth,provider)
      .then((result)=>{
        //console.log('show result auth: ',result);
        setIsAuth(true);
        const obj = {
          email: result.user.email,
          googleuid:result.user.uid,
          photoURL:result.user.photoURL
        };
        setAuthdata(obj);
      })
      .catch((err)=>{
        console.log(err);
      });
  };

  useEffect(() => setTitle(true), []);

  return (
    <Flex
      className='lobby-menu-container'
      justify='center'
      align='center'
    >
      <Flex
        className='lobby-menu'
        justify='center'
        align='center'
      >
        {!isAuth && <button className="login-with-google-btn" onClick = {signInWithGoogle}> Sign In With Google</button>}
        {isAuth && <EnterUserName authData={authData}/>}
      </Flex>
    </Flex>
  );

}




