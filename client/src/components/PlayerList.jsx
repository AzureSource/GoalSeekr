import React from 'react';
import {
  Avatar,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Grid,
  GridItem,
  Text
} from '@chakra-ui/react';

function Playerlist () {

  //fetch players in the game (icons, usernames, planets, ships, currency, metal)

  //sort by planets owned

  //rank will then be the index of the players in the list

  const playerlist = [
    {
      id: 1,
      icon: 'https://findicons.com/icon/53705/hard_hat',
      username: 'This guy',
      alliance: 'Kings',
      planets: ['a', 'b', 'c'],
      ships: [1, 2, 3, 4],
      currency: 1234,
    },
    {
      id: 13,
      icon: 'https://findicons.com/icon/53705/hard_hat',
      username: 'That guy',
      alliance: '',
      planets: ['a', 'b', 'c'],
      ships: [1, 2, 3, 4],
      currency: 1234,
    },
    {
      id: 5,
      icon: 'https://findicons.com/icon/53705/hard_hat',
      username: 'Someone else',
      alliance: 'Kings',
      planets: ['a', 'b', 'c'],
      ships: [1, 2, 3, 4],
      currency: 2938,
    }
  ];


  return (
    <div id='player-list' style={{width:'200px'}}>
      <Accordion  allowToggle>
        <Text textAlign={'center'}>Current Ranking</Text>
        {playerlist.map((player, index) => (
          <AccordionItem key={player.id}>
            <h2>
              <AccordionButton  _expanded={{ bg: 'tomato', color: 'white' }}>
                <Box flex='1' textAlign='left'>
                  <Avatar size='xs' src='https://bit.ly/broken-link' />
                  <span> {player.username}</span>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Grid templateColumns='repeat(2, 1fr)' fontSize={'sm'} templateRows='repeat(3, 1fr)' gap={1}>
                <GridItem w='100%' h='10' width='13' bg={'gray.100'}>
                  <Box>Rank: </Box>
                  <Text>{index + 1}</Text>
                  {/* /* MAKE IT SO A STAR OR TROPHY APPEARS IF FIRST */}
                </GridItem>
                <GridItem w='100%' h='10' width='13' bg={'gray.100'}>
                  <Box>Alliance:</Box>
                  <Text> {player.alliance || 'idependent'} </Text>
                </GridItem>
                <GridItem w='100%' h='10' width='13' bg={'gray.100'}>
                  <Box>Planets: {player.planets.length}</Box>
                </GridItem>
                <GridItem w='100%' h='10' width='13' bg={'gray.100'}>
                  <Box>Ships:  {player.ships.length}</Box>
                </GridItem>
                <GridItem w='100%' h='10' width='13' bg={'gray.100'}>
                  <Box>Currency: {player.currency}</Box>
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