import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShipListEntry from './ShipListEntry.jsx';
import { setPlanetSelection } from '../../denseGalaxySlice';
import { useSelector, useDispatch } from 'react-redux';
import MissionSequence from '../missionSequence/missionSequence.jsx';
import { useParams } from 'react-router-dom';
import { setMissionQueue } from './missionModuleSlice';
import { Divider, Select, List, ListItem } from '@chakra-ui/react';
import { TriangleDownIcon } from '@chakra-ui/icons';
import Scout from '../missionSequence/missionType/Scout.jsx';

export default function MissionModule() {
  const {id} = useParams();
  const planets = useSelector((state) => state.denseGalaxyPlanetSelection.planetSelection);
  const galaxyName = useSelector((state) => state.currentGalaxyName.galaxyName);
  const missionQueue = useSelector((state) => state.missionQueue.missions);
  const endTurnActivation = useSelector((state) => state.toggleEndTurn.endTurn);
  const [shipSelection, setShipSelection] = useState({});
  const [missionType, setMissionType] = useState('');
  const [ships, setShips] = useState([]);
  const dispatch = useDispatch();

  // Galaxy name disapears on refresh of page.
  // const checkForShips = () => {
  //   const planetName = planets.homePlanet;
  //   const galaxy = galaxyName;
  //   axios.get(`/api/ships/${galaxy}/${planetName}`);
  //   axios.get(`/api/ships/Galaxy1/Mars`)
  //     .then((res) => {
  //       console.log('res is ', res.data[0].getusershipsonplanetbynames.players);
  //       console.log('res is ', res.data[0]);
  //       setShips(
  //         res.data[0].getusershipsonplanetbynames.players
  //       );
  //     })
  //     .catch((err) => {
  //       console.log('There was an error grabbing the ship data.', err);
  //     });
  // };
  const checkForShips = () => {
    setShips(
      [{name: 'scout', count: 1, power: 1000}]
    );
  };

  const scout = (targetPlanet) => {
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

  useEffect(() => {
    if (planets.homePlanet) {
      checkForShips();
    }
  }, [planets.homePlanet]);

  const handleShipSelection = (shipData) => {
    shipData = {name: 'scout', count: 1, power: 1000};
    setShipSelection(shipData);
  };

  const addToQueue = () => {
    let shipData = `Count : ${shipSelection.count} | Ship : ${shipSelection.name} | Level : ${shipSelection.powerLevel}`;
    dispatch(setMissionQueue({
      add: {start: planets.homePlanet, type: missionType, ship: shipData, target: planets.targetPlanet}
    }));
  };

  const editMission = (missionIndex) => {
    dispatch(setMissionQueue({remove: missionIndex}));
  };

  const executeMission = (targetPlanetName) => {
    // console.log('planets is ', planets);
    scout(17);
  };

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
      {ships === null ? (
        <div>There are no fleets at this planet.</div>
      ) : (
        <ShipListEntry shipList={ships} handleShipSelection={handleShipSelection} />
      )}
      <button onClick={addToQueue}>Queue Mission</button>
      <List spacing={3}>
        <ListItem>
          {missionQueue.map((mission, index) => {
            {/* mission.ship = {'Scout': 1}; */}
            console.log('mission is ', mission);
            return (
              <div key={index}>
                Home Planet : {mission.start} | Type : {mission.type} | Ships : {mission.ship} | Target Planet : {mission.target}
                <div>
                  <button onClick={() => editMission(index)}>Remove</button>
                </div>
                <div>
                  <button onClick={() => executeMission(mission.target)}>Execute Mission</button>
                </div>
              </div>
            );
          })}
        </ListItem>
      </List>
      {endTurnActivation && (
        <MissionSequence />
      )}
    </div>
  );
}

// render a line between the planets
// figure out turn count on mission module


// need a query for what planets the user owns, if the user owns the planet then they can queue a mission, if not those arent their ships.

