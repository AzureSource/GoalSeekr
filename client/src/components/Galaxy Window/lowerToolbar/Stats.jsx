import React, { useState } from 'react';
import { Box, Button, Grid, GridItem } from '@chakra-ui/react';
import axios from 'axios';
import { setEndTurnBoolean } from './statsSlice';
import { useDispatch } from 'react-redux';
import { GiRingedPlanet, GiJetpack, GiCash, GiTrophy, GiBlackFlag} from 'react-icons/gi';

const Stats = (u_id) => {
  const dispatch = useDispatch();
  const [userObj, setUserObj] = useState({});

  //fetch the data for the current User and galaxy
  const fetchPlayerInfo = () => {
    axios.get(`/user/${u_id}`)
      .then((res) => {
        setUserObj(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const endTurn = () => {
    dispatch(setEndTurnBoolean('true'));
  };



  return (
    <div className='stats-container'>
      stats
    </div>
  );


};

export default Stats;
