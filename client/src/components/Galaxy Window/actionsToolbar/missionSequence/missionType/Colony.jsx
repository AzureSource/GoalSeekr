import axios from 'axios';
import { useParams } from 'react-router-dom';

const Colony = ({ targetPlanet }) => {
  const {id} = useParams();

  let config = {
    data: {
      'type': 'colony',
      'targetPlanet': targetPlanet
    }
  };
  axios.post(`api/users/${id}/mission`, config)
    .then(() => {
      console.log('planet colonized');
    })
    .catch((err) =>{
      alert(err);
    });
};