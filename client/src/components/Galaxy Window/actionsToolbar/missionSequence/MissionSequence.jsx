import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
// import Scout from './missionType/Scout.jsx';
import Colony from './missionType/Colony.jsx';

export default function MissionSequence() {
  const { id } = useParams();
  // pull mission data from store
  let missionData = useSelector((state) => state.missionQueue.missions);
  console.log('missionData', missionData);

  const scout = (targetPlanetId) => {
    let config = {
      data: {
        'type': 'scout',
        'targetPlanet': targetPlanetId
      }
    };
    axios.post(`api/users/${id}/mission`, config)
      .then(() => {
        console.log('update user info');
      });
  };

  const executeMission = (targetPlanetName) => {
    // console.log('planets is ', planets);
    scout(17);
  };

  return (
    <div>
      <button onClick={() => executeMission(missionData.target)}>Execute Mission</button>
    </div>
  );
}



// Sending a mission
// end turn is clicked
  // remove existing ships from home planet (may be attacked while away)
  // Missions are saved on local redux store with userID.
  // Mission has a turn count that is decremented until ships reach target planet. (Ignore this part)
  // every turn decrements the count. (Ignore)
// once the count reaches 0, grab current information of target planet, for battle.


//battle upon clicking end turn
  // based on type of mission
   // remove existing ships from home planet (may be attacked while away)
  //if scout mission provide run down of planet information
  //if attack, decide based on number of attack ships.
  //if colonize, check if attack ships are there, or if there are defenders
    // Maybe say 2 attack ships needed to take out mothership.
// once battle is complete send new data on planet ownership to database.
// reset endTurnActivation to false.
// send notification of results to both users.



// calculate Distance
// Ignore the distance, and every ship can reach another planet in one turn.
