import React from 'react';
import {
  Flex,
  Input
} from '@chakra-ui/react';

const CreateGalaxy = () => {
  return (
    <Flex className='create-galaxy-container'
      justify='center'
      align='center'
    >
      <Flex
        className='create-galaxy'
        flexDir='column'
      >
        <Input />
        <Flex>
          <Flex
            className='create-galaxy-content'
            flexDir='row'
          >
            <div className='galaxy-size-container'>
              <div className='galaxy-size-heading'>
                  Select Galaxy Size
              </div>
              <div>
                <span>Image 1</span>
                <span>Image 2</span>
              </div>
            </div>
          </Flex>
          <Flex
            className='galaxy-option-container'
            flexDir='column'
          >
            <div>Max Players </div>
            <div>Years Per Turn </div>
            <div>Alliances Switch </div>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CreateGalaxy;