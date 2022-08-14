import React from 'react';
import { Flex } from '@chakra-ui/react';

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