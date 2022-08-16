import React,{useState} from 'react';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
export default function EnterUserName ({authData}) {
  const [text,setText] = useState('');

  const redirectToEnterGalaxyPage = function(id) {
    window.location.href = `http://localhost:7777/#/entergalaxy/uid/${id}`;
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

  // const handleJoin = function(){
  //   if(text){
  //     axios({
  //       url: `/api/users/${authData.googleuid}`,
  //       method: 'get'
  //     })
  //       .then((response) => {
  //         // user exists
  //         // if new name is the same with existing name, return
  //         if (response.data.username === text) {
  //           redirectToEnterGalaxyPage();
  //         }
  //         // update the user with new name
  //         axios({
  //           url: `/api/users/${authData.googleuid}`,
  //           method: 'put',
  //           data: {
  //             username: text
  //           }
  //         })
  //           .then(() => {
  //             // Redirect
  //             console.log('Update user complete');
  //             redirectToEnterGalaxyPage();
  //           })
  //           .catch((err) => {
  //             alert('Can not update user name');
  //             console.log('Error updating the user with id: ', authData.googleuid, err);
  //           });
  //       })
  //       .catch((err) => {
  //         // user does not exist
  //         if (err.response.status === 404) {
  //           // create user
  //           axios({
  //             url: `/api/users/${authData.googleuid}`,
  //             method: 'post',
  //             data: {...authData, username:text}
  //           })
  //             .then(() => {
  //               console.log('Create user complete');
  //               redirectToEnterGalaxyPage();
  //             })
  //             .catch((err) => {
  //               alert('Can not create user');
  //               console.log('Error creating the user with id: ', authData.googleuid, err);
  //             });
  //           return;
  //         }

  //         alert('Can not read user info');
  //         console.log('Error getting the user with id: ', authData.googleuid, err);
  //       });
  //   }
  //   else{
  //     alert('Please Enter your Username!');
  //   }
  // };

  return (
    <div>
      <input placeholder = "Enter Username Display" onChange ={(event)=>setText(event.target.value)}/>
      <br />
      <button onClick = {handleJoin}>Join</button>
    </div>

  );

}