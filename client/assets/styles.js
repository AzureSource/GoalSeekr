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
        width: '100%'
      },
      '.galaxy-window-top': {
        width: '100%',
        height: '80%'
      },
      '.window-side': {
        width: '20%'
      },
      '.temp-div': {
        width: '80%'
      }
    },
  },
};
const theme = extendTheme(overrides);

export default theme;