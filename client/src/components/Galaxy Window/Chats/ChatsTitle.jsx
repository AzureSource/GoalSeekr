import React from 'react';
import { Flex, Text, Heading } from '@chakra-ui/react';

const ChatsTitle = () => {
  return (
    <Flex className='chatsTitle' h="9%" w="100%" borderBottom="1px solid"
      justifyContent="center" borderColor="#50b6ab"
    >
      <Heading size="sm" color="rgb(123 177 171)">
        Chat
      </Heading>
    </Flex>
  );
};

export default ChatsTitle;