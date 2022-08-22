import React from 'react';
import PropTypes from 'prop-types';
import { Box, Flex, Heading, Tooltip, IconButton } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import TasksContainer from '../Tasks/TasksContainer.jsx';

const DifficultyCol = ({ difficulty }) => {

  return (
    <Flex className="singleColumnContainer"
      flexDirection="column" justifyContent="flex-start" alignItems="center" flexGrow="1"
      w="20%" border="2px solid rgb(80 182 171)" m="0.1rem" borderRadius="6px"
    >
      <Flex id="titleContainer"
        h="8%" minH="8%" w="92%" minW="92%" m="0.1rem" mb="1rem" mt='1rem'
        p='1rem'
        borderWidth="small"
        justifyContent="center" alignItems="center" background="rgb(80 182 171)" borderRadius="5px"
      >
        <Heading fontSize="2rem" fontFamily='Abril Fatface'>{difficulty}</Heading>
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
      <TasksContainer difficulty={difficulty} />
    </Flex>
  );
};

DifficultyCol.propTypes = {
  difficulty: PropTypes.string.isRequired,
};

export default DifficultyCol;