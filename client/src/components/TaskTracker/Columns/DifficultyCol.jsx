import React from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';
import TasksContainer from '../Tasks/TasksContainer.jsx';

const DifficultyCol = ({ difficulty }) => {

  return (
    <Flex className="singleColumnContainer"
      flexDirection="column" justifyContent="flex-start" alignItems="center" flexGrow="1"
      w="20%" border="1px solid" m="0.1rem"
    >
      <Flex className="titleContainer"
        h="8%" w="92%" m="0.1rem" mb="1rem"
        border="thick double" borderWidth="medium"
        justifyContent="center" alignItems="center"
      >
        <Heading fontSize="2rem">{difficulty}</Heading>
      </Flex>
      <Flex className="tasksContainer"
        border="1px solid"
        h="8%" w="92%"
      >
        <TasksContainer />
      </Flex>
    </Flex>
  );
};

export default DifficultyCol;