import React from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';

const DifficultyCol = ({ difficulty }) => {

  return (
    <Flex className="singleColumnContainer"
      flexDirection="column" justifyContent="flex-start" alignItems="center" flexGrow="1"
      w="20%" border="1px solid"
    >
      <Flex className="titleContainer"
        h="8%" w="92%"
        border="thick double" borderWidth="medium"
        justifyContent="center" alignItems="center"
      >
        <Heading fontSize="2rem">{difficulty}</Heading>
      </Flex>
      <Flex className="tasksContainer">
        <div>somethinggg</div>
      </Flex>
    </Flex>
  );
};

export default DifficultyCol;