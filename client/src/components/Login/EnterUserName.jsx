import React,{useState} from 'react';
import axios from 'axios';

export default function EnterUserName () {

  const [text,setText] = useState('');
  const [showGalaxy, setShowGalaxy] = useState(false);
  const handleJoin = function(){
    if(text){

    }
    else{
      alert('Please Enter your Username!');
    }

    setShowGalaxy(true);
  }

  return (
    <div>
      <input placeholder = "Enter Username Display" onChange ={(event)=>setText(event.target.value)}/>
      <button onClick = {handleJoin}>Join</button>
    </div>

  );

}