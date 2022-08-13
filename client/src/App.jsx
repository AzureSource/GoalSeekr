import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import TaskTracker from './components/TaskTracker/TaskTracker.jsx';

const App = () => {
  return (
    <ChakraProvider>
      <TaskTracker />
    </ChakraProvider>
  );
};

export default App;