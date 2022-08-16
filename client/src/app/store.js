import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../components/Galaxy Window/actionsToolbar/missionModule/counterSlice';

export default configureStore({
  reducer: {
    counter: counterReducer
  }
});