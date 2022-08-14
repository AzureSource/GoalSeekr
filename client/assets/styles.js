import { extendTheme } from '@chakra-ui/react';
import background from './images/sparse sky.png';

const overrides = {
  styles: {
    global: {
      // add styles here
      'body.chakra-ui-light, html, #root, .appBackground': {
        height: '100%',
        backgroundImage: background,
        backgroundSize: 'contain'
      },
      '.galaxy-window': {
        width: '100%',
        height: '100%'
      },
      '#root': {
        height: '100%'
      },
      '.planetsWindow': {
        float: 'right',
        border: '2px solid black',
        height: '550px',
        width: '1100px'
      },
      '.zero, .zero2, .pinktopia, .pinktopia2, .pokitaru, .pokitaru2, .steins, .steins2, .lava, .lava2, .haku, .haku2, .chihiro, .chihiro2, .calcifer, .athea, .athea2, .calcifer2, .polaris, .polaris2': {
        height: '50px',
        position: 'absolute'
      },
      '.zero': {
        marginTop: '90px',
        marginLeft: '440px'
      },
      '.zero2': {
        marginTop: '460px',
        marginLeft: '850px'
      },
      '.pinktopia': {
        marginTop: '50px',
        marginLeft: '50px'
      },
      '.pinktopia2': {
        marginTop: '20px',
        marginLeft: '950px'
      },
      '.pokitaru': {
        marginTop: '12px',
        marginLeft: '200px'
      },
      '.pokitaru2': {
        marginTop: '170px',
        marginLeft: '975px'
      },
      '.steins': {
        marginTop: '250px',
        marginLeft: '50px'
      },
      '.steins2': {
        marginTop: '280px',
        marginLeft: '850px'
      },
      '.lava': {
        marginTop: '350px',
        marginLeft: '1000px'
      },
      '.lava2': {
        marginTop: '140px',
        marginLeft: '240px'
      },
      '.haku': {
        marginTop: '418px',
        marginLeft: '100px'
      },
      '.haku2': {
        marginTop: '350px',
        marginLeft: '675px'
      },
      '.chihiro': {
        marginTop: '100px',
        marginLeft: '775px'
      },
      '.chihiro2': {
        marginTop: '220px',
        marginLeft: '350px'
      },
      '.calcifer': {
        marginTop: '420px',
        marginLeft: '490px'
      },
      '.calcifer2': {
        marginTop: '200px',
        marginLeft: '660px'
      },
      '.athea': {
        height: '90px',
        marginTop: '350px',
        marginLeft: '300px'
      },
      '.athea2': {
        height: '90px',
        marginTop: '10px',
        marginLeft: '580px'
      },
      '.polaris': {
        marginTop: '280px',
        marginLeft: '180px'
      },
      '.polaris2': {
        marginTop: '230px',
        marginLeft: '515px'
      },
      '.p-list-icon': {
        fontSize: '250%',
        margin: '2px'
      },
      'p-list-smIcon': {
        fontSize: '50%'
      },
      '.galaxy-window-top': {
        width: '100%',
        height: '70%'
      },
      '.menu-side': {
        width: '20%'
      },
      '.temp-div': {
        width: '80%'
      },
      '.menu-bottom': {
        height: '30%'
      },
      '.menu-bottom-container': {
        width: '95%',
        height: '80%',
        border: '2px solid #75DDDD',
        backgroundColor: '#2D3047',
        borderRadius: '15px'
      },
      '.menu-side-container': {
        width: '70%',
        height: '93%',
        border: '2px solid #75DDDD',
        backgroundColor: '#2D3047',
        borderRadius: '15px'
      },
    },
  },
};
const theme = extendTheme(overrides);

export default theme;