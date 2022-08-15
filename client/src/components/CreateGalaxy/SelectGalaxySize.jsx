import React, { useEffect, useState } from 'react';
import { Flex, Image, Box } from '@chakra-ui/react';
import smallGalaxy from '../../../assets/images/smallGalaxy.jpeg';
import bigGalaxy from '../../../assets/images/bigGalaxy.jpeg';

const SelectGalaxySize = ({ galaxySize, setGalaxySize, setMaxPlayerCount }) => {

  const changeGalaxySize = () => {

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
          className={galaxySize ? 'galaxy-size-images' : 'galaxy-size-unselected galaxy-size-images'}
          boxSize='155px'
          objectFit='contain'
          backgroundImage={smallGalaxy}
          onClick={() => setGalaxySize(true)}
        >Sparse (sm)</Box>
        <Box
          className={galaxySize ? 'galaxy-size-unselected galaxy-size-images' : 'galaxy-size-images'}
          boxSize='155px'
          objectFit='cover'
          onClick={() => setGalaxySize(false)}
          backgroundImage={bigGalaxy}
        >Dense (big)</Box>
      </Flex>
    </Flex>
  );
};

export default SelectGalaxySize;