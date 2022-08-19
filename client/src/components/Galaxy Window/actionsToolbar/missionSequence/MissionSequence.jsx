import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
// import Scout from './missionType/Scout.jsx';
import Colony from './missionType/Colony.jsx';

export default function MissionSequence() {
  const { id } = useParams();
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