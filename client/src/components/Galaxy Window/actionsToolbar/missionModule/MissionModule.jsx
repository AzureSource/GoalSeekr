import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShipListEntry from './ShipListEntry.jsx';
import { setPlanetSelection } from '../../denseGalaxySlice';
import { useSelector, useDispatch } from 'react-redux';
import MissionSequence from '../missionSequence/missionSequence.jsx';
import QueueMissionList from './QueueMissionList.jsx';
import { setMissionQueue } from './missionModuleSlice';
import { Button, Select, List, ListItem, Flex } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

export default function MissionModule() {
  const planets = useSelector(
    (state) => state.denseGalaxyPlanetSelection.planetSelection
  );
  const galaxyID = useSelector((state) => state.currentGalaxyID.galaxyID);
  const missionQueue = useSelector((state) => state.missionQueue.missions);
  const endTurnActivation = useSelector((state) => state.toggleEndTurn.endTurn);
  const userColonizedPlanets = useSelector(
    (state) => state.userShips.planets.colonizedPlanets
  );
  const [shipSelection, setShipSelection] = useState([]);
  const [missionType, setMissionType] = useState('');
  const [ships, setShips] = useState([]);
  const [queueModal, setQueueModal] = useState(false);
  const dispatch = useDispatch();

  const checkForShips = () => {
    const planetID = planets.planetIdSelected;
    axios
      .get(`/api/ships/${galaxyID}/${planetID}`)
      .then((res) => {
        if (res.data[0].getusershipsonplanet.players !== null) {
          setShips(res.data[0].getusershipsonplanet.players[0].Ships);
        } else {
          setShips([]);
        }
      })
      .catch((err) => {
        console.log('There was an error grabbing the ship data.', err);
      });
  };

  useEffect(() => {
    if (planets.homePlanet) {
      checkForShips();
    }
  }, [planets.homePlanet]);

  const handleShipSelection = (shipData) => {
    let shipDataIndex = shipSelection.map(ship => ship.name).indexOf(shipData.name);
    if (shipDataIndex !== -1) {
      setShipSelection(shipSelection.filter(data => data.name !== shipData.name));
    } else {
      setShipSelection(shipSelection => [...shipSelection, shipData]);
    }
  };

  console.log('shipSelection', shipSelection);

  const addToQueue = () => {
    if (userColonizedPlanets.includes(planets.planetIdSelected)) {
      dispatch(
        setMissionQueue({
          add: {
            start: planets.homePlanet,
            type: missionType,
            ship: shipSelection,
            target: planets.targetPlanet,
            planetId: planets.planetIdSelected,
            targetId: planets.targetPlanetId,
          },
        })
      );
    } else {
      alert(`These aren't your ships, the ${planets.homePlanet} ruler is displeased.`);
    }
  };

  const QueueModalToggle = () => {
    setQueueModal(!queueModal);
  };

  const editMission = (missionIndex) => {
    dispatch(setMissionQueue({ remove: missionIndex }));
  };

  console.log('missionQueue', missionQueue);
  return (
    <Flex className="mission-module-container">
      <div className="top-module-container">
        <Flex className="mission-selector-container">
          <Flex className="planet-selection-container" flexDir="column">
            <Flex className="planet-selected-home">
              {planets.homePlanet
                ? planets.homePlanet.toString()
                : 'Home Planet'}
            </Flex>
            <Flex className="planet-selected-target">
              {planets.targetPlanet ? planets.targetPlanet : 'Target Planet'}
            </Flex>
          </Flex>
          <Flex className="planet-mission-container" flexDir="column">
            <Button
              id="reset-btn"
              onClick={() => dispatch(setPlanetSelection('reset'))}
            >
              Reset Planets
            </Button>
            <div id="select-type-container">
              <Select
                id="select-mission-type"
                variant="filled"
                value={missionType}
                placeholder="Mission Type"
                size="sm"
                icon={<ChevronDownIcon />}
                onChange={(e) => setMissionType(e.target.value)}
              >
                <option value="scout">Scout</option>
                <option value="attack">Attack</option>
                <option value="colonize">Colonize</option>
                <option value="transport">Transport</option>
              </Select>
            </div>
          </Flex>
        </Flex>
        {/* {ships === undefined ? ('There are no fleets at this planet.') : ( */}
        <ShipListEntry
          shipList={ships}
          handleShipSelection={handleShipSelection}
        />
        {/* )} */}
      </div>
      <Button className="queue-mission-btn" onClick={addToQueue}>
        Add To Queue
      </Button>
      <Button className="queue-mission-btn" onClick={QueueModalToggle}>
        Check Queued Missions
      </Button>
      {/* Pass the missionQueue and editMission function  */}
      {queueModal && (
        <QueueMissionList missionQueue={missionQueue} editMission={editMission}/>
      )}
      {endTurnActivation && (
        <div>
          <MissionSequence />
        </div>
      )}
    </Flex>
  );
}

// render a line between the planets
// figure out turn count on mission module


// set mission selection so user can select more than one

// Remove Mission Type ?

// Change ship selection table to have hover over of each row.

// clean up mission summary