import React from 'react';
import { Flex } from '@chakra-ui/react';
import Container from './Columns/Container.jsx';

const TaskTracker = () => {
  return (
    <Flex className="mainContainer" flexDirection="column" h="100vh">
      <Flex className="navBar" h="5%" justifyContent="center">
        Nav bar, etc will go here
      </Flex>
      <Flex className="taskTrackerContainer" h="85%">
        <Container />
      </Flex>
      <Flex className="footer" h="10%" justifyContent="center">
        Footer
      </Flex>
    </Flex>
  );
};

export default TaskTracker;