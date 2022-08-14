import React from 'react';
import { AspectRatio } from '@chakra-ui/react';
import background from '../assets/images/sparse sky.png';
import TaskTracker from './components/TaskTracker/TaskTracker.jsx';
import Counter from './components/actionsToolbar/attackModal/Counter';
import BuildShip from './components/buildShips/BuildShip.jsx';
import Playerlist from './components/PlayerList.jsx';

import GalaxyWindow from './components/Galaxy Window/GalaxyWindow.jsx';

const App = () => {

  return (
    <div className='appBackground'>
      <GalaxyWindow />
    </div>
  );
};
export default App;