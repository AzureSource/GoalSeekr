import React from 'react';
import { Flex, Spacer } from '@chakra-ui/react';
import Playerlist from '../list/PlayerList.jsx';

const MenuSide = () => {
  return (
    <Flex className='menu-side'
      justify='center'
    >
      <Flex
        className='menu-side-container'
        justify='center'
        alignItems='center'
      >
        <Playerlist />
        all side menu components
      </Flex>

    </Flex>
  );
};

export default MenuSide;