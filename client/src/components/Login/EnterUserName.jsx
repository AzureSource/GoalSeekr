import React,{useState} from 'react';
import axios from 'axios';
import { Button } from '@chakra-ui/react';

// eslint-disable-next-line react/prop-types
export default function EnterUserName ({authData}) {
  const [text,setText] = useState('');

  const redirectToEnterGalaxyPage = function(id) {
    window.location.href = `http://localhost:7777/#/entergalaxy/userid/${id}`;
  };

  const handleJoin = function(){
    if(text){
      axios({
        url:'/api/users',
        method:'post',
        data:{...authData,displayname:text}
      })
        .then((result)=>redirectToEnterGalaxyPage(result.data))
        .catch(()=>console.log('Err from enter user name'));
    }
    else{
      alert('Please Enter your Username!');
    }
  };

  return (
    <div className='username-btn-container'>
      <input
        className='username-input'
        placeholder = "Enter Username Display" onChange ={(event)=>setText(event.target.value)}
      />
      <br />
      <button
        className='username-input-btn'
        onClick={handleJoin}
      >
        Join
      </button>
    </div>
  );

}