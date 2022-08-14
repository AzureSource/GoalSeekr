import React from 'react';

import { signInWithGoogle } from './firebase.js';
import '../assets/login.css';
import { AspectRatio } from '@chakra-ui/react';
import background from '../assets/images/sparse sky.png';
import BuildShip from './components/buildShips/BuildShip.jsx';
import Counter from './components/actionsToolbar/attackModal/Counter';
import GalaxyWindow from './components/Galaxy Window/GalaxyWindow.jsx';
import Playerlist from './components/PlayerList.jsx';
import TaskTracker from './components/TaskTracker/TaskTracker.jsx';


const App = () => {

  return (
          {/*<button className="login-with-google-btn" onClick = {signInWithGoogle}> Sign In With Google</button>*/}
    <div className='appBackground'>
      <GalaxyWindow />
    </div>
  );
  
};
export default App;