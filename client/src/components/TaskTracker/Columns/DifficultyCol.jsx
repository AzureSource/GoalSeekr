import React from 'react';
import { Box,Flex, Heading } from '@chakra-ui/react';

const DifficultyCol = ({ difficulty }) => {
  return (
    <Flex className="singleColumnContainer" justifyContent="center" flexGrow="1" w="20%" border="1px solid">
      <Flex className="titleContainer">
        <Heading fontSize="2rem">{difficulty}</Heading>
      </Flex>
    </Flex>
  );
};

export default DifficultyCol;