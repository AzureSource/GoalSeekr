import React from 'react';
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
import { GiRingedPlanet, GiJetpack, GiCash, GiTrophy, GiBlackFlag} from 'react-icons/gi';


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

  const panelProps = {
    display: 'contents'
  };

  const gridIprops = {
    display: 'flex',
    'flex-flow': 'row nowrap',
    'justify-content': 'space-evenly',
    'align-items': 'center',
  };

  const accButton = {
    display: 'flex',
    'justify-content': 'space-between',
  };

  return (
    <div id='player-list' style={{width:'200px', margin: '1rem'}}>
      <Accordion  allowToggle>
        <Text textAlign={'center'}>Current Ranking</Text>
        {playerlist.map((player, index) => (
          <AccordionItem key={player.id}>
            <h2>
              <AccordionButton sx={accButton} w='100%'_expanded={{ bg: 'tomato', color: 'white' }}>
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
                  <Text>Alliance: <br /> {player.alliance || 'idependent'} </Text>
                </GridItem>
                <GridItem sx={gridIprops} w='100%' h='10' width='13' bg={'gray.100'}>
                  <GiRingedPlanet className='p-list-icon' /> {player.planets.length}
                </GridItem>
                <GridItem sx={gridIprops} w='100%' h='10' width='13' bg={'gray.100'}>
                  <GiJetpack className='p-list-icon' />  {player.ships.length}
                </GridItem>
                <GridItem sx={gridIprops} w='100%' h='10' width='13' bg={'gray.100'}>
                  <GiCash className='p-list-icon' /> {player.currency}
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