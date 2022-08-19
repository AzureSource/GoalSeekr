import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  missions: [],
  missionFinished: false,
  missionResults: []
};

export const missionQueue = createSlice({
  name: 'missionQueue',
  initialState,
  reducers: {
    setMissionQueue: (state, action) => {
      if (Object.keys(action.payload)[0] === 'add') {
        state.missions.push(action.payload.add);
      }
      if (Object.keys(action.payload)[0] === 'remove') {
        state.missions.splice(action.payload.remove, 1);
      }
    },
    toggleMissionFinished: (state, action) => {
      if (action.payload === 'true') {
        state.missionFinished = true;
      }
      if (action.payload === 'false') {
        state.missionFinished = false;
      }
    },
    updateMissionResults: (state, action) => {
      console.log('action.payload is ', action.payload);
      state.missionResults = action.payload;
    }
  },
});

export const { setMissionQueue, toggleMissionFinished, updateMissionResults } = missionQueue.actions;
export default missionQueue.reducer;