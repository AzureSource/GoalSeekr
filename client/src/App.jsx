import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import TaskTracker from './components/TaskTracker/TaskTracker.jsx';
import Counter from './components/actionsToolbar/attackModal/Counter';
<<<<<<< HEAD
import CreateGalaxy from './components/CreateGalaxy/CreateGalaxy.jsx';

const App = () => {
  return (
    <div>
      <div className='app'>
        test
      </div>
      <CreateGalaxy />
      <Counter />
    </div>
=======
import BuildShip from './components/buildShips/BuildShip.jsx';
import Playerlist from './components/PlayerList.jsx';

const App = () => {
  return (
    <ChakraProvider>
      <div className='appBackground'>
        <div className='app'>
          test
          <Counter />
          <BuildShip/>
        </div>
      </div>
    </ChakraProvider>

>>>>>>> main
  );
};

export default App;