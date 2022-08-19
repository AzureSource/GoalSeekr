import axios from 'axios';
import { useParams } from 'react-router-dom';

const Scout = ({targetPlanet}) => {
  const {id} = useParams();
  let config = {
    data: {
      'type': 'scout',
      'targetPlanet': targetPlanet
    }
  };
  axios.post(`api/users/${id}/mission`, config)
    .then(() => {
      console.log('update user info');
    });
};

export default Scout;