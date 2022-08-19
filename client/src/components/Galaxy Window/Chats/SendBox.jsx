import React, { useState, useEffect } from 'react';
import { Flex, Button, Input } from '@chakra-ui/react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

const SendBox = ({ setChatAdded }) => {
  const [message, setMessage] = useState('');
  const {id} = useParams();
  const [galID, setGalID] = useState();

  useEffect(() => {
    axios.get(`/api/galaxy/${id}`)
      .then((result) => setGalID(result.data.rows[0].currentgalaxy))
      .catch((err) => console.log('error getting galID line 15:\n', err));
  },[]);

  function handleInputChange(event){
    setMessage(event.target.value);
  }

  function handleFormSubmit(){
    console.log(message);
    const messageObj = {
      message,
      userID: id,
    };
    axios.post(`/api/chats/${galID}`, messageObj)
      .then((result) => console.log('message sent:', result))
      .then(setChatAdded((prev) => !prev))
      .catch((err) => console.log('error sending message', err));
    setMessage('');
  }

  return (
    <Flex className='chatsSendBox' h="12%" w="100%">
      <Flex
        flexDirection="row"
        flexGrow="1"
        borderColor="#50b6ab"
      >
        <Input
          h="2rem" focusBorderColor='teal.400' placeholder='Send a message to the galaxy...'
          onChange={(event) => handleInputChange(event)} value={message}
        />
        <Button
          colorScheme="teal"
          h="2rem"
          onClick={handleFormSubmit}
        >
          Send
        </Button>
      </Flex>
    </Flex>
  );
};

export default SendBox;