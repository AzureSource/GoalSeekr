import React from 'react';
// import background from './images/sparse sky.png';
import SparseGalaxy from './SparseGalaxy.jsx';
import DenseGalaxy from './DenseGalaxy.jsx';

export default function GalaxyWindow () {
  return (
    <div>
      <div className='planetsWindow'>
        <SparseGalaxy/>
        <DenseGalaxy/>
      </div>
    </div>
  );
}