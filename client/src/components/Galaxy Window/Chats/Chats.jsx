import React, { useState, useEffect, useRef } from 'react';
import { Stack } from '@chakra-ui/react';
import SendBox from './SendBox.jsx';
import MainDisplay from './MainDisplay.jsx';
import ChatsTitle from './ChatsTitle.jsx';
import axios from 'axios';
import {useParams} from 'react-router-dom';

const Chats = () => {
  const [chatAdded, setChatAdded] = useState(false);
  const [galID, setGalID] = useState();
  const {id} = useParams();

  useEffect(() => {
    axios.get(`/api/galaxy/${id}`)
      .then((result) => setGalID(result.data.rows[0].currentgalaxy))
      .catch((err) => console.log('error getting galID line 15:\n', err));
  },[]);


  return (
    <Stack className='chats-container'>
      <ChatsTitle />
      <MainDisplay
        chatAdded={chatAdded} galID={galID} id={id}
      />
      <SendBox setChatAdded={setChatAdded} galID={galID} id={id}/>

    </Stack>
  );
};

export default Chats;