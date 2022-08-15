import React,{useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export default function EnterUserName ({authData}) {

  let params = useParams();
  const [text,setText] = useState('');

  const redirectToEnterGalaxyPage = function() {
    window.location.href = `http://localhost:7777/entergalaxy/uid/${params.authData.uid}`;
  };

  const handleJoin = function(){
    if(text){
      axios({
        url: `/api/users/${authData.uid}`,
        method: 'get'
      })
        .then((response) => {
          // user exists
          // if new name is the same with existing name, return
          if (response.data.username === text) {
            redirectToEnterGalaxyPage();
          }
          // update the user with new name
          axios({
            url: `/api/users/${authData.uid}`,
            method: 'put',
            data: {
              username: text
            }
          })
            .then(() => {
              // Redirect
              console.log('Update user complete');
              redirectToEnterGalaxyPage();
            })
            .catch((err) => {
              alert('Can not update user name');
              console.log('Error updating the user with id: ', authData.uid, err);
            });
        })
        .catch((err) => {
          // user does not exist
          if (err.response.status === 404) {
            // create user
            axios({
              url: `/api/users/${authData.uid}`,
              method: 'post',
              data: {...authData, username:text}
            })
              .then(() => {
                console.log('Create user complete');
                redirectToEnterGalaxyPage();
              })
              .catch((err) => {
                alert('Can not create user');
                console.log('Error creating the user with id: ', authData.uid, err);
              });
            return;
          }

          alert('Can not read user info');
          console.log('Error getting the user with id: ', authData.uid, err);
        });
    }
    else{
      alert('Please Enter your Username!');
    }
  };

  return (
    <div>
      <input placeholder = "Enter Username Display" onChange ={(event)=>setText(event.target.value)}/>
      <br />
      <button onClick = {handleJoin}>Join</button>
    </div>

  );

}