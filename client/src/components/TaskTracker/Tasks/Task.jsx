import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useParams} from 'react-router-dom';
import { Flex, IconButton, Tooltip } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setUpdateFlag } from '../currencyUpdateFlag';

const Task = ({ task }) => {
  const [taskComplete, setTaskComplete] = useState();
  const {id} = useParams();
  const dispatch = useDispatch();
  // const taskUpdatedFlag = useSelector((state) => state.currencyUpdateFlag.updateFlag);

  //sets status of task based on users_tasks table
  useEffect((() => {
    axios.get(`/api/tasks/${id}/${task.id}`)
      .then((result) => setTaskComplete(result.data, 'iscomlete line 14'))
      .catch((err) => console.log('error getting task status line 15:\n', err));
  }), []);

  function completeTask () {
    dispatch(setUpdateFlag());

    setTaskComplete(!taskComplete);
    axios.post(`/api/tasks/${id}/${task.id}`)
      .then((result) => console.log(result.data))
      .catch((err) => console.log('line 22:\n', err));
  }

  return (
    <Flex className="singleTaskContainer"
      border="1px solid" borderRadius="6px"
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
        <Flex className="taskStatus" onClick={completeTask} justifyContent='end'>
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

Task.propTypes = {
  task: PropTypes.object.isRequired,
};

export default Task;