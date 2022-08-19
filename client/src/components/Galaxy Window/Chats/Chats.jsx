import React, { useState } from 'react';
import { Flex, FormControl, Spacer, Stack, Text, Button, Input } from '@chakra-ui/react';
import SendBox from './SendBox.jsx';
import MainDisplay from './MainDisplay.jsx';
import ChatsTitle from './ChatsTitle.jsx';

const Chats = () => {
  const [chatAdded, setChatAdded] = useState(false);

  return (
    <Stack className='chats-container'>
      <ChatsTitle />
      <MainDisplay chatAdded={chatAdded}/>
      <SendBox setChatAdded={setChatAdded}/>

    </Stack>
  );
};

export default Chats;