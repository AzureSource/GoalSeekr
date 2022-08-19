import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import MissionResult from './MissionResult.jsx';
import { toggleMissionFinished, updateMissionResults } from '../missionModule/missionModuleSlice';

export default function MissionSequence() {
  const dispatch = useDispatch();
  const { id } = useParams();
  let missionData = useSelector((state) => state.missionQueue.missions);
  console.log('missionData', missionData);
  const showMissionResult = useSelector((state) => state.missionQueue.missionFinished);
  const missionResults = [];


  const scout = async (targetPlanetId, targetPlanetName) => {
    let config = {
      data: {
        'type': 'scout',
        'targetPlanet': targetPlanetId
      }
    };
    await axios.post(`api/users/${id}/mission`, config)
      .then((res) => {
        console.log('mission results', res);
      })
      .catch((err) => {
        console.log('error', err);
      });
    // console.log('update user info');
    let missionRes = {};
    missionRes.type = 'Scout';
    missionRes.targetPlanetName = targetPlanetName;
    missionRes.result = 'Scouted';
    missionRes.detail = '';
    missionResults.push(missionRes);
  };

  const allMissions = async (targetPlanetId, shipIds, targetPlanetName) => {
    let config = {
      data: {
        'type': 'mission',
        'targetPlanetId': targetPlanetId,
        'shipIds': shipIds
      }
    };
    await axios.post(`api/users/${id}/mission`, config)
      .then((res) => {
        for (const val of Object.values(res.data[0])) {
          for (const childVal of Object.values(val)) {
            let missionRes = {};
            missionRes.type = childVal.action;
            missionRes.targetPlanetName = targetPlanetName;
            missionRes.result = childVal.results;
            missionRes.detail = JSON.stringify(childVal);
            missionResults.push(missionRes);
          }
        }
      })
      .catch((err) => {
        console.log('error', err);
      });

  };

  const executeMission = async () => {
    // console.log('start execute mission......');
    for (let i = 0; i < missionData.length; i++) {
      switch (missionData[i].type) {
      case 'scout':
        await scout(missionData[i].targetId, missionData[i].target);
        break;
      case 'attack':
        await allMissions(missionData[i].targetId, missionData[i].ship.ids, missionData[i].target);
        break;
      case 'colonize':
        await allMissions(missionData[i].targetId, missionData[i].ship.ids, missionData[i].target);
        break;
      case 'transport':
        await allMissions(missionData[i].targetId, missionData[i].ship.ids, missionData[i].target);
        break;
      default:
      }
    }
    // console.log('mission finished, following are the results');
    // console.log('-----------------');
    dispatch(
      updateMissionResults(missionResults)
    );
    dispatch(
      toggleMissionFinished('true')
    );
  };

  useEffect(() => {
    executeMission();
  }, []);

  return (
    <div>
      {showMissionResult && <MissionResult />}
    </div>
  );
}


// -------------------------

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