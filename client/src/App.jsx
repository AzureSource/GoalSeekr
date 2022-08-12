import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

const App = () => {
  return (
    <ChakraProvider>
      <div className='app'>App</div>
    </ChakraProvider>
  );
};

export default App;