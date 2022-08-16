import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPlanetSelection } from './denseGalaxySlice';
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
import egg from '../../../assets/hats/egg.png';
import bearears from '../../../assets/hats/bearears.png';
import { Image } from '@chakra-ui/react';

export default function DenseGalaxy() {
  var planets = [
    {
      name: 'ZERO',
      image: zero,
      classname: 'zero'
    },
    {
      name: 'PISCES',
      image: zero,
      classname: 'zero2'
    },
    {
      name: 'CORBIN',
      image: zero,
      classname: 'zero3'
    },
    {
      name: 'JADE',
      image: zero,
      classname: 'zero4'
    },
    {
      name: 'PINKTOPIA',
      image: pinktopia,
      classname: 'pinktopia'
    },
    {
      name: 'TAURUS',
      image: pinktopia,
      classname: 'pinktopia2'
    },
    {
      name: 'MARSHALL',
      image: pinktopia,
      classname: 'pinktopia3'
    },
    {
      name: 'AUSTIN',
      image: pinktopia,
      classname: 'pinktopia4'
    },
    {
      name: 'POKITARU',
      image: pokitaru,
      classname: 'pokitaru'
    },
    {
      name: 'CAPRICORN',
      image: pokitaru,
      classname: 'pokitaru2'
    },
    {
      name: 'JEROME',
      image: pokitaru,
      classname: 'pokitaru3'
    },
    {
      name: 'IBRAHEEM',
      image: pokitaru,
      classname: 'pokitaru4'
    },
    {
      name: 'STEINS',
      image: steins,
      classname: 'steins'
    },
    {
      name: 'VIRGO',
      image: steins,
      classname: 'steins2'
    },
    {
      name: 'IZZI',
      image: steins,
      classname: 'steins3'
    },
    {
      name: 'ALGO',
      image: steins,
      classname: 'steins4'
    },
    {
      name: 'LAVA',
      image: lava,
      classname: 'lava'
    },
    {
      name: 'LEO',
      image: lava,
      classname: 'lava2'
    },
    {
      name: 'BOOLEAN',
      image: lava,
      classname: 'lava3'
    },
    {
      name: 'FLOWER',
      image: lava,
      classname: 'lava4'
    },
    {
      name: 'HAKU',
      image: haku,
      classname: 'haku'
    },
    {
      name: 'SCORPIO',
      image: haku,
      classname: 'haku2'
    },
    {
      name: 'XUTIS',
      image: haku,
      classname: 'haku3'
    },
    {
      name: 'PEACH',
      image: haku,
      classname: 'haku4'
    },
    {
      name: 'CHIHIRO',
      image: chihiro,
      classname: 'chihiro'
    },
    {
      name: 'REDUX',
      image: chihiro,
      classname: 'chihiro2'
    },
    {
      name: 'APPLE',
      image: chihiro,
      classname: 'chihiro3'
    },
    {
      name: 'VION',
      image: chihiro,
      classname: 'chihiro4'
    },
    {
      name: 'CALCIFER',
      image: calcifer,
      classname: 'calcifer'
    },
    {
      name: 'FINN',
      image: calcifer,
      classname: 'calcifer2'
    },
    {
      name: 'BLADE',
      image: calcifer,
      classname: 'calcifer3'
    },
    {
      name: 'NEON',
      image: calcifer,
      classname: 'calcifer4'
    },
    {
      name: 'ATHEA',
      image: athea,
      classname: 'athea'
    },
    {
      name: 'LOLLIPOP',
      image: athea,
      classname: 'athea2'
    },
    {
      name: 'MEI',
      image: athea,
      classname: 'athea3'
    },
    {
      name: 'LUNAR',
      image: athea,
      classname: 'athea4'
    },
    {
      name: 'POLARIS',
      image: polaris,
      classname: 'polaris'
    },
    {
      name: 'PETER',
      image: polaris,
      classname: 'polaris2'
    },
    {
      name: 'ZORIX',
      image: polaris,
      classname: 'polaris3'
    },
    {
      name: 'SCAR',
      image: polaris,
      classname: 'polaris4'
    }
  ];

  const dispatch = useDispatch();

  const [firstPlanet, setFirstPlanet] = useState(false);

  const handlePlanetSelection = (name) => {
    const planetSelection = name;
    // console.log('planet', planetSelection);
    if (!firstPlanet) {
      dispatch(setPlanetSelection({homePlanet: planetSelection}));
      setFirstPlanet(true);
    } else {
      dispatch(setPlanetSelection({targetPlanet: planetSelection}));
    }
  };

  // function makePlanetDiv(object) {
  //   return (
  //     <div role='button' onClick={() => handlePlanetSelection(object.name)}>
  //       <img src={object.image} className={object.classname} onClick={() => handlePlanetSelection(object.name)} />
  //       <div className={object.name}>{object.name}</div>
  //     </div>
  //   );
  // }
  return (
    <div>
      {planets.map((planet, index) => {
        return (
          <div key={index} role='button' onClick={() => handlePlanetSelection(planet.name)}>
            <Image src={planet.image} className={planet.classname}/>
            <div className={planet.name}>{planet.name}</div>
          </div>
        );
      })}
      <img src={egg} className='egg'></img>
      <img src={bearears} className='bearears'></img>
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