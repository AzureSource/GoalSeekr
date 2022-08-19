import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, GridItem } from '@chakra-ui/react';
import axios from 'axios';
import { GiRingedPlanet, GiJetpack, GiCash, GiTrophy, GiBlackFlag} from 'react-icons/gi';
import { useParams } from 'react-router-dom';

const Stats = () => {

  const [playerInfo, setPlayerInfo] = useState({});
  const {id} = useParams();
  //fetch the data for the current User and galaxy
  useEffect(() => {
    axios.get(`/api/galaxy/${id}`)
      .then(({data}) => {
        const g_id = data.rows[0].currentgalaxy;
        axios.get(`/api/players/${g_id}`)
          .then((results) =>  {
            console.log('PLAYERLIST: ', results.data[0].userid);
            console.log(id);
            setPlayerInfo(results.data.filter((row) => (row.userid == id))[0]);
          })
          .catch((err) => console.log('error getting players, PlayerList line 29:\n', err));
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(playerInfo);

  return (
    <div className='stats-container'>
      <span>{playerInfo.userid}</span>
      <span>{playerInfo.currency}</span>
      <span>{playerInfo.motto}</span>
      <span>{playerInfo.planets && playerInfo.planets.length}</span>
      <span>{playerInfo.ships && playerInfo.ships.length || 0}</span>

    </div>
  );


};

export default Stats;
