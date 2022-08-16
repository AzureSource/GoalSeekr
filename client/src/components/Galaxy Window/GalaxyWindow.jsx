import React from 'react';
// import background from './images/sparse sky.png';
// eslint-disable-next-line no-unused-vars
import SparseGalaxy from './SparseGalaxy.jsx';
import DenseGalaxy from './DenseGalaxy.jsx';
// eslint-disable-next-line no-unused-vars
import { Flex, Spacer } from '@chakra-ui/react';
import MenuSide from './MenuSide.jsx';
import MenuBottom from './MenuBottom.jsx';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

export default function GalaxyWindow () {
  return (
    <div className='galaxy-window' color='white'>
      <Flex className='galaxy-window-top'>
        <MenuSide/>
        <TransformWrapper>
          <TransformComponent>
            <div className='planetsWindow'>
              {/* <SparseGalaxy/> */}
              <DenseGalaxy/>
            </div>
          </TransformComponent>
        </TransformWrapper>
      </Flex>
      <MenuBottom/>
    </div>
  );
}

{/* <TransformWrapper className='planetsWindow'>
<TransformComponent>
  {/* <SparseGalaxy/>
  <div>
    <DenseGalaxy/>
  </div>
</TransformComponent>
</TransformWrapper> */}
