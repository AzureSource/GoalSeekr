import React from 'react';
import { Flex } from '@chakra-ui/react';
import {
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton,
} from '@chakra-ui/react'

const CurrencyBar = () => {
  return (

    <Flex className="currBarContainer" m=".5rem"
      h="55%" w="50%" size="lg"
      border="1px solid"
    >
      <Tag className="currBar" colorScheme="teal" w="100%" fontSize="2xl" justifyContent="center">
        Currency earned: $XX
      </Tag>
    </Flex>
  );
};

export default CurrencyBar;