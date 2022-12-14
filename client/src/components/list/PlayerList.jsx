import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {
  Avatar,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Grid,
  GridItem,
  Text
} from '@chakra-ui/react';
import { GiRingedPlanet, GiJetpack, GiCash, GiTrophy, GiBlackFlag, GiZeusSword} from 'react-icons/gi';
import { useParams } from 'react-router-dom';


function Playerlist () {

  // const galaxyID = useSelector((state) => state.currentGalaxyID.galaxyID);
  const [playerlist, setPlayerlist] = useState([]);
  //fetch players in the game (icons, usernames, planets, ships, currency, metal)
  const {id} = useParams();
  //sort by planets owned

  //rank will then be the index of the players in the list

  useEffect(() => {
    axios.get(`/api/galaxy/${id}`)
      .then(({data}) => {
        const g_id = data.rows[0].currentgalaxy;
        axios.get(`/api/players/${g_id}`)
          .then((results) => setPlayerlist(results.data))
          .catch((err) => console.log('error getting players, PlayerList line 29:\n', err));
      })
      .catch((err) => console.log(err));
  }, []);

  const panelProps = {
    display: 'contents'
  };

  const gridIprops = {
    display: 'flex',
    'flexFlow': 'row nowrap',
    'justifyContent': 'space-evenly',
    'alignItems': 'center',
  };

  const accButton = {
    display: 'flex',
    'justifyContent': 'space-between',
  };

  return (
    <div id='player-list'>
      <Accordion id='pl-acc' allowToggle>
        <Text textAlign={'center'}>Current Ranking</Text>
        {playerlist.length && playerlist.map((player, index) => (
          <AccordionItem key={player.userid}>
            <h2>
              <AccordionButton sx={accButton} w='100%'_expanded={{ bg: '#50b6ab', color: 'white' }}>
                <Avatar size='xs' src='https://bit.ly/broken-link' />
                {index === 0 && <GiTrophy className='p-list-smIcon'/> }
                <span> {player.username} </span>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel sx={panelProps} pb={4}>
              <Grid  templateColumns='repeat(2, 1fr)' fontSize={'sm'} templateRows='repeat(3, 1fr)' gap={1}>
                <GridItem sx={gridIprops} w='100%' h='10' width='13' bg={'gray.100'}>
                  Rank:
                  <Text>{index + 1}</Text>
                  {/* /* MAKE IT SO A STAR OR TROPHY APPEARS IF FIRST */}
                </GridItem>
                <GridItem sx={gridIprops} w='100%' h='10' width='13' bg={'gray.100'}>
                  <GiBlackFlag className='p-list-smIcon'/>
                  <Text>Alliance: <br /> {player.alliance ? player.alliance.name : 'independent'} </Text>
                </GridItem>
                <GridItem sx={gridIprops} w='100%' h='10' width='13' bg={'gray.100'}>
                  <GiRingedPlanet className='p-list-icon' /> {}
                  {/* <GiRingedPlanet className='p-list-icon' /> {player.planets.length} */}
                </GridItem>
                <GridItem sx={gridIprops} w='100%' h='10' width='13' bg={'gray.100'}>
                  <GiJetpack className='p-list-icon' />  {player.ships ? player.ships.length : 0 }
                </GridItem>
                <GridItem sx={gridIprops} w='100%' h='10' width='13' bg={'gray.100'}>
                  <GiCash className='p-list-icon' /> {player.currency}
                </GridItem>
                <GridItem sx={gridIprops} w='100%' h='10' width='13' bg={'gray.100'}>
                  <GiZeusSword className='p-list-icon' /> {player.motto}
                </GridItem>
              </Grid>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default Playerlist;