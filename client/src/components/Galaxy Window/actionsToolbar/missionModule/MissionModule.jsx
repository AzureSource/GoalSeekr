import React, { useState, useEffect } from "react";
import axios from "axios";
import ShipListEntry from "./ShipListEntry.jsx";
import { setPlanetSelection } from "../../denseGalaxySlice";
import { useSelector, useDispatch } from "react-redux";
import MissionSequence from "../missionSequence/missionSequence.jsx";
import { setMissionQueue } from "./missionModuleSlice";
import { Button, Select, List, ListItem, Flex } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

export default function MissionModule() {
  const planets = useSelector(
    (state) => state.denseGalaxyPlanetSelection.planetSelection
  );
  const galaxyID = useSelector((state) => state.currentGalaxyID.galaxyID);
  const missionQueue = useSelector((state) => state.missionQueue.missions);
  const endTurnActivation = useSelector((state) => state.toggleEndTurn.endTurn);
  const [shipSelection, setShipSelection] = useState({});
  const [missionType, setMissionType] = useState('');
  const [ships, setShips] = useState([]);
  const dispatch = useDispatch();

  const checkForShips = () => {
    const planetID = planets.planetIdSelected;
    axios
      .get(`/api/ships/${galaxyID}/${planetID}`)
      .then((res) => {
        setShips(res.data[0].getusershipsonplanet.players[0].Ships);
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
    setShipSelection(shipData);
  };

  const addToQueue = () => {
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
  };

  const editMission = (missionIndex) => {
    dispatch(setMissionQueue({ remove: missionIndex }));
  };

  return (
    <Flex
      className='mission-module-container'
    >
      <div
        className='top-module-container'
      >
        <Flex className='mission-selector-container'>
          <Flex
            className='planet-selection-container'
            flexDir='column'
          >
            <Flex className='planet-selected-home'>
              {planets.homePlanet ? planets.homePlanet : 'Home Planet'}
            </Flex>
            <Flex className='planet-selected-target'>
              {planets.targetPlanet ? planets.targetPlanet : 'Target Planet'}
            </Flex>
          </Flex>
          <Flex
            className='planet-mission-container'
            flexDir='column'
          >
            <Button
              id='reset-btn'
              onClick={() => dispatch(setPlanetSelection('reset'))}
            >
              Reset Planets
            </Button>
            <div id='select-type-container'>
              <Select
                id='select-mission-type'
                variant='filled'
                value={missionType}
                placeholder='Mission Type'
                size='sm'
                icon={<ChevronDownIcon />}
                onChange={(e) => setMissionType(e.target.value)}
              >
                <option value='scout'>Scout</option>
                <option value='attack'>Attack</option>
                <option value='colonize'>Colonize</option>
              </Select>
            </div>
          </Flex>
        </Flex>
        {ships === undefined ?
          'There are no fleets at this planet.'
          : (
            <ShipListEntry shipList={ships} handleShipSelection={handleShipSelection} />
          )}
      </div>
      <Button onClick={addToQueue}>Queue Mission</Button>
      <List spacing={3} id={'planet-mission-list'}>
        <ListItem>
          {missionQueue.map((mission, index) => {
            let shipData = `Count : ${mission.ship.count} | Ship : ${mission.ship.name} | Power : ${mission.ship.power}`;
            return (
              <div key={index}>
                Home Planet : {mission.start} | Type : {mission.type} | Ships : {shipData} | Target Planet : {mission.target}
                <div>
                  <Button onClick={() => editMission(index)}>Remove</Button>
                </div>
              </div>
            );
          })}
        </ListItem>
      </List>
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

// need a query for what planets the user owns, if the user owns the planet then they can queue a mission, if not those arent their ships.
