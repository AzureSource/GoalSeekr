import React, { useState, useEffect } from 'react';
import ShipListEntry from './ShipListEntry.jsx';
import { setPlanetSelection } from '../../denseGalaxySlice';
import { useSelector, useDispatch } from 'react-redux';
import { Divider, Select, List, ListItem } from '@chakra-ui/react';
import { TriangleDownIcon } from '@chakra-ui/icons';

export default function MissionModule() {
  const planets = useSelector((state) => state.denseGalaxyPlanetSelection.planetSelection);
  const [shipSelection, setShipSelection] = useState({});
  const [missionQueue, setMissionQueue] = useState([]);
  const [missionType, setMissionType] = useState('');
  const dispatch = useDispatch();

  // Dummy Data
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
    setMissionQueue((prevMissionQueue) => ([...prevMissionQueue, { start: planets.homePlanet, type: missionType, ship: shipData, target: planets.targetPlanet }]));
  };

  const editMission = (missionIndex) => {
    setMissionQueue([
      ...missionQueue.slice(0, missionIndex),
      ...missionQueue.slice(missionIndex + 1)
    ]);
  };

  console.log('planets', planets);

  return (
    <div font='white'>
      <div>
        Home Planet
        {planets.homePlanet}
      </div>
      <div>
        <Select
          variant='filled'
          value={missionType}
          placeholder='Mission Type'
          size='md'
          icon={<TriangleDownIcon />}
          onChange={(e) => setMissionType(e.target.value)}>
          <option value='scout'>Scout</option>
          <option value='attack'>Attack</option>
          <option value='colonize'>Colonize</option>
        </Select>
      </div>
      <div>
        Target Planet
        {planets.targetPlanet}
        <button onClick={() => dispatch(setPlanetSelection('reset'))}>Reset Planets</button>
      </div>
      <Divider orientation='horizontal' />
      {shipList.length === 0 ? (
        <div>There are no fleets at this planet.</div>
      ) : (
        <ShipListEntry shipList={shipList} handleShipSelection={handleShipSelection} />
      )}
      <button onClick={addToQueue}>Queue Mission</button>
      {/* On endTurn reset the queue & queue is sent to local store for holding. */}
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


// Sending a mission
// remove existing ships from home planet (may be attacked while away)
// Mission has a turn count that is decremented until ships reach target planet.
// grab information of target planet ships for battle.
// once battle is complete send new data on planet ownership to database.