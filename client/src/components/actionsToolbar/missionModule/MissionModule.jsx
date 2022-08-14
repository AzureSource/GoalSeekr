import React, { useState, useEffect } from 'react';
import ShipListEntry from './ShipListEntry.jsx';
import {
  Divider, Select
} from '@chakra-ui/react';

export default function MissionModule() {

  let planetSelected = 'Earth';
  let targetPlanetSelected = 'Mars';
  // let shipList = [];
  let shipList = [
    { count: 5, name: 'ship1', type: 'attack', powerLevel: 1, }, { count: 4, name: 'ship2', type: 'attack', powerLevel: 1, }, { count: 2, name: 'ship3', type: 'colony', powerLevel: 1, }
  ];

  //planetSelected needs to be a state.
  // useEffect(() => {
  //   if (planetSelected) {
  //     checkForShips();
  //   }
  // }, [planetSelected]);

  return (
    <div className='mm_body'>
      <div >
        {planetSelected}
      </div>
      <div>
        <Select variant='filled' placeholder='Mission Type' size='md'>
          <option value='attack'>Attack</option>
          <option value='colonize'>Colonize</option>
        </Select>
      </div>
      <div>
        {targetPlanetSelected}
      </div>
      <Divider orientation='horizontal' />
      {shipList.length === 0 ? (
        <div>There are no fleets at this planet.</div>
      ) : (
        <ShipListEntry shipList={shipList} />
      )}
    </div>
  );
}
