import React from 'react';
import { Flex } from '@chakra-ui/react';
import Playerlist  from '../list/PlayerList.jsx';
import BuildShip from '../buildShips/BuildShip.jsx';
import MissionModule from './actionsToolbar/missionModule/MissionModule.jsx';

const MenuSide = () => {
  return (
    <Flex
      className='menu-side-container'
      justify='center'
      alignItems='center'
      margin='2rem'
      width='min-content'
      display='block'
    >
      <Playerlist />
      <br/>
      <BuildShip/>
      <MissionModule />
    </Flex>

  );
};

export default MenuSide;