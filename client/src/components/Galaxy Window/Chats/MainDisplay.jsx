import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Flex, Text} from '@chakra-ui/react';

const MainDisplay = ({ chatAdded, galID, id }) => {
  const [chats, setChats] = useState([]);
  const [chatUpdater, setChatUpdater] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setChatUpdater((prev) => prev + 1);
      console.log(chatUpdater);
    }, 2700);
  }, []);

  useEffect(() => {
    axios.get(`/api/chats/${galID}`)
      .then((result) => {
        setChats(result.data);
        // console.log('chats refreshed');
      })
      .catch((err) => console.log(err));
  }, [galID, chatAdded, chatUpdater]);

  return (
    <Flex className='chatsMainDisplay'h="75%" w="100%" flexDirection="column"
      overflow="auto"
    >
      {chats.length && chats.map((chat) => (
        // <Flex className="messageContainer" key={chat.id} border="1px solid" m="0.2rem" px='.5rem' py='.2rem' mx='.3rem'
        //   borderRadius="5px" borderColor="#50b6ab"
        //   wrap='row'
        //   color={chat.userID.toString() === id ? 'rgb(80 182 171 / 62%)' : '#2e2f47'}
        //   background={chat.userID.toString() === id ? '#2e2f47' : 'rgb(80 182 171 / 62%)'}
        <Flex className="messageContainer" key={chat.id} border="1px solid" m="0.2rem"
          maxWidth="80%" marginLeft="20px" marginRight="20px"
          borderRadius="10px" borderColor="#50b6ab"
          alignSelf={chat.userID.toString() === id ? 'flex-end' : 'flex-start'}
          color={chat.userID.toString() === id ? 'rgb(80 182 171 / 62%)' : '#2e2f47'}
          background={chat.userID.toString() === id ? '#2e2f47' : 'rgb(80 182 171 / 62%)'}
        >
          <Text><b>{chat.Username}</b>:&nbsp;{chat.message}</Text>
        </Flex>
      ))}
    </Flex>

  );
};

export default MainDisplay;
