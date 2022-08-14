import React from 'react';
import { Flex, Input, Image, Button } from '@chakra-ui/react';
import smallGalaxy from '../../../assets/images/smallGalaxy.jpeg';
import bigGalaxy from '../../../assets/images/bigGalaxy.jpeg';

const GalaxyOptions = () => {
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
      <div className='galaxy-side-headings'>
        <div>Alliances</div>
        <div>switch to turn on</div>
      </div>
    </Flex>
  );
};

export default GalaxyOptions;