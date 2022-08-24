import zeroUnexplored from '../../../assets/images/zeroUnexplored.png';
import atheaUnexplored from '../../../assets/images/atheaUnexplored.png';
import hakuUnexplored from '../../../assets/images/hakuUnexplored.png';
import calciferUnexplored from '../../../assets/images/calciferUnexplored.png';
import chihiroUnexplored from '../../../assets/images/chihiroUnexplored.png';
import lavaUnexplored from '../../../assets/images/lavaUnexplored.png';
import pinktopiaUnexplored from '../../../assets/images/pinktopiaUnexplored.png';
import pokitaruUnexplored from '../../../assets/images/pokitaruUnexplored.png';
import polarisUnexplored from '../../../assets/images/polarisUnexplored.png';
import steinsUnexplored from '../../../assets/images/steinsUnexplored.png';
import zero from '../../../assets/images/zero.png';
import athea from '../../../assets/images/athea.png';
import haku from '../../../assets/images/haku.png';
import calcifer from '../../../assets/images/calcifer.png';
import chihiro from '../../../assets/images/chihiro.png';
import lava from '../../../assets/images/lava.png';
import pinktopia from '../../../assets/images/pinktopia.png';
import pokitaru from '../../../assets/images/pokitaru.png';
import polaris from '../../../assets/images/polaris.png';
import steins from '../../../assets/images/steins.png';

const planets = [
  {
    id: 1,
    name: 'ZERO',
    image: zero,
    unexplored: zeroUnexplored,
    classname: 'zero',
    top: 90,
    left: 440
  },
  {
    id: 2,
    name: 'PISCES',
    image: zero,
    unexplored: zeroUnexplored,
    classname: 'zero2',
    top: 460,
    left: 850
  },
  {
    id: 3,
    name: 'CORBIN',
    image: zero,
    unexplored: zeroUnexplored,
    classname: 'zero3',
    top: 290,
    left: 430
  },
  {
    id: 4,
    name: 'JADE',
    image: zero,
    unexplored: zeroUnexplored,
    classname: 'zero4',
    top: 100,
    left: 650
  },
  {
    id: 5,
    name: 'PINKTOPIA',
    image: pinktopia,
    unexplored: pinktopiaUnexplored,
    classname: 'pinktopia',
    top: 50,
    left: 50
  },
  {
    id: 6,
    name: 'TAURUS',
    image: pinktopia,
    unexplored: pinktopiaUnexplored,
    classname: 'pinktopia2',
    top: 16,
    left: 900
  },
  {
    id: 7,
    name: 'MARSHALL',
    image: pinktopia,
    unexplored: pinktopiaUnexplored,
    classname: 'pinktopia3',
    top: 380,
    left: 200
  },
  {
    id: 8,
    name: 'AUSTIN',
    image: pinktopia,
    unexplored: pinktopiaUnexplored,
    classname: 'pinktopia4',
    top: 380,
    left: 780
  },
  {
    id: 9,
    name: 'POKITARU',
    image: pokitaru,
    unexplored: pokitaruUnexplored,
    classname: 'pokitaru',
    top: 14,
    left: 200
  },
  {
    id: 10,
    name: 'CAPRICORN',
    image: pokitaru,
    unexplored: pokitaruUnexplored,
    classname: 'pokitaru2',
    top: 170,
    left: 910
  },
  {
    id: 11,
    name: 'JEROME',
    image: pokitaru,
    unexplored: pokitaruUnexplored,
    classname: 'pokitaru3',
    top: 16,
    left: 450
  },
  {
    id: 12,
    name: 'IBRAHEEM',
    image: pokitaru,
    unexplored: pokitaruUnexplored,
    classname: 'pokitaru4',
    top: 450,
    left: 380
  },
  {
    id: 13,
    name: 'STEINS',
    image: steins,
    unexplored: steinsUnexplored,
    classname: 'steins',
    top: 250,
    left: 50
  },
  {
    id: 14,
    name: 'VIRGO',
    image: steins,
    unexplored: steinsUnexplored,
    classname: 'steins2',
    top: 280,
    left: 850
  },
  {
    id: 15,
    name: 'IZZI',
    image: steins,
    unexplored: steinsUnexplored,
    classname: 'steins3',
    top: 16,
    left: 750
  },
  {
    id: 16,
    name: 'ALGO',
    image: steins,
    unexplored: steinsUnexplored,
    classname: 'steins4',
    top: 120,
    left: 550
  },
  {
    id: 17,
    name: 'LAVA',
    image: lava,
    unexplored: lavaUnexplored,
    classname: 'lava',
    top: 359,
    left: 939
  },
  {
    id: 18,
    name: 'LEO',
    image: lava,
    unexplored: lavaUnexplored,
    classname: 'lava2',
    top: 148,
    left: 248
  },
  {
    id: 19,
    name: 'BOOLEAN',
    image: lava,
    unexplored: lavaUnexplored,
    classname: 'lava3',
    top: 338,
    left: 558
  },
  {
    id: 20,
    name: 'FLOWER',
    image: lava,
    unexplored: lavaUnexplored,
    classname: 'lava4',
    top: 340,
    left: 64
  },
  {
    id: 21,
    name: 'HAKU',
    image: haku,
    unexplored: hakuUnexplored,
    classname: 'haku',
    top: 418,
    left: 100
  },
  {
    id: 22,
    name: 'SCORPIO',
    image: haku,
    unexplored: hakuUnexplored,
    classname: 'haku2',
    top: 350,
    left: 675
  },
  {
    id: 23,
    name: 'XUTIS',
    image: haku,
    unexplored: hakuUnexplored,
    classname: 'haku3',
    top: 50,
    left: 300
  },
  {
    id: 24,
    name: 'PEACH',
    image: haku,
    unexplored: hakuUnexplored,
    classname: 'haku4',
    top: 290,
    left: 280
  },
  {
    id: 25,
    name: 'CHIHIRO',
    image: chihiro,
    unexplored: chihiroUnexplored,
    classname: 'chihiro',
    top: 100,
    left: 775
  },
  {
    id: 26,
    name: 'REDUX',
    image: chihiro,
    unexplored: chihiroUnexplored,
    classname: 'chihiro2',
    top: 220,
    left: 350
  },
  {
    id: 27,
    name: 'APPLE',
    image: chihiro,
    unexplored: chihiroUnexplored,
    classname: 'chihiro3',
    top: 120,
    left: 120
  },
  {
    id: 28,
    name: 'VION',
    image: chihiro,
    unexplored: chihiroUnexplored,
    classname: 'chihiro4',
    top: 450,
    left: 580
  },
  {
    id: 29,
    name: 'CALCIFER',
    image: calcifer,
    unexplored: calciferUnexplored,
    classname: 'calcifer',
    top: 420,
    left: 490
  },
  {
    id: 30,
    name: 'FINN',
    image: calcifer,
    unexplored: calciferUnexplored,
    classname: 'calcifer2',
    top: 200,
    left: 660
  },
  {
    id: 31,
    name: 'BLADE',
    image: calcifer,
    unexplored: calciferUnexplored,
    classname: 'calcifer3',
    top: 460,
    left: 220
  },
  {
    id: 32,
    name: 'NEON',
    image: calcifer,
    unexplored: calciferUnexplored,
    classname: 'calcifer4',
    top: 180,
    left: 440
  },
  {
    id: 33,
    name: 'ATHEA',
    image: athea,
    unexplored: atheaUnexplored,
    classname: 'athea',
    top: 369,
    left: 319
  },
  {
    id: 34,
    name: 'LOLLIPOP',
    image: athea,
    unexplored: atheaUnexplored,
    classname: 'athea2',
    top: 19,
    left: 600
  },
  {
    id: 35,
    name: 'MEI',
    image: athea,
    unexplored: atheaUnexplored,
    classname: 'athea3',
    top: 469,
    left: 700
  },
  {
    id: 36,
    name: 'LUNAR',
    image: athea,
    unexplored: atheaUnexplored,
    classname: 'athea4',
    top: 268,
    left: 740
  },
  {
    id: 37,
    name: 'POLARIS',
    image: polaris,
    unexplored: polarisUnexplored,
    classname: 'polaris',
    top: 280,
    left: 180
  },
  {
    id: 38,
    name: 'PETER',
    image: polaris,
    unexplored: polarisUnexplored,
    classname: 'polaris2',
    top: 230,
    left: 515
  },
  {
    id: 39,
    name: 'ZORIX',
    image: polaris,
    unexplored: polarisUnexplored,
    classname: 'polaris3',
    top: 200,
    left: 780
  },
  {
    id: 40,
    name: 'SCAR',
    image: polaris,
    unexplored: polarisUnexplored,
    classname: 'polaris4',
    top: 190,
    left: 150
  }
];

export default planets;