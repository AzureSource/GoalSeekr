import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  missions: [],
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
  },
});

export const { setMissionQueue } = missionQueue.actions;
export default missionQueue.reducer;