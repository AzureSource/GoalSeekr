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
      <Grid
        h='200px'
        templateRows='repeat(2, 1fr)'
        templateColumns='repeat(5, 1fr)'
        gap={4}
      >
        <GridItem id='turn-stat' rowSpan={2} colSpan={1} bg='tomato' >
          <Box >Current Turn</Box>
          <Box >
            <Button onClick={endTurn}>End Turn</Button>
          </Box>
        </GridItem >
        <GridItem id='planet-stat'colSpan={2} bg='papayawhip' > Select a Planet and see its available ships</GridItem >
        <GridItem id='total-stat'colSpan={2} bg='papayawhip' >
          <Box id='t-stat1'><GiCash className='stat-icon'/>Currency</Box>
          <Box id='t-stat2'><GiJetpack className='stat-icon'/>Ships</Box>
          <Box id='t-stat3'><GiRingedPlanet className='stat-icon' ></GiRingedPlanet>Planets</Box>
          <Box id='t-stat4'><GiBlackFlag className='stat-icon'/>Alliance</Box>
        </GridItem >
        <GridItem id='task-link'colSpan={4} bg='tomato' > Link to the task Tracker</GridItem >
      </Grid>

    </div>
  );


};

export default Stats;
