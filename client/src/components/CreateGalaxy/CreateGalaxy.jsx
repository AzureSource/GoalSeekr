import React from 'react';
import { Flex, Input, Image, Button } from '@chakra-ui/react';
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
            className='galaxy-name-input'
            placeholder='Enter Galaxy Name'
          />
        </Flex>
        <Flex
          className='create-galaxy-content'
          justify='space-evenly'
        >
          <Flex
            className='galaxy-size-container'
            flexDir='column'
          >
            <div
              className='galaxy-size-heading'
            >
              Select Galaxy Size
            </div>
            <Flex
              className='galaxy-size-images-container'
              justify='space-between'
            >
              <Image
                className='galaxy-size-images'
                boxSize='155px'
                objectFit='cover'
                src={smallGalaxy}
              />
              <Image
                className='galaxy-size-images'
                boxSize='155px'
                objectFit='cover'
                src={bigGalaxy}
              />
            </Flex>
          </Flex>
          <Flex
            className='galaxy-option-container'
            justify='space-between'
            flexDir='column'
          >
            <div className='galaxy-side-headings'>
              <div>Max Players</div>
              <div>count default 2</div>
            </div>
            <div className='galaxy-side-headings'>
              <div>Years Per Turn</div>
              <div>count default 2</div>

            </div>
            <div className='galaxy-side-headings'>
              <div>Alliances</div>
              <div>switch to turn on</div>
            </div>
          </Flex>
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