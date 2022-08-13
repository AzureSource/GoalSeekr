import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../components/actionsToolbar/attackModal/counterSlice';

export default configureStore({
  reducer: {
    counter: counterReducer
  }
});