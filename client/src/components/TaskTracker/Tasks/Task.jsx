import React, {useState} from 'react';
import { Flex, IconButton, Tooltip } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

const Task = ({ task }) => {
  const [taskComplete, setTaskComplete] = useState(false);
  // everytime a task is clicked, add that task id and user
  // id to tasks_user. Currency will be the sum of reward for all
  // tasks for a specific user.

  return (
    <Flex className="singleTaskContainer"
      border="1px solid"
      m=".3rem" h="5rem" minH="5rem"
      overflow="auto"
      justifyContent="space-around" alignItems="center"
    >
      <Flex className="description" w="60%">
        {task.description}
      </Flex>
      <Flex className="reward+status" flexDirection="column-reverse">
        <Flex className="reward">
          ${task.reward}
        </Flex>
        <Flex className="taskStatus" onClick={() => setTaskComplete(!taskComplete)}>
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