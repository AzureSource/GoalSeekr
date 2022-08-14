import React from 'react';

import { signInWithGoogle } from './firebase.js';
import '../assets/login.css';
import { AspectRatio } from '@chakra-ui/react';
import background from '../assets/images/sparse sky.png';
import Counter from './components/actionsToolbar/attackModal/Counter';
import GalaxyWindow from './components/Galaxy Window/GalaxyWindow.jsx';
import TaskTracker from './components/TaskTracker/TaskTracker.jsx';

const App = () => {

  return (

    <div className='appBackground'>
      {/*<button className="login-with-google-btn" onClick = {signInWithGoogle}> Sign In With Google</button>*/}
      <GalaxyWindow />
    </div>
  );

};

export default App;
