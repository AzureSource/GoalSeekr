import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
// import Scout from './missionType/Scout.jsx';
// import Colony from './missionType/Colony.jsx';
// import MissionNotification from './MissionNotification.jsx';
// import Colony from './missionType/Colony.jsx';
// import BuildShip from '../../../buildShips/BuildShip.jsx';
import MissionResult from './MissionResult.jsx';
import { toggleMissionFinished, updateMissionResults } from '../missionModule/missionModuleSlice';

export default function MissionSequence() {
  const { id } = useParams();
  let missionData = useSelector((state) => state.missionQueue.missions);
  console.log('missionData', missionData);
  const showMissionResult = useSelector((state) => state.missionQueue.missionFinished);
  // const [modalOpen, setModalOpen] = useState(false);
  // const [results, setResults] = useState('');
  const missionResults = [];
  // const [showMissionResults, setShowMissionResults] = useState(true);
  const dispatch = useDispatch();

  const scout = async (targetPlanetId, targetPlanetName) => {
    let config = {
      data: {
        'type': 'scout',
        'targetPlanet': targetPlanetId
      }
    };
    await axios.post(`api/users/${id}/mission`, config);
    console.log('update user info');
    let missionRes = {};
    missionRes.type = 'Scout';
    missionRes.targetPlanetName = targetPlanetName;
    missionRes.result = 'Scouted';
    missionResults.push(missionRes);
    // setResults('update user info');
    // setModalOpen(true);
  };

  const executeMission = async () => {
    console.log('start execute mission......');
    for (let i = 0; i < missionData.length; i++) {
      switch (missionData[i].type) {
      case 'scout':
        await scout(missionData[i].targetId, missionData[i].target);
        break;
      default:
      }
    }
    console.log('mission finished, following are the results');
    // for (let i = 0; i < missionResults.length; i++) {
    //   console.log(JSON.stringify(missionResults[i]));
    // }
    console.log('-----------------');
    dispatch(
      updateMissionResults(missionResults)
    );
    dispatch(
      toggleMissionFinished('true')
    );
  };

  // const executeMission1 = () => {
  //   console.log('start execute mission');
  // };

  return (
    <div>
      {executeMission}
      {/* <button onClick={executeMission}>Execute Mission</button> */}
      {/* {modalOpen && <MissionNotification results={results}/>} */}
      {showMissionResult && <MissionResult />}
    </div>
  );
}



// Austin - Scout Notificaiton Modal popup
// Peter - Attack/Colonization Modal popup

// -------------------------

//scout
// useEffect on galaxy window, renders on change of discoverdby field
// Isabelle is working on this


// colonize
// useEffect on galaxy window, renders on change of colonizedBy
// adding ship id to params to move ship to the colonized planet.



// attacking
// - could change colonizedBy, but also deletes user ships.
// remove ships based on ship id.
// send put request to the server to determine which ships were destroyed.
// Notificaiton of which ships were destroyed and if planet was taken.


// colonize / attack
// check if planet is not colonizedBy
  // check if attacker sent a mothership
    // if so update colonizedBy and change attacker ships to new planet Id
  // otherwise, notify attacker needs mothership
// if it is colonizedBy another user
  // check for ships on planet
    // attack sequence would be check number of attack ships and number of defending ships and subtract out a winner (mothership should take 3 attacker ships to defeat)
    // if attacker wins, check that they have a mothership to colonize
    // else send ships back with attack report
  // if no ships on planet, check if attacker sent a colonize ship
    // change planet id and keep attacker ships on planet.

    // reset endTurnActivation to false.