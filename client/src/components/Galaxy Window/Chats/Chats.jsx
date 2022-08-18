import React from 'react';
import { Flex, FormControl, Spacer, Stack, Text, Button, Input } from '@chakra-ui/react';

const Chats = () => {
  return (
    <Stack className='chats-container'>
      <Flex className='chatsTitle'
        h="9%" w="100%"
        borderBottom="1px solid"
        justifyContent="center"
      >
        <Text>Chat</Text>
      </Flex>
      <Flex className='chatsMainDisplay'
        h="73%" w="100%"
        flexDirection="column"
        overflow="auto"
        // borderBottom="1px solid"
      >
        <Text>main display</Text>
        <Text>main display</Text>
        <Text>main display</Text>
        <Text>main display</Text>
        <Text>main display</Text>
        <Text>main display</Text>
        <Text>main display</Text>
        <Text>main display</Text>
        <Text>main display</Text>
        <Text>main display</Text>
      </Flex>
      <Flex className='chatsSendBox'
        h="12%" w="100%"
      >
        <Flex
          flexDirection="row"
          flexGrow="1"
        >
          <Input
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
    </Stack>
  );
};

export default Chats;