import React from 'react';
import Counter from './components/actionsToolbar/attackModal/Counter';
import BuildShip from './components/buildShips/BuildShip.jsx';

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