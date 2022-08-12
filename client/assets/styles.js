import { extendTheme } from '@chakra-ui/react';

const overrides = {
  styles: {
    global: {
      // add styles here
      '.app': {
        fontSize: '200px'
      }
    },
  },
};
const theme = extendTheme(overrides);

export default theme;