import React, { useState, useEffect } from 'react';
import ShipListEntry from './ShipListEntry.jsx';
import { Divider, Select, List, ListItem } from '@chakra-ui/react';
import { TriangleDownIcon } from '@chakra-ui/icons';

export default function MissionModule() {

  const [shipSelection, setShipSelection] = useState({});
  const [missionQueue, setMissionQueue] = useState([]);
  const [missionType, setMissionType] = useState('');

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
  };

  const addToQueue = () => {
    let shipData = `Count : ${shipSelection.count} | Ship : ${shipSelection.name} | Level : ${shipSelection.powerLevel}`;
    setMissionQueue((prevMissionQueue) => ([...prevMissionQueue, { start: planetSelected, type: missionType, ship: shipData, target: targetPlanetSelected }]));
    console.log('mission Queue', missionQueue);
  };

  const editMission = (missionIndex) => {
    console.log(missionIndex);
    setMissionQueue([
      ...missionQueue.slice(0, missionIndex),
      ...missionQueue.slice(missionIndex + 1)
    ]);
  };

  return (
    <div className='mm_body'>
      <div>
        {/* On First click of galaxy map, home planet is selected  */}
        {planetSelected}
      </div>
      <div>
        <Select
          variant='filled'
          value={missionType}
          placeholder='Mission Type'
          size='md'
          icon={<TriangleDownIcon />}
          onChange={(e) => setMissionType(e.target.value)}>
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
                <div>
                  <button onClick={() => editMission(index)}>Remove</button>
                </div>
              </div>
            );
          })}
        </ListItem>
      </List>
    </div>
  );
}
