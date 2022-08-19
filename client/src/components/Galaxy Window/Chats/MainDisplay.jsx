import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Flex, Text} from '@chakra-ui/react';

const MainDisplay = ({ chatAdded, galID, id }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    axios.get(`/api/chats/${galID}`)
      .then((result) => setChats(result.data))
      .catch((err) => console.log(err));
  }, [galID, chatAdded]);

  return (
    <Flex className='chatsMainDisplay'h="70%" w="100%" flexDirection="column"
      overflow="auto"
    >
      {chats.map((chat) => (
        <Flex className="messageContainer" key={chat.id} border="1px solid" m="0.2rem"
          borderRadius="5px" borderColor="#50b6ab"
          color={chat.userID.toString() === id ? 'rgb(80 182 171 / 62%)' : '#2e2f47'}
          background={chat.userID.toString() === id ? '#2e2f47' : 'rgb(80 182 171 / 62%)'}
        >
          {console.log([chat.userID, id], 'ibraheeeem')}
          <Text><b>{chat.Username}</b>:&nbsp;{chat.message}</Text>
        </Flex>
      ))}
    </Flex>

  );
};

export default MainDisplay;