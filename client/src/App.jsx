import React from 'react';

import { signInWithGoogle } from './firebase.js';
import '../assets/login.css';
import { AspectRatio } from '@chakra-ui/react';
import background from '../assets/images/sparse sky.png';
import BuildShip from './components/buildShips/BuildShip.jsx';
import Counter from './components/actionsToolbar/attackModal/Counter';
import GalaxyWindow from './components/Galaxy Window/GalaxyWindow.jsx';
import TaskTracker from './components/TaskTracker/TaskTracker.jsx';

const App = () => {

  return (

    <div className='appBackground'>
      <div className='app'>
        <GalaxyWindow className='galaxyWindow' />
      </div>
      {/*<button className="login-with-google-btn" onClick = {signInWithGoogle}> Sign In With Google</button>*/}
    </div>
  );

};

export default App;