import React, { useState } from 'react';
import ColsContainer from './Columns/ColsContainer.jsx';
import CurrencyBar from './CurrencyBar.jsx';
import {Flex} from '@chakra-ui/react';

const TaskTracker = () => {
  const [taskUpdated, setTaskUpdated] = useState(false);

  return (
    <Flex className="mainContainer" flexDirection="column" h="100%" w="100%" color="teal">
      <Flex className="taskTrackerContainer" h="90%">
        <ColsContainer setTaskUpdated={setTaskUpdated}/>
      </Flex>
      <Flex className="footer" h="10%" justifyContent="flex-end">
        <CurrencyBar taskUpdated={taskUpdated}/>
      </Flex>
    </Flex>
  );
};

export default TaskTracker;