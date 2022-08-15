import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../components/actionsToolbar/attackModal/counterSlice';
import galaxyOptionsReducer from '../components/CreateGalaxy/galaxyOptionsSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    galaxyOptions: galaxyOptionsReducer
  }
});