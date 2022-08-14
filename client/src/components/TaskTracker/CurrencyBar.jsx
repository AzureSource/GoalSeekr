import React, {useState} from 'react';
import { Flex } from '@chakra-ui/react';
import {
  Tag,
} from '@chakra-ui/react';

const CurrencyBar = () => {
  const [currency, setCurrency] = useState(25);
  return (
    <Flex className="currBarContainer" m=".5rem"
      h="55%" w="50%" size="lg"
    >
      <Tag className="currBar" colorScheme="teal" w="100%" fontSize="2xl" justifyContent="center"
        border="1px solid" borderRadius="10px"
      >
        Currency earned: ${currency}
      </Tag>
    </Flex>
  );
};

export default CurrencyBar;