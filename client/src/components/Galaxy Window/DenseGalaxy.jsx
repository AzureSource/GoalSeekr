import React, { useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import bubble from '../../../assets/hats/bubble.png';
import cowboy from '../../../assets/hats/cowboy.png';
import crown from '../../../assets/hats/crown.png';
import devil from '../../../assets/hats/devil.png';
import halo from '../../../assets/hats/halo.png';
import flowercrown from '../../../assets/hats/flowercrown.png';
import banana from '../../../assets/hats/banana.png';
import sprout from '../../../assets/hats/sprout.png';
import { Image } from '@chakra-ui/react';
import axios from 'axios';
import { UserContext } from './GalaxyWindow.jsx';
import MenuSide from './MenuSide.jsx';
import MenuBottom from './MenuBottom.jsx';

export default function DenseGalaxy() {
  var planets = [
    {
      id: 1,
      name: 'ZERO',
      image: zero,
      classname: 'zero',
      top: 90,
      left: 440
    },
    {
      id: 2,
      name: 'PISCES',
      image: zero,
      classname: 'zero2',
      top: 460,
      left: 850
    },
    {
      id: 3,
      name: 'CORBIN',
      image: zero,
      classname: 'zero3',
      top: 290,
      left: 430
    },
    {
      id: 4,
      name: 'JADE',
      image: zero,
      classname: 'zero4',
      top: 100,
      left: 650
    },
    {
      id: 5,
      name: 'PINKTOPIA',
      image: pinktopia,
      classname: 'pinktopia',
      top: 50,
      left: 50
    },
    {
      id: 6,
      name: 'TAURUS',
      image: pinktopia,
      classname: 'pinktopia2',
      top: 16,
      left: 900
    },
    {
      id: 7,
      name: 'MARSHALL',
      image: pinktopia,
      classname: 'pinktopia3',
      top: 380,
      left: 200
    },
    {
      id: 8,
      name: 'AUSTIN',
      image: pinktopia,
      classname: 'pinktopia4',
      top: 380,
      left: 780
    },
    {
      id: 9,
      name: 'POKITARU',
      image: pokitaru,
      classname: 'pokitaru',
      top: 14,
      left: 200
    },
    {
      id: 10,
      name: 'CAPRICORN',
      image: pokitaru,
      classname: 'pokitaru2',
      top: 170,
      left: 910
    },
    {
      id: 11,
      name: 'JEROME',
      image: pokitaru,
      classname: 'pokitaru3',
      top: 16,
      left: 450
    },
    {
      id: 12,
      name: 'IBRAHEEM',
      image: pokitaru,
      classname: 'pokitaru4',
      top: 450,
      left: 380
    },
    {
      id: 13,
      name: 'STEINS',
      image: steins,
      classname: 'steins',
      top: 250,
      left: 50
    },
    {
      id: 14,
      name: 'VIRGO',
      image: steins,
      classname: 'steins2',
      top: 280,
      left: 850
    },
    {
      id: 15,
      name: 'IZZI',
      image: steins,
      classname: 'steins3',
      top: 16,
      left: 750
    },
    {
      id: 16,
      name: 'ALGO',
      image: steins,
      classname: 'steins4',
      top: 120,
      left: 550
    },
    {
      id: 17,
      name: 'LAVA',
      image: lava,
      classname: 'lava',
      top: 359,
      left: 939
    },
    {
      id: 18,
      name: 'LEO',
      image: lava,
      classname: 'lava2',
      top: 148,
      left: 248
    },
    {
      id: 19,
      name: 'BOOLEAN',
      image: lava,
      classname: 'lava3',
      top: 338,
      left: 558
    },
    {
      id: 20,
      name: 'FLOWER',
      image: lava,
      classname: 'lava4',
      top: 340,
      left: 64
    },
    {
      id: 21,
      name: 'HAKU',
      image: haku,
      classname: 'haku',
      top: 418,
      left: 100
    },
    {
      id: 22,
      name: 'SCORPIO',
      image: haku,
      classname: 'haku2',
      top: 350,
      left: 675
    },
    {
      id: 23,
      name: 'XUTIS',
      image: haku,
      classname: 'haku3',
      top: 50,
      left: 300
    },
    {
      id: 24,
      name: 'PEACH',
      image: haku,
      classname: 'haku4',
      top: 290,
      left: 280
    },
    {
      id: 25,
      name: 'CHIHIRO',
      image: chihiro,
      classname: 'chihiro',
      top: 100,
      left: 775
    },
    {
      id: 26,
      name: 'REDUX',
      image: chihiro,
      classname: 'chihiro2',
      top: 220,
      left: 350
    },
    {
      id: 27,
      name: 'APPLE',
      image: chihiro,
      classname: 'chihiro3',
      top: 120,
      left: 120
    },
    {
      id: 28,
      name: 'VION',
      image: chihiro,
      classname: 'chihiro4',
      top: 450,
      left: 580
    },
    {
      id: 29,
      name: 'CALCIFER',
      image: calcifer,
      classname: 'calcifer',
      top: 420,
      left: 490
    },
    {
      id: 30,
      name: 'FINN',
      image: calcifer,
      classname: 'calcifer2',
      top: 200,
      left: 660
    },
    {
      id: 31,
      name: 'BLADE',
      image: calcifer,
      classname: 'calcifer3',
      top: 460,
      left: 220
    },
    {
      id: 32,
      name: 'NEON',
      image: calcifer,
      classname: 'calcifer4',
      top: 180,
      left: 440
    },
    {
      id: 33,
      name: 'ATHEA',
      image: athea,
      classname: 'athea',
      top: 369,
      left: 319
    },
    {
      id: 34,
      name: 'LOLLIPOP',
      image: athea,
      classname: 'athea2',
      top: 19,
      left: 600
    },
    {
      id: 35,
      name: 'MEI',
      image: athea,
      classname: 'athea3',
      top: 469,
      left: 700
    },
    {
      id: 36,
      name: 'LUNAR',
      image: athea,
      classname: 'athea4',
      top: 268,
      left: 740
    },
    {
      id: 37,
      name: 'POLARIS',
      image: polaris,
      classname: 'polaris',
      top: 280,
      left: 180
    },
    {
      id: 38,
      name: 'PETER',
      image: polaris,
      classname: 'polaris2',
      top: 230,
      left: 515
    },
    {
      id: 39,
      name: 'ZORIX',
      image: polaris,
      classname: 'polaris3',
      top: 200,
      left: 780
    },
    {
      id: 40,
      name: 'SCAR',
      image: polaris,
      classname: 'polaris4',
      top: 190,
      left: 150
    }
  ];

  const dispatch = useDispatch();

  const { user } = useContext(UserContext);

  const firstPlanet = useSelector((state) => state.denseGalaxyPlanetSelection.firstSelection);

  const userPlanets = {
    colonized: [1, 2, 3, 4, 5],
    scouted: [30, 31, 32],
  };

  const handlePlanetSelection = (name) => {
    const planetSelection = name;
    if (!firstPlanet) {
      dispatch(setPlanetSelection({homePlanet: planetSelection}));
    } else {
      dispatch(setPlanetSelection({targetPlanet: planetSelection}));
    }
  };

  var image;
  var hat;
  var hatSource;

  return (
    <div className='appBackground planetsWindow'>
      {planets.map((planet, index) => {
        return (
          <div key={index} role='button' onClick={() => handlePlanetSelection(planet.name)}>
            <Image src={planet.image} className={planet.classname}/>
            <div className={planet.name}>{planet.name}</div>
            {/* <Image src={devil} height='67px' marginTop={planet.top - 15} marginLeft={planet.left - 9} position='absolute'></Image> */}
          </div>
        );
      })}
    </div>
  );

  // return (
  //   <div>
  //     {planets.map((planet, index) => {
  //       if (userPlanets.scouted.includes(planet.id)) {
  //         image = <img src={planet.image} className={planet.classname}></img>;
  //       } else {
  //         image = <img src={planet.unexplored} className={planet.classname}></img>;
  //       }

  //       if (userPlanets.colonized.includes(planet.id)) {
  //         hatSource = user.profile_picture_url;
  //         <Image src={hatSource} height='67px' marginTop={planet.top - 15} marginLeft={planet.left - 9} position='absolute'></Image>;
  //       } else {
  //         hat = null;
  //       }
  //       return (
  //       //if axios.getplanetbyid(id).discoveredBy !== null, and it matches current UserId, return div with colored planet image
  //       //else return div with question mark planet image src
  //       //if axios.getplanetbyid.conqueredBy !== null
  //       //return div with image src axios.getuserbyid(getplanetbyid(arrayid).conqueredBy).profilepictureurl
  //       // if (axios.get('/planets/'))

  //         <div key={index} role='button' onClick={() => handlePlanetSelection(planet.name)} className='divInPlanetComponent'>
  //           {image}
  //           <div className={planet.name}>{planet.name}</div>
  //           {hat}
  //         </div>
  //       );
  //     })}
  //     {/* <img src={egg} className='egg'></img> */}
  //     {/* <img src={bearears} className='bearears'></img> */}
  //   </div>
  // );
}

