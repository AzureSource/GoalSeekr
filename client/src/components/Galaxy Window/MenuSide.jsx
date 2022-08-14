import React from 'react';
import { Flex, Spacer } from '@chakra-ui/react';
import Playerlist  from '../list/PlayerList.jsx';

const MenuSide = () => {
  return (
    <Flex
      className='menu-side-container'
      justify='center'
      alignItems='center'
      margin='2rem'
      width='20%'
      display='block'
    >
      <Playerlist />
      all side menu components
    </Flex>

  );
};

export default MenuSide;