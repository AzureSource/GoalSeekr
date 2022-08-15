import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { allianceToggle } from './galaxyOptionsSlice';
import { Flex, Switch, FormControl, FormLabel } from '@chakra-ui/react';

const GalaxyOptions = () => {
  const dispatch = useDispatch();

  const toggleAlliance = () => {
    dispatch(allianceToggle());
  };

  return (
    <Flex
      className='galaxy-option-container'
      justify='space-between'
      flexDir='column'
    >
      <div className='galaxy-side-headings'>
        <div>Max Players</div>
        <div>count default 2</div>
      </div>
      <div className='galaxy-side-headings'>
        <div>Years Per Turn</div>
        <div>count default 2</div>

      </div>
      <FormControl
        className='galaxy-side-headings'
        display='flex' alignItems='center'
        justifyContent='space-between'
      >
        <div>Alliances</div>
        <Switch onChange={(e) => toggleAlliance(e)} size='md' />
      </FormControl>
    </Flex>
  );
};

export default GalaxyOptions;