import React, { useState } from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';
import axios from 'axios';

const TasksContainer = ( {difficulty} ) => {
  const [tasks, setTasks] = useState([]);

  axios.get('/api/tasks/easy')
    .then((results) => {
      setTasks(results.data);
    })
    .catch((err) => {
      console.log('error getting results to client line 13:\n', err);
    });

  return (
    <Flex className="tasksContainer">
      Hello
    </Flex>
  );
};

export default TasksContainer;