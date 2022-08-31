import { createSlice } from '@reduxjs/toolkit';
import SelectGalaxySize from '../CreateGalaxy/SelectGalaxySize.jsx';

const initialState = {
  galaxyID: 0,
  hasStarted: false,
  activeUser: null
};

export const currentGalaxyID = createSlice({
  name: 'galaxyID',
  initialState,
  reducers: {
    setGalaxyID: (state, action) => {
      state.galaxyID = action.payload.currentgalaxy;
    },
    setGalaxyStarted: (state, action) => {
      console.log('STORE: game has begun', action.payload);
      state.hasStarted = action.payload.hasStarted;
    },
    setActiveUser: (state, action) => {
      console.log('STORE: active userID is', action.payload);
      state.activeUser = Number(action.payload.activeUserId);
    }
  },
});



export const { setGalaxyID, setGalaxyStarted, setActiveUser } = currentGalaxyID.actions;
export default currentGalaxyID.reducer;