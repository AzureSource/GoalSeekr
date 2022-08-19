import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import { Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

export default function EnterGalaxy({ setTitle }){
  let params = useParams();

  const redirectToCreateGalaxyPage = function(){
    window.location.href = `http://localhost:7777/#/creategalaxy/userid/${params.id}`;
  };

  const redirectToGalaxyWindow = function(){
    window.location.href = `http://localhost:7777/#/galaxy/userid/${params.id}`;
  };

  const [inputGalaxy,setInputGalaxy] = useState('');

  const handleCreateGalaxy = function(event){
    event.preventDefault();
    redirectToCreateGalaxyPage();
  };

  const handleJoinGalaxy = function(event){
    event.preventDefault();
    if(inputGalaxy){
      axios({
        url:'/api/galaxy',
        method:'get',
        params:{
          name:inputGalaxy,
          id: params.id
        }
      })
        .then(({data})=>{
          if(data.length){
            const gal_id = data[0].id;
            const u_id = params.id;//user id
            // if(data[0].isGameOn){
            //   alert('Galaxy Battle Started, Please Join Another Galxy Or Create A New One');
            // }
            // else{
            axios.put(`/api/user/${u_id}/${gal_id}`)
              .then((res) => console.log( res ? 'User/Galaxy Updated' : 'Update Failed', res))
              .catch((err) => console.log('Request unsucessful', err));
            redirectToGalaxyWindow();
            // }
          }
          else{
            alert('Please Enter Correct Galaxy Name Or Create A New One');
          }
        })
        .catch(()=>console.log('Error'));
    }
    else{
      alert('Please Enter Your Existing Galaxy');
    }

  };

  useEffect(() => setTitle(true), []);

  return (
    <Flex
      className='lobby-menu-container'
      justify='center'
      align='center'
    >
      <Flex
        className='lobby-menu'
        justify='center'
        align='center'
      >
        <Flex
          className='enter-galaxy-container'
          flexDir='column'
          align='center'
          justify='center'
        >
          <button
            className='create-new-galaxy-btn'
            type="button"
            onClick={(event)=>handleCreateGalaxy(event)}
          >
            Create Galaxy
          </button>
          <p className='or-seperator'>OR</p>
          <input
            className='enter-existing-galaxy-input'
            onChange={(event)=>setInputGalaxy(event.target.value)}
            placeholder=" Join An Existing Galaxy "
          />
          <button
            className='join-galaxy-btn'
            type="button" onClick={(event)=>handleJoinGalaxy(event)}
          >
            Join Galaxy
          </button>
        </Flex>
      </Flex>
    </Flex>
  );

}
