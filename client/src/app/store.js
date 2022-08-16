import { configureStore } from '@reduxjs/toolkit';
import galaxyOptionsReducer from '../components/CreateGalaxy/galaxyOptionsSlice';
import denseGalaxyPlanetSelectionReducer from '../components/Galaxy Window/denseGalaxySlice';
import counterReducer from '../components/Galaxy Window/actionsToolbar/missionModule/counterSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    galaxyOptions: galaxyOptionsReducer,
    denseGalaxyPlanetSelection: denseGalaxyPlanetSelectionReducer,
  }
});