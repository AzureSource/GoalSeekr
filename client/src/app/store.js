import { configureStore } from '@reduxjs/toolkit';
import galaxyOptionsReducer from '../components/CreateGalaxy/galaxyOptionsSlice';
import denseGalaxyPlanetSelectionReducer from '../components/Galaxy Window/denseGalaxySlice';
import userShipsReducer  from '../components/buildShips/UserShipSlice';
import currentGalaxyNameReducer from '../components/CreateGalaxy/CreateGalaxySlice';
import missionQueueReducer from '../components/Galaxy Window/actionsToolbar/missionModule/missionModuleSlice';

export default configureStore({
  reducer: {
    galaxyOptions: galaxyOptionsReducer,
    denseGalaxyPlanetSelection: denseGalaxyPlanetSelectionReducer,
    galaxyOptions: galaxyOptionsReducer,
    userShips: userShipsReducer,
    currentGalaxyName: currentGalaxyNameReducer,
    missionQueue: missionQueueReducer,
  }
});