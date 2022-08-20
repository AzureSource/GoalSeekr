import React, { useEffect, useState } from 'react';
import { Flex, Image, Box } from '@chakra-ui/react';
import smallGalaxy from '../../../assets/images/smallGalaxy.jpeg';
import bigGalaxy from '../../../assets/images/bigGalaxy.jpeg';

const SelectGalaxySize = ({ smallGalaxy, setSmallGalaxy, setMaxPlayerCount }) => {

  const changeGalaxySize = (size) => {
    setSmallGalaxy(size);
    setMaxPlayerCount(2);
  };

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
        <Box
          className={smallGalaxy ? 'galaxy-size-images' : 'galaxy-size-unselected galaxy-size-images'}
          boxSize='155px'
          objectFit='contain'
          backgroundImage={smallGalaxy}
          onClick={() => changeGalaxySize(true)}
        >Sparse (sm)</Box>
        <Box
          className={smallGalaxy ? 'galaxy-size-unselected galaxy-size-images' : 'galaxy-size-images'}
          boxSize='155px'
          objectFit='cover'
          onClick={() => changeGalaxySize(false)}
          backgroundImage={bigGalaxy}
        >Dense (big)</Box>
      </Flex>
    </Flex>
  );
};

export default SelectGalaxySize;