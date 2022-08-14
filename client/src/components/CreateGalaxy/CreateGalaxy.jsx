import React from 'react';
import { Flex, Input, Image } from '@chakra-ui/react';
import smallGalaxy from '../../../assets/images/smallGalaxy.jpeg';
import bigGalaxy from '../../../assets/images/bigGalaxy.jpeg';

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
        <Flex
          className='galaxy-input-row'
          justify='center'
        >
          <Input
            width='300px'
            background='white'
            variant='outline'
            className='galaxy-name-input'
            placeholder='Enter Galaxy Name'
          />
        </Flex>
        <Flex>
          <Flex
            className='create-galaxy-content'
            flexDir='row'
          >
            <Flex
              className='galaxy-size-container'
              flexDir='column'
            >
              <div className='galaxy-size-heading'>
                  Select Galaxy Size
              </div>
              <Flex>
                <Image
                  boxSize='150px'
                  objectFit='cover'
                  src={smallGalaxy}
                />
                <Image
                  boxSize='150px'
                  objectFit='cover'
                  src={bigGalaxy}
                />
              </Flex>
            </Flex>
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
        <Flex>


        </Flex>
      </Flex>
    </Flex>
  );
};

export default CreateGalaxy;