import React from 'react';
import Title from './components/Lobby/TitleBar.jsx';
import Menu from './components/Lobby/Menu.jsx';
import '../assets/login.css';
import { AspectRatio } from '@chakra-ui/react';
import CreateGalaxy from './components/CreateGalaxy/CreateGalaxy.jsx';
import background from '../assets/images/sparse sky.png';
import BuildShip from './components/buildShips/BuildShip.jsx';
import Counter from './components/actionsToolbar/attackModal/Counter';
import GalaxyWindow from './components/Galaxy Window/GalaxyWindow.jsx';
import TaskTracker from './components/TaskTracker/TaskTracker.jsx';

const App = () => {

  return (
    <div className='appBackground'>
      <CreateGalaxy />
      {/* <Title />
      <Menu /> */}
      {/* <GalaxyWindow /> */}
    </div>
  );

};

export default App;