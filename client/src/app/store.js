import { configureStore } from '@reduxjs/toolkit';
import galaxyOptionsReducer from '../components/CreateGalaxy/galaxyOptionsSlice';
import denseGalaxyPlanetSelectionReducer from '../components/Galaxy Window/denseGalaxySlice';
import counterReducer from '../components/Galaxy Window/actionsToolbar/missionModule/counterSlice';
import userShipsReducer  from '../components/buildShips/UserShipSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    galaxyOptions: galaxyOptionsReducer,
    denseGalaxyPlanetSelection: denseGalaxyPlanetSelectionReducer,
    galaxyOptions: galaxyOptionsReducer,
    userShips: userShipsReducer
  }
});