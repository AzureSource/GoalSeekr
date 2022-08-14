import React, {useState} from 'react';
import { Box, Flex, Heading, IconButton } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

const Task = ({ task }) => {
  const [taskComplete, setTaskComplete] = useState(false);

  return (
    <Flex className="singleTaskContainer"
      border="1px solid"
      m=".3rem" h="5rem" minH="5rem"
      justifyContent="space-around" alignItems="center"
    >
      <Flex className="description">
        {task.description}
      </Flex>
      <Flex className="reward+status" flexDirection="column-reverse">
        <Flex className="reward">
          ${task.reward}
        </Flex>
        <Flex className="status" onClick={() => setTaskComplete(!taskComplete)}>
          <IconButton
            aria-label='Search database'
            icon={<CheckIcon />}
            colorScheme={taskComplete ? 'teal' : 'gray'}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Task;