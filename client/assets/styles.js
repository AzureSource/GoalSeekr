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
        border: '2px solid #50b6ab',
        backgroundColor: '#2e2f47',
        borderRadius: '15px'
      },
      '.menu-side-container': {
        width: '70%',
        height: '85%',
        border: '2px solid #50b6ab',
        backgroundColor: '#2e2f47',
        borderRadius: '15px'
      },
      '.title-bar': {
        width: '100%',
        height: '27%',
        background: 'linear-gradient(0deg, rgba(45,48,71,0.96) 2%, rgba(9,188,138,0.39399509803921573) 100%)',
        backgroundOpacity: 0.7
      },
      '.title-name': {
        position: 'relative',
        top: '35px',
        width: '80%',
        height: '50%',
        backgroundColor: '#2e2f47',
        borderRadius: '15px',
        fontFamily: 'Abril Fatface',
        fontSize: '40px',
        fontWeight: 'bolder',
        color: '#50b6ab'
      },
      '.lobby-menu-container': {
        height: '67%',
        width: '100%'
      },
      '.lobby-menu': {
        height: '80%',
        width: '35%',
        background: 'linear-gradient(180deg, rgba(45,48,71,0.96) 2%, rgba(80,182,171,0.7536057692307692) 85%)'
      },
      '.create-galaxy-container': {
        height: '100%'
      },
      '.create-galaxy': {
        background: 'linear-gradient(180deg, rgba(45,48,71,0.96) 2%, rgba(211,254,78,0.5228365384615384) 100%)',
        minHeight: '500px',
        minWidth: '900px'
      },
      '.login-with-google-btn': {
        backgroundColor: '#2e2f47',
        width: '200px',
        height: '50px'
      }
    },
  },
};
const theme = extendTheme(overrides);

export default theme;