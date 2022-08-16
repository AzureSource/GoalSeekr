import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPlanetSelection } from './sparseGalaxySlice';
import zero from '../../../assets/images/zeroUnexplored.png';
import athea from '../../../assets/images/atheaUnexplored.png';
import haku from '../../../assets/images/hakuUnexplored.png';
import calcifer from '../../../assets/images/calciferUnexplored.png';
import chihiro from '../../../assets/images/chihiroUnexplored.png';
import lava from '../../../assets/images/lavaUnexplored.png';
import pinktopia from '../../../assets/images/pinktopiaUnexplored.png';
import pokitaru from '../../../assets/images/pokitaruUnexplored.png';
import polaris from '../../../assets/images/polarisUnexplored.png';
import steins from '../../../assets/images/steinsUnexplored.png';

export default function SparseGalaxy() {
  const dispatch = useDispatch();

  const [firstPlanet, setFirstPlanet] = useState(true);

  const homePlanet = (event) => {
    const planetSelection = event.target.value;
    dispatch(setPlanetSelection(planetSelection));
    setFirstPlanet(true);
  };

  const targetPlanet = (event) =>  {

  };

  return (
    <div>
      <div className='allPlanets'>
        <img src={zero} className='zero'></img>
        <img src={zero} className='zero2'></img>
        <img src={pinktopia} className='pinktopia'></img>
        <img src={pinktopia} className='pinktopia2'></img>
        <img src={pokitaru} className='pokitaru'></img>
        <img src={pokitaru} className='pokitaru2'></img>
        <img src={steins} className='steins'></img>
        <img src={steins} className='steins2'></img>
        <img src={lava} className='lava'></img>
        <img src={lava} className='lava2'></img>
        <img src={haku} className='haku'></img>
        <img src={haku} className='haku2'></img>
        <img src={chihiro} className='chihiro'></img>
        <img src={chihiro} className='chihiro2'></img>
        <img src={calcifer} className='calcifer'></img>
        <img src={calcifer} className='calcifer2'></img>
        <img src={athea} className='athea'></img>
        <img src={athea} className='athea2'></img>
        <img src={polaris} className='polaris'></img>
        <img src={polaris} className='polaris2'></img>
      </div>
    </div>
  );
}

// first click is home planet
  // update redux store with first click
// on second click target planet (Only if first click is set to true) (can continually click)
  // update redux store with second click
  // render a line between the planets
// reset button - resets selected planets
// figure out turn count on mission module


