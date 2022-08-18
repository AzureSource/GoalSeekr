import React from 'react';
import { Flex, FormControl, Spacer, Stack, Text, Button, Input } from '@chakra-ui/react';
import SendBox from './SendBox.jsx';
import MainDisplay from './MainDisplay.jsx';
import ChatsTitle from './ChatsTitle.jsx';

const Chats = () => {
  return (
    <Stack className='chats-container'>
      <ChatsTitle />
      <MainDisplay />
      <SendBox />

    </Stack>
  );
};

export default Chats;