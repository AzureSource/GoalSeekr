import { extendTheme } from '@chakra-ui/react';
import background from './images/sparse sky.png';

const overrides = {
  styles: {
    global: {
      // add styles here
      '.app': {
        height: '100%',
        fontSize: '100px'
      },
      '.appBackground': {
        backgroundImage: background,
        height: '100%',
        backgroundSize: 'contain'
      },
      'body': {
        overflow: 'hidden'
      },
      'body.chakra-ui-light, html': {
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
    },
  },
};
const theme = extendTheme(overrides);

export default theme;