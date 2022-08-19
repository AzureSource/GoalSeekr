import React from 'react';
import { Flex, Button } from '@chakra-ui/react';
import Playerlist  from '../list/PlayerList.jsx';
import BuildShip from '../buildShips/BuildShip.jsx';
import MissionModule from './actionsToolbar/missionModule/MissionModule.jsx';
import { setEndTurnBoolean } from './menuSideSlice';
import { useDispatch } from 'react-redux';

const MenuSide = () => {
  const dispatch = useDispatch();
  const endTurn = () => {
    dispatch(setEndTurnBoolean('true'));
  };

  return (
    <Flex
      className='menu-side-container'
      flexDir='column'
      alignItems='center'
    >
      <Playerlist />
      <BuildShip/>
      <MissionModule />
      <Flex
        className='side-menu-bottom-btn-container'
      >
        <Button
          className='end-turn-btn'
          onClick={endTurn}
        >
          End Turn
        </Button>
        <Button
          className='tasks-modal-btn'
        >
          Tasks
        </Button>
      </Flex>
    </Flex>

  );
};

export default MenuSide;