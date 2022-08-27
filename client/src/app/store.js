import { configureStore } from '@reduxjs/toolkit';
import galaxyOptionsReducer from '../components/CreateGalaxy/galaxyOptionsSlice';
import denseGalaxyPlanetSelectionReducer from '../components/GalaxyWindow/denseGalaxySlice';
import userShipsReducer  from '../components/buildShips/UserShipSlice';
import currentGalaxyIDReducer from '../components/GalaxyWindow/galaxyWindowSlice';
import missionQueueReducer from '../components/GalaxyWindow/actionsToolbar/missionModule/missionModuleSlice';
import toggleEndTurnReducer from '../components/GalaxyWindow/menuSideSlice';
import currencyUpdateFlagReducer from '../components/TaskTracker/currencyUpdateFlag.js';

export default configureStore({
  reducer: {
    galaxyOptions: galaxyOptionsReducer,
    denseGalaxyPlanetSelection: denseGalaxyPlanetSelectionReducer,
    userShips: userShipsReducer,
    currentGalaxyID: currentGalaxyIDReducer,
    missionQueue: missionQueueReducer,
    toggleEndTurn: toggleEndTurnReducer,
    currencyUpdateFlag: currencyUpdateFlagReducer,
  }
});