import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShipListEntry from './ShipListEntry.jsx';
import { setPlanetSelection } from '../../denseGalaxySlice';
import { useSelector, useDispatch } from 'react-redux';
import MissionSequence from '../missionSequence/missionSequence.jsx';
import { setMissionQueue } from './missionModuleSlice';
import { Divider, Select, List, ListItem, Flex } from '@chakra-ui/react';
import { TriangleDownIcon } from '@chakra-ui/icons';

export default function MissionModule() {
  const planets = useSelector((state) => state.denseGalaxyPlanetSelection.planetSelection);
  const galaxyID = useSelector((state) => state.currentGalaxyID.galaxyID);
  const missionQueue = useSelector((state) => state.missionQueue.missions);
  const endTurnActivation = useSelector((state) => state.toggleEndTurn.endTurn);
  const [shipSelection, setShipSelection] = useState({});
  const [missionType, setMissionType] = useState('');
  const [ships, setShips] = useState([]);
  const dispatch = useDispatch();

  // const checkForShips = () => {
  //   const planetId = planets.planetIdSelected;
  //   console.log('galaxyId', galaxyID);
  //   console.log('planetId', planetId);
  //   axios.get(`/api/ships/${galaxyID}/${planetId}`)
  //     .then((res) => {
  //       // console.log('res is ', res.data[0].getusershipsonplanetbynames.players);
  //       console.log('res is ', res.data);
  //       setShips(
  //         // res.data[0].getusershipsonplanetbynames.players
  //       );
  //     })
  //     .catch((err) => {
  //       console.log('There was an error grabbing the ship data.', err);
  //     });
  // };
  const checkForShips = () => {
    setShips(
      [{ name: 'scout', count: 1, power: 1000 }]
    );
  };

  useEffect(() => {
    if (planets.homePlanet) {
      checkForShips();
    }
  }, [planets.homePlanet]);

  const handleShipSelection = (shipData) => {
    setShipSelection(shipData);
  };

  const addToQueue = () => {
    let shipData = `Count : ${shipSelection.count} | Ship : ${shipSelection.name} | Level : ${shipSelection.power}`;
    dispatch(setMissionQueue({
      add: { start: planets.homePlanet, type: missionType, ship: shipSelection, target: planets.targetPlanet, planetId: planets.planetIdSelected, targetId: planets.targetPlanetId}
    }));
  };

  const editMission = (missionIndex) => {
    dispatch(setMissionQueue({ remove: missionIndex }));
  };

  return (
    <Flex
      className='mission-module-container'
    >
      <div>
        Home Planet
        <br />
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
        <br />
        {planets.targetPlanet}
        <button onClick={() => dispatch(setPlanetSelection('reset'))}>Reset Planets</button>
      </div>
      <Divider orientation='horizontal' />
      {ships === undefined ? (
        <div>There are no fleets at this planet.</div>
      ) : (
        <ShipListEntry shipList={ships} handleShipSelection={handleShipSelection} />
      )}
      <button onClick={addToQueue}>Queue Mission</button>
      <List spacing={3}>
        <ListItem>
          {missionQueue.map((mission, index) => {
            return (
              <div key={index}>
                Home Planet : {mission.start} | Type : {mission.type} | Ships : {/*{mission.ship}*/} | Target Planet : {mission.target}
                <div>
                  <button onClick={() => editMission(index)}>Remove</button>
                </div>
              </div>
            );
          })}
        </ListItem>
      </List>
      {endTurnActivation && (
        <MissionSequence />
      )}
    </Flex >
  );
}

// render a line between the planets
// figure out turn count on mission module


// need a query for what planets the user owns, if the user owns the planet then they can queue a mission, if not those arent their ships.

