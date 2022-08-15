import React from 'react';
import axios from 'axios';
import { Flex, Input, Button } from '@chakra-ui/react';
import SelectGalaxySize from './SelectGalaxySize.jsx';
import GalaxyOptions from './GalaxyOptions.jsx';

const CreateGalaxy = () => {

  const submitGalaxy = (data) => {
    return axios.get('endpoint', data);
  }

  return (
    <Flex className='create-galaxy-container'
      justify='center'
      align='center'
    >
      <Flex
        className='create-galaxy'
        flexDir='column'
        justify='center'
      >
        <Flex
          className='galaxy-input-row'
          justify='center'
        >
          <Input
            width='300px'
            background='white'
            variant='outline'
            outline='3px solid #2e2f47'
            className='galaxy-name-input'
            placeholder='Enter Galaxy Name'
          />
        </Flex>
        <Flex
          className='create-galaxy-content'
          justify='space-evenly'
        >
          <SelectGalaxySize />
          <GalaxyOptions />
        </Flex>
        <Flex
          className='create-galaxy-btn-container'
          justify='space-evenly'
        >
          <Button
            backgroundColor='#2e2f47'
            className='create-galaxy-btn'
          >
            Cancel
          </Button>
          <Button
            backgroundColor='#2e2f47'
            className='create-galaxy-btn'
          >
            Create Galaxy
          </Button>
        </Flex>
      </Flex>
      <Flex>
      </Flex>
    </Flex>
  );
};

export default CreateGalaxy;