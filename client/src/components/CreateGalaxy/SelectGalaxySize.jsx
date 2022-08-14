import React from 'react';
import { Flex, Input, Image, Button } from '@chakra-ui/react';
import smallGalaxy from '../../../assets/images/smallGalaxy.jpeg';
import bigGalaxy from '../../../assets/images/bigGalaxy.jpeg';

const SelectGalaxySize = () => {
  return (
    <Flex
      className='galaxy-size-container'
      flexDir='column'
    >
      <div
        className='galaxy-size-heading'
      >
              Select Galaxy Size
      </div>
      <Flex
        className='galaxy-size-images-container'
        justify='space-between'
      >
        <Image
          className='galaxy-size-images'
          boxSize='155px'
          objectFit='cover'
          src={smallGalaxy}
        />
        <Image
          className='galaxy-size-images'
          boxSize='155px'
          objectFit='cover'
          src={bigGalaxy}
        />
      </Flex>
    </Flex>
  );
};

export default SelectGalaxySize;