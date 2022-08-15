import { createSlice } from '@reduxjs/toolkit';

export const galaxyOptionsSlice = createSlice({
  name: 'galaxyOptions',
  initialState: {
    maxPlayersCount: 2,
    yearsPerTurn: 1,
    allianceToggle: false,
  },
  reducers: {
    increment(state) {
      state.value ++;
    },
    allianceToggle(state) {
    }
  }
});

export const { increment, allianceToggle } = galaxyOptionsSlice.actions;

export default galaxyOptionsSlice.reducer;

