import React from 'react';
import Counter from './components/actionsToolbar/attackModal/Counter';
import GalaxyWindow from './components/Galaxy Window/GalaxyWindow.jsx';

const App = () => {
  return (
    <div className='appBackground'>
      <div className='app'>
        <GalaxyWindow className='galaxyWindow' />
      </div>
      <Counter />
    </div>
  );
};

export default App;