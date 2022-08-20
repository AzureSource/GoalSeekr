import { configureStore } from '@reduxjs/toolkit';
import galaxyOptionsReducer from '../components/CreateGalaxy/galaxyOptionsSlice';
import denseGalaxyPlanetSelectionReducer from '../components/Galaxy Window/denseGalaxySlice';
import userShipsReducer  from '../components/buildShips/UserShipSlice';
import currentGalaxyIDReducer from '../components/Galaxy Window/galaxyWindowSlice';
import missionQueueReducer from '../components/Galaxy Window/actionsToolbar/missionModule/missionModuleSlice';
import toggleEndTurnReducer from '../components/Galaxy Window/menuSideSlice';
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