import { configureStore } from '@reduxjs/toolkit';
import galaxyOptionsReducer from '../components/CreateGalaxy/galaxyOptionsSlice';
import counterReducer from '../components/Galaxy Window/actionsToolbar/missionModule/counterSlice';
import userShipsReducer  from '../components/buildShips/UserShipSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    galaxyOptions: galaxyOptionsReducer,
    userShips: userShipsReducer
  }
});