import React from 'react';
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

export default function DenseGalaxy() {
  var planets = [
    {
      name: 'ZERO',
      image: zero,
      classname: 'zero',
      top: 90,
      left: 440
    },
    {
      name: 'PISCES',
      image: zero,
      classname: 'zero2',
      top: 460,
      left: 850
    },
    {
      name: 'CORBIN',
      image: zero,
      classname: 'zero3',
      top: 290,
      left: 430
    },
    {
      name: 'JADE',
      image: zero,
      classname: 'zero4',
      top: 100,
      left: 650
    },
    {
      name: 'PINKTOPIA',
      image: pinktopia,
      classname: 'pinktopia',
      top: 50,
      left: 50
    },
    {
      name: 'TAURUS',
      image: pinktopia,
      classname: 'pinktopia2',
      top: 16,
      left: 900
    },
    {
      name: 'MARSHALL',
      image: pinktopia,
      classname: 'pinktopia3',
      top: 380,
      left: 200
    },
    {
      name: 'AUSTIN',
      image: pinktopia,
      classname: 'pinktopia4',
      top: 380,
      left: 780
    },
    {
      name: 'POKITARU',
      image: pokitaru,
      classname: 'pokitaru',
      top: 14,
      left: 200
    },
    {
      name: 'CAPRICORN',
      image: pokitaru,
      classname: 'pokitaru2',
      top: 170,
      left: 910
    },
    {
      name: 'JEROME',
      image: pokitaru,
      classname: 'pokitaru3',
      top: 16,
      left: 450
    },
    {
      name: 'IBRAHEEM',
      image: pokitaru,
      classname: 'pokitaru4',
      top: 450,
      left: 380
    },
    {
      name: 'STEINS',
      image: steins,
      classname: 'steins',
      top: 250,
      left: 50
    },
    {
      name: 'VIRGO',
      image: steins,
      classname: 'steins2',
      top: 280,
      left: 850
    },
    {
      name: 'IZZI',
      image: steins,
      classname: 'steins3',
      top: 16,
      left: 750
    },
    {
      name: 'ALGO',
      image: steins,
      classname: 'steins4',
      top: 120,
      left: 550
    },
    {
      name: 'LAVA',
      image: lava,
      classname: 'lava',
      top: 359,
      left: 939
    },
    {
      name: 'LEO',
      image: lava,
      classname: 'lava2',
      top: 148,
      left: 248
    },
    {
      name: 'BOOLEAN',
      image: lava,
      classname: 'lava3',
      top: 338,
      left: 558
    },
    {
      name: 'FLOWER',
      image: lava,
      classname: 'lava4',
      top: 340,
      left: 64
    },
    {
      name: 'HAKU',
      image: haku,
      classname: 'haku',
      top: 418,
      left: 100
    },
    {
      name: 'SCORPIO',
      image: haku,
      classname: 'haku2',
      top: 350,
      left: 675
    },
    {
      name: 'XUTIS',
      image: haku,
      classname: 'haku3',
      top: 50,
      left: 300
    },
    {
      name: 'PEACH',
      image: haku,
      classname: 'haku4',
      top: 290,
      left: 280
    },
    {
      name: 'CHIHIRO',
      image: chihiro,
      classname: 'chihiro',
      top: 100,
      left: 775
    },
    {
      name: 'REDUX',
      image: chihiro,
      classname: 'chihiro2',
      top: 220,
      left: 350
    },
    {
      name: 'APPLE',
      image: chihiro,
      classname: 'chihiro3',
      top: 120,
      left: 120
    },
    {
      name: 'VION',
      image: chihiro,
      classname: 'chihiro4',
      top: 450,
      left: 580
    },
    {
      name: 'CALCIFER',
      image: calcifer,
      classname: 'calcifer',
      top: 420,
      left: 490
    },
    {
      name: 'FINN',
      image: calcifer,
      classname: 'calcifer2',
      top: 200,
      left: 660
    },
    {
      name: 'BLADE',
      image: calcifer,
      classname: 'calcifer3',
      top: 460,
      left: 220
    },
    {
      name: 'NEON',
      image: calcifer,
      classname: 'calcifer4',
      top: 180,
      left: 440
    },
    {
      name: 'ATHEA',
      image: athea,
      classname: 'athea',
      top: 369,
      left: 319
    },
    {
      name: 'LOLLIPOP',
      image: athea,
      classname: 'athea2',
      top: 19,
      left: 600
    },
    {
      name: 'MEI',
      image: athea,
      classname: 'athea3',
      top: 469,
      left: 700
    },
    {
      name: 'LUNAR',
      image: athea,
      classname: 'athea4',
      top: 268,
      left: 740
    },
    {
      name: 'POLARIS',
      image: polaris,
      classname: 'polaris',
      top: 280,
      left: 180
    },
    {
      name: 'PETER',
      image: polaris,
      classname: 'polaris2',
      top: 230,
      left: 515
    },
    {
      name: 'ZORIX',
      image: polaris,
      classname: 'polaris3',
      top: 200,
      left: 780
    },
    {
      name: 'SCAR',
      image: polaris,
      classname: 'polaris4',
      top: 190,
      left: 150
    }
  ];
  return (
    <div>
      {planets.map((planet) => {
        return (
          <div>
            <img src={planet.image} className={planet.classname}></img>
            <div className={planet.name}>{planet.name}</div>
            <Image src={devil} height='67px' marginTop={planet.top - 15} marginLeft={planet.left - 9} position='absolute'></Image>
          </div>
        );
      })}
      {/* <img src={egg} className='egg'></img> */}
      {/* <img src={bearears} className='bearears'></img> */}
    </div>
  );
}