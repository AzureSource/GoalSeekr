import React from 'react';
import { Flex, Spacer } from '@chakra-ui/react';
import Stats from './lowerToolbar/Stats.jsx';
import Chats from './Chats/Chats.jsx';

const MenuBottom = () => {
  return (
    <Flex className='menu-bottom'>
      <Flex className='menu-bottom-container'>
        <Stats />
        {/* add chats componenet below. Give name chats-container */}
        <Chats />
      </Flex>
    </Flex>
  );
};

export default MenuBottom;