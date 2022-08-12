import { extendTheme } from '@chakra-ui/react';

const overrides = {
  styles: {
    global: {
      // add styles here
      '.app': {
        fontSize: '100px'
      }
    },
  },
};
const theme = extendTheme(overrides);

export default theme;