import React from 'react';
import { Flex } from '@chakra-ui/react';
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
      <Flex>
        <div
          className='end-turn-btn'
        >
          end button
        </div>
        <div
          className='tasks-modal-btn'
        >
          tasks button
        </div>
      </Flex>
    </Flex>

  );
};

export default MenuSide;