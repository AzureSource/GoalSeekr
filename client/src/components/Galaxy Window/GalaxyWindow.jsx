import React from 'react';
import background from './images/sparse sky.png';

export default function GalaxyWindow () {
  return (
    <div>
      <img src={background} ></img>
      <SparseGalaxy/>
      <DenseGalaxy/>
    </div>
  )
}