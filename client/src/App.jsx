import React from 'react';
import Counter from './components/actionsToolbar/attackModal/Counter';
import CreateGalaxy from './components/CreateGalaxy/CreateGalaxy.jsx';

const App = () => {
  return (
    <div className='appBackground'>
      <div className='app'>
        test
      </div>
      <CreateGalaxy />
      <Counter />
    </div>
  );
};

export default App;