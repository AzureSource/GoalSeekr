import React from 'react';
import { Flex, Spacer } from '@chakra-ui/react';
import Stats from './lowerToolbar/Stats.jsx';

const MenuBottom = () => {
  return (
    <Flex className='menu-bottom'>
      <Flex className='menu-bottom-container'>
        <Stats />
        <div className='chats-container'>
          chats
        </div>
      </Flex>
    </Flex>
  );
};

export default MenuBottom;