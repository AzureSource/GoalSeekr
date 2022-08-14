import React, { useState, useEffect } from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';
import axios from 'axios';
import Task from './Task.jsx';

const TasksContainer = ( {difficulty} ) => {
  const [tasks, setTasks] = useState([]);

  useEffect(
    () => {
      axios.get(`/api/tasks/${difficulty}`)
        .then((results) => {
          setTasks(results.data);
        })
        .catch((err) => {
          console.log('error getting results to client line 13:\n', err);
        });
    }, []
  );

  // if (tasks.length === 0) {
  //   return <div>no tasks of this level</div>;
  // }

  return (
    <Flex className="tasksContainer" flexDirection="column" overflow="auto"
      // border="1px solid"
      w="99%"
    >
      {tasks.map((task) => <Task key={task.id} task={task}/> )}
    </Flex>
  );
};

export default TasksContainer;