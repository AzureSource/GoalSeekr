import React from 'react';
import { Flex, Text, Heading } from '@chakra-ui/react';

const ChatsTitle = () => {
  return (
    <Flex className='chatsTitle' h="10%" w="100%" borderBottom="1px solid"
      justifyContent="center" borderColor="#50b6ab"
    >
      <Heading
        size="sm" color="rgb(123 177 171)"
        alignSelf='center'
      >
        Chat
      </Heading>
    </Flex>
  );
};

export default ChatsTitle;