import React, { useState, useEffect } from 'react';
import ShipListEntry from './ShipListEntry.jsx';
import {
  Divider, Select, List, ListItem, ListIcon
} from '@chakra-ui/react';

export default function MissionModule() {

  const [shipSelection, setShipSelection] = useState({});
  const [missionQueue, setMissionQueue] = useState([]);

  // set up state hook, to keep track of mission set up.
  // need onClick listener for planet selection and ship selection.
  // onSubmit to add the mission to the queue list.

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

  const handleShipSelection = (shipData) => {
    setShipSelection(shipData);
    console.log('ship', shipSelection);
  };

  const addToQueue = () => {
    let shipData = `Count : ${shipSelection.count} | Ship : ${shipSelection.name} | Level : ${shipSelection.powerLevel}`;
    setMissionQueue((prevMissionQueue) => ([...prevMissionQueue, { start: planetSelected, type: 'Attack', ship: shipData, target: targetPlanetSelected }]));
    console.log('queued', missionQueue);
  };

  return (
    <div className='mm_body'>
      <div>
        {/* On First click of galaxy map, home planet is selected  */}
        {planetSelected}
      </div>
      <div>
        <Select variant='filled' placeholder='Mission Type' size='md'>
          <option value='attack'>Attack</option>
          <option value='colonize'>Colonize</option>
        </Select>
      </div>
      <div>
        {/* On second click of galaxy map, target planet is selected  */}
        {targetPlanetSelected}
      </div>
      <Divider orientation='horizontal' />
      {shipList.length === 0 ? (
        <div>There are no fleets at this planet.</div>
      ) : (
        <ShipListEntry shipList={shipList} handleShipSelection={handleShipSelection} />
      )}
      <button onClick={addToQueue}>Queue Mission</button>
      {/* On endTurn reset the queue  */}
      <List spacing={3}>
        <ListItem>
          {missionQueue.map((mission, index) => {
            return (
              <div key={index}>
                Home Planet : {mission.start} | Type : {mission.type} | Ships : {mission.ship} | Target Planet : {mission.target}
              </div>
            );
          })}
        </ListItem>
      </List>
    </div>
  );
}
