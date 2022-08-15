import React from 'react';
import { Flex, Spacer } from '@chakra-ui/react';
import Playerlist  from '../list/PlayerList.jsx';
import BuildShip from '../buildShips/BuildShip.jsx';

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
      <br/>
      <BuildShip/>
    </Flex>

  );
};

export default MenuSide;