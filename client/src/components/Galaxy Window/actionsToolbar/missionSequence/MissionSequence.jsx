import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

export default function MissionSequence() {
  // pull mission data from store
  let missionData = useSelector((state) => state.missionQueue.missions);
  // console.log('missionData', missionData);

  return (
    <div></div>
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
