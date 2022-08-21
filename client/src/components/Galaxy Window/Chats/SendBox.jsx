import React, { useState, useEffect } from 'react';
import { Flex, Button, Input } from '@chakra-ui/react';
import axios from 'axios';

const SendBox = ({ setChatAdded, id, galID }) => {
  const [message, setMessage] = useState('');

  function handleInputChange(event){
    setMessage(event.target.value);
  }

  // function handleFormSubmit(){
  //   const messageObj = {
  //     message,
  //     userID: id,
  //   };
  //   axios.post(`/api/chats/${galID}`, messageObj)
  //     .then((result) => console.log('message sent:', result))
  //     .then(setTimeout(() => {setChatAdded((prev) => !prev);}, 0))
  //     .catch((err) => console.log('error sending message', err));
  //   setMessage('');
  // }

  return (
    <Flex
      className='chatsSendBox'
      h="15%" w="100%"
      // borderTop="1px solid"
      // borderColor="#50b6ab"
    >
      <Flex
        flexDirection="row"
        flexGrow="1"
        alignSelf='center'
        borderColor="#50b6ab"
      >
        <Input
          h="2rem" focusBorderColor='teal.400' placeholder='Send a message to the galaxy...'
          // onChange={(event) => handleInputChange(event)} value={message}
        />
        <Button
          colorScheme="teal"
          border="1px solid #50b6ab"
          background="#2e2f47" color="#50b6ab"
          h="2rem"
          // onClick={handleFormSubmit}
        >
          Send
        </Button>
      </Flex>
    </Flex>
  );
};

export default SendBox;