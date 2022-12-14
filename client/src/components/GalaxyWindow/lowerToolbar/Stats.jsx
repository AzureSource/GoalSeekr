import React, { useState, useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Stats = () => {

  const [playerInfo, setPlayerInfo] = useState({});
  const {id} = useParams();
  const taskUpdatedFlag = useSelector((state) => state.currencyUpdateFlag.updateFlag);

  //fetch the data for the current User and galaxy
  useEffect(() => {
    axios.get(`/api/galaxy/${id}`)
      .then(({data}) => {
        const g_id = data.rows[0].currentgalaxy;
        axios.get(`/api/players/${g_id}`)
          .then((results) =>  {
            // console.log('PLAYERLIST: ', results.data[0].userid);
            // console.log(id);
            setPlayerInfo(results.data.filter((row) => (row.userid == id))[0]);
          })
          .catch((err) => console.log('error getting players, PlayerList line 29:\n', err));
      })
      .catch((err) => console.log(err));
  }, [taskUpdatedFlag]);

  // console.log(playerInfo);

  return (
    <Flex
      className='stats-container'
    >
      <Flex
        flexDir='column'
        className='stats-content-container'
      >
        <Flex
          className='stat-username-money-container'
        >
          <div><b>{playerInfo.username}</b></div>
          <div><b>${playerInfo.currency}</b></div>
        </Flex>
        <div><b>Motto : </b>{playerInfo.motto}</div>
        <div><b>Ships Owned : </b>{playerInfo.ships && playerInfo.ships.length || 0}</div>
        <div><b>Planets Conquered : </b>{playerInfo.planetsOwned ? playerInfo.planets.length : 0}</div>
      </Flex>
    </Flex>
  );

};

export default Stats;
