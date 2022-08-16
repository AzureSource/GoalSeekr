import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import { Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

export default function EnterGalaxy({ setTitle }){
  let params = useParams();

  const redirectToCreateGalaxyPage = function(){
    window.location.href = `http://localhost:7777/#/creategalaxy/uid/${params.id}`;
  };

  const redirectToGalaxyWindow = function(){
    window.location.href = `http://localhost:7777/#/galaxy/uid/${params.id}`;
  };

  const[existingGalaxy,setExistingGalaxy]=useState('');
  // const[galaxyData,setGalaxyData] = useState(undefined);

  const handleCreateGalaxy = function(event){
    event.preventDefault();
    redirectToCreateGalaxyPage();
  };

  const handleJoinGalaxy = function(event){
    event.preventDefault();
    if(existingGalaxy){
      axios({
        url:'/api/galaxy',
        method:'get',
        params:{
          name:existingGalaxy,
          id: params.id
        }
      })
        .then(({data})=>{
          //setGalaxyData(response.data),
          if(data.length){
            redirectToGalaxyWindow();
          }
          //console.log(data);
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

  useEffect(() => {
    setTitle(true);
  }, []);

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
            onChange={(event)=>setExistingGalaxy(event.target.value)}
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
