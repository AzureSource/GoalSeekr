import React from 'react';
import { Box, Flex, Heading, Tooltip, IconButton } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons'
import TasksContainer from '../Tasks/TasksContainer.jsx';

const DifficultyCol = ({ difficulty, setTaskUpdated }) => {

  return (
    <Flex className="singleColumnContainer"
      flexDirection="column" justifyContent="flex-start" alignItems="center" flexGrow="1"
      w="20%" border="2px solid" m="0.1rem" borderRadius="10px"
    >
      <Flex className="titleContainer"
        h="8%" minH="8%" w="92%" minW="92%" m="0.1rem" mb="1rem"
        border="thick double" borderWidth="medium"
        justifyContent="center" alignItems="center" background="#0080805e" borderRadius="10px"
      >
        <Heading fontSize="2rem" color="rgb(80 182 171)">{difficulty}</Heading>
        {/* future feature ability to add tasks */}
        {/* <Flex className="taskStatus" onClick={() => null}>
          <Tooltip className="tooltip" label='Add a task'>
            <div className="iconContainer">
              <IconButton
                className="icon"
                aria-label='Complete task'
                icon={<AddIcon />}
                colorScheme='gray'
              />
            </div>
          </Tooltip>
        </Flex> */}
      </Flex>
      <TasksContainer difficulty={difficulty} setTaskUpdated={setTaskUpdated}/>
    </Flex>
  );
};

export default DifficultyCol;