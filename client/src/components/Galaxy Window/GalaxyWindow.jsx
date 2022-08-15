import React from 'react';
// import background from './images/sparse sky.png';
import SparseGalaxy from './SparseGalaxy.jsx';
import DenseGalaxy from './DenseGalaxy.jsx';
import { Flex, Spacer } from '@chakra-ui/react';
import MenuSide from './MenuSide.jsx';
import MenuBottom from './MenuBottom.jsx';

export default function GalaxyWindow () {
  return (
    <div className='galaxy-window' color='white'>
      <Flex className='galaxy-window-top'>
        <MenuSide />
        <div className='planetsWindow'>
          {/* <SparseGalaxy/> */}
          <DenseGalaxy/>
        </div>
      </Flex>
      <MenuBottom />
    </div>
  );
}