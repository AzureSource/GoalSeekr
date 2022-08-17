import React, { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import ColsContainer from './Columns/ColsContainer.jsx';
import CurrencyBar from './CurrencyBar.jsx';

const TaskTracker = ({ setTitle }) => {
  const [taskUpdated, setTaskUpdated] = useState(false);

  useEffect((()=>setTitle(false)), []);

  return (
    <Flex className="mainContainer" flexDirection="column" h="100vh">
      <Flex className="navBar" h="5%" justifyContent="center">
        Nav bar, etc will go here
      </Flex>
      <Flex className="taskTrackerContainer" h="85%">
        <ColsContainer setTaskUpdated={setTaskUpdated}/>
      </Flex>
      <Flex className="footer" h="10%" justifyContent="flex-end">
        <CurrencyBar taskUpdated={taskUpdated}/>
      </Flex>
    </Flex>
  );
};

export default TaskTracker;