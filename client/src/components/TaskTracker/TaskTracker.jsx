import React from 'react';
import { Flex } from '@chakra-ui/react';
import ColsContainer from './Columns/ColsContainer.jsx';
import CurrencyBar from './CurrencyBar.jsx';

const TaskTracker = () => {
  return (
    <Flex className="mainContainer" flexDirection="column" h="100vh">
      <Flex className="navBar" h="5%" justifyContent="center">
        Nav bar, etc will go here
      </Flex>
      <Flex className="taskTrackerContainer" h="85%">
        <ColsContainer />
      </Flex>
      <Flex className="footer" h="10%" justifyContent="flex-end">
        <CurrencyBar />
      </Flex>
    </Flex>
  );
};

export default TaskTracker;