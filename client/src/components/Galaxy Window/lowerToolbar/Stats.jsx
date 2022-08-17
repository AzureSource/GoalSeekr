import React, { useState } from 'react';
import { Box, Button, Grid, GridItem } from '@chakra-ui/react';
import axios from 'axios';
import { GiRingedPlanet, GiJetpack, GiCash, GiTrophy, GiBlackFlag} from 'react-icons/gi';

const Stats = (u_id) => {

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

  };



  return (
    <div id='stats'>
    </div>
  );


};

export default Stats;
