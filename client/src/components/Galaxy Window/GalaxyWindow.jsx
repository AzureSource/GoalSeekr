import React from 'react';
import { Flex, Spacer } from '@chakra-ui/react';
import MenuSide from './MenuSide.jsx';
import MenuBottom from './MenuBottom.jsx';

export default function GalaxyWindow () {
  return (
    <div className='galaxy-window' color='white'>
      <Flex className='galaxy-window-top'>
        <MenuSide />
        <div className='temp-div'>
          planets
        </div>
      </Flex>
      <MenuBottom />
    </div>
  );
}