import React from 'react';
import { Flex, FormControl, Spacer, Stack, Text, Button, Input } from '@chakra-ui/react';

const SendBox = () => {
  return (
    <Flex className='chatsSendBox' h="12%" w="100%">
      <Flex
        flexDirection="row"
        flexGrow="1"
        borderColor="#50b6ab"
      >
        <Input
        // have color change to same yellow as stars when clicked
          h="2rem"
        />
        <Button
          colorScheme="teal"
          h="2rem"
        >
          Send
        </Button>
      </Flex>
    </Flex>
  );
};

export default SendBox;