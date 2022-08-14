import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../components/actionsToolbar/missionModule/counterSlice';

export default configureStore({
  reducer: {
    counter: counterReducer
  }
});