import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import TaskTracker from './components/TaskTracker/TaskTracker.jsx';
import Counter from './components/actionsToolbar/attackModal/Counter';

const App = () => {
  return (
    <ChakraProvider>
      <div className='appBackground'>
        <div className='app'>
          test
        </div>
        <Counter />
        <TaskTracker />
      </div>
    </ChakraProvider>
  );
};

export default App;