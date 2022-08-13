import React from 'react';
import Counter from './components/actionsToolbar/attackModal/Counter';
import BuildShip from './components/buildShips/BuildShip.jsx';
import Playerlist from './components/PlayerList.jsx';

const App = () => {
  return (
    <div className='appBackground'>
      <div className='app'>
        test
      </div>

      <Counter />
      <BuildShip/>
    </div>
  );
};

export default App;