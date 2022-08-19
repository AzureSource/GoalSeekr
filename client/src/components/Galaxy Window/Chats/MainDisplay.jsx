import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Flex, Text} from '@chakra-ui/react';
import {useParams} from 'react-router-dom';

const MainDisplay = ({ chatAdded }) => {
  const [chats, setChats] = useState([]);
  const {id} = useParams();

  useEffect(() => {
    axios.get('/api/chats/1')
      .then((result) => setChats(result.data))
      .catch((err) => console.log(err));
  }, [chatAdded]);

  return (
    <Flex className='chatsMainDisplay'h="73%" w="100%" flexDirection="column"
      overflow="auto"
    >
      {chats.map((chat) => (
        <Flex className="messageContainer" key={chat.id} border="1px solid" m="0.2rem"
          borderRadius="10px" borderColor="#50b6ab" color="#2e2f47" background={chat.userID.toString() === id ? 'rgb(80 182 171 / 62%)' : 'rgba(66, 153, 225, 0.6)'}
        >
          {console.log([chat.userID, id], 'ibraheeeem')}
          {/* add conditional - if chat.userid is same as user change color */}
          <Text><b>{chat.Username}</b>:&nbsp;{chat.message}</Text>
        </Flex>
      ))}
    </Flex>

  );
};

export default MainDisplay;