import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  missionQueue: [],
};

export const missionQueue = createSlice({
  name: 'missionQueue',
  initialState,
  reducers: {
    setMissionQueue: (state, action) => {
    },
  },
});

export const { setMissionQueue } = missionQueue.actions;
export default missionQueue.reducer;