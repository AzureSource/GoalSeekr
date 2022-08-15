import React from 'react';

import LoginAuth from './components/login/LoginAuth.jsx';
import { AspectRatio } from '@chakra-ui/react';
import background from '../assets/images/sparse sky.png';
import BuildShip from './components/buildShips/BuildShip.jsx';
import Counter from './components/actionsToolbar/attackModal/Counter';
import GalaxyWindow from './components/Galaxy Window/GalaxyWindow.jsx';
import TaskTracker from './components/TaskTracker/TaskTracker.jsx';

const App = () => {

  return (

    <div className='appBackground'>
      <LoginAuth />
      <GalaxyWindow />
    </div>
  );

};

export default App;