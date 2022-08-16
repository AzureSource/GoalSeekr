import { configureStore } from '@reduxjs/toolkit';
import galaxyOptionsReducer from '../components/CreateGalaxy/galaxyOptionsSlice';
import counterReducer from '../components/Galaxy Window/actionsToolbar/missionModule/counterSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    galaxyOptions: galaxyOptionsReducer
  }
});