import React from 'react';
import { Flex } from '@chakra-ui/react';

const TitleBar = () => {
  return (
    <Flex
      className='title-bar'
      justify='center'
    >
      <Flex
        className='title-name'
        justify='center'
        align='center'
      >
        GOALSEEKR
      </Flex>
    </Flex>
  );
};

export default TitleBar;