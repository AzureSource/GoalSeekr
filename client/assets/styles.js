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
        height: '100%'
      },
      'body.chakra-ui-light, html': {
        height: '100%'
      }
    },
  },
};
const theme = extendTheme(overrides);

export default theme;