import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { Flex, IconButton, Tooltip } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import axios from 'axios';

const Task = ({ task, setTaskUpdated }) => {
  const [taskComplete, setTaskComplete] = useState();
  const {id} = useParams();

  //sets status of task based on users_tasks table
  useEffect((() => {
    axios.get(`/api/tasks/${id}/${task.id}`)
      .then((result) => setTaskComplete(result.data, 'iscomlete line 14'))
      .catch((err) => console.log('error getting task status line 15:\n', err));
  }), []);

  function completeTask () {
    setTaskUpdated((prev) => !prev);
    setTaskComplete(!taskComplete);
    axios.post(`/api/tasks/${id}/${task.id}`)
      .then((result) => console.log(result.data))
      .catch((err) => console.log('line 22:\n', err));
  }

  return (
    <Flex className="singleTaskContainer"
      border="1px solid" background="rgb(0 128 128 / 47%)" borderRadius="10px"
      m=".3rem" h="5rem" minH="5rem"
      overflow="auto"
      justifyContent="space-around" alignItems="center"
    >
      <Flex className="description" w="60%" color="white">
        {task.description}
      </Flex>
      <Flex className="reward+status" flexDirection="column-reverse">
        <Flex className="reward" color="white">
          ${task.reward}
        </Flex>
        <Flex className="taskStatus" onClick={completeTask}>
          <Tooltip className="tooltip" label={taskComplete? '' : 'Click to mark task complete!'}>
            <div className="iconContainer">
              <IconButton
                className="icon"
                aria-label='Complete task'
                icon={<CheckIcon />}
                colorScheme={taskComplete ? 'teal' : 'gray'}
              />
            </div>
          </Tooltip>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Task;