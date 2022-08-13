import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../assets/styles.js';
import App from './App.jsx';
import { ChakraProvider } from '@chakra-ui/react';


document.documentElement.setAttribute('lang', 'en');
const container = document.createElement('div');
container.setAttribute('id', 'root');
document.body.appendChild(container);
const root = createRoot(container);


root.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);
