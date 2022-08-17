import React from 'react';
import { Flex, Spacer } from '@chakra-ui/react';
import Stats from './lowerToolbar/Stats.jsx';

const MenuBottom = () => {
  return (
    <Flex className='menu-bottom'>
      <div className='menu-bottom-container'>
        <Stats />
      </div>
    </Flex>
  );
};

export default MenuBottom;