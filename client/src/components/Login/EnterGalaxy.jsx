import React,{ useState, useEffect } from 'react';
import axios from 'axios';
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
    <div>
      <button type="button" onClick={(event)=>handleCreateGalaxy(event)}>CreateGalaxy</button><br />
      <p>OR</p><br />
      <input onChange={(event)=>setExistingGalaxy(event.target.value)} placeholder=" Enter An Existing Galaxy "/><br />
      <button type="button" onClick={(event)=>handleJoinGalaxy(event)}>Join Galaxy</button>
    </div>
  );

}
