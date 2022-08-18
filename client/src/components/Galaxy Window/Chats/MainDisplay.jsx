import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Flex, Text} from '@chakra-ui/react';

const MainDisplay = () => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    axios.get('/api/chats/2')
      .then((result) => setChats(result.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Flex className='chatsMainDisplay'h="73%" w="100%" flexDirection="column"
      overflow="auto"
    >
      {chats.map((chat) => (
        <Flex className="messageContainer" key={chat.id} border="1px solid" m="0.2rem"
          borderRadius="11px" color="rgb(123 177 171)"
        >
          {/* add conditional - if chat.userid is same as user change color */}
          <Text>{chat.Username}:&nbsp;</Text>
          <Text>{chat.message}</Text>
        </Flex>
      ))}
    </Flex>

  );
};

export default MainDisplay;