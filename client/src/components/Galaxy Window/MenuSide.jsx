import React from 'react';
import { Flex, Button } from '@chakra-ui/react';
import Playerlist  from '../list/PlayerList.jsx';
import BuildShip from '../buildShips/BuildShip.jsx';
import MissionModule from './actionsToolbar/missionModule/MissionModule.jsx';
import { setEndTurnBoolean } from './menuSideSlice';
import { setActiveUser, setGalaxyStarted } from './galaxyWindowSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TaskModal from '../TaskTracker/TaskModal.jsx';

const MenuSide = () => {
  const dispatch = useDispatch();

  const url = (type, u_id, g_id) => (`/api/galaxy/${type}/${u_id}/${g_id}`);
  const g_id = useSelector((state) => state.currentGalaxyID.galaxyID);
  const activeUserId = useSelector((state) => state.currentGalaxyID.activeUser);
  const isStarted = useSelector((state) => state.currentGalaxyID.hasStarted);

  const { id } = useParams();



  const endTurn = () => {
    axios.put(url('turns', id, g_id))
      .then(({data}) => {
        const newActiveUser = data;
        console.log('Next User: ', newActiveUser);
        dispatch(setEndTurnBoolean( 'true' ));
        dispatch(setActiveUser({ activeUserId: newActiveUser }));
      });

  };

  const beginGame = () => {
    axios.put(url('begin', id, g_id))
      .then(() => {
        dispatch(setActiveUser({ activeUserId: id}));
        dispatch(setGalaxyStarted({ hasStarted: true }));
      })
      .catch((err) => console.log('Error starting game:', err));
  };





  const beginGameButton = (
    <Button
      className='end-turn-btn'
      onClick={beginGame}
    >
      Begin Game
    </Button>
  );

  const endTurnButton = (id == activeUserId ?
    <Button className='end-turn-btn' onClick={endTurn} >
      End Turn
    </Button>
    : <Button className='end-turn-btn' >
      Wait Your Turn
    </Button>
  );

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
        {isStarted ? endTurnButton : beginGameButton }
        <TaskModal />
      </Flex>
    </Flex>

  );
};

export default MenuSide;