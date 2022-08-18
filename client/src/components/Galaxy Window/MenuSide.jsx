import React from 'react';
import { Flex, Button } from '@chakra-ui/react';
import Playerlist  from '../list/PlayerList.jsx';
import BuildShip from '../buildShips/BuildShip.jsx';
import MissionModule from './actionsToolbar/missionModule/MissionModule.jsx';

const MenuSide = () => {
  return (
    <Flex
      className='menu-side-container'
      flexDir='column'
      alignItems='center'
    >
      <Playerlist />
      <br/>
      <BuildShip/>
      <MissionModule />
      <Flex
        className='side-menu-bottom-btn-container'
      >
        <Button
          className='end-turn-btn'
        >
          end button
        </Button>
        <Button
          className='tasks-modal-btn'
        >
          tasks button
        </Button>
      </Flex>
    </Flex>

  );
};

export default MenuSide;