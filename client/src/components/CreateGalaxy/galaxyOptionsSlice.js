import { createSlice } from '@reduxjs/toolkit';



export const galaxyOptionsSlice = createSlice({
  name: 'galaxyOptions',
  initialState: {
    galaxyOptionsState: {
      maxPlayersCount: 2,
      yearsPerTurn: 1,
      allianceToggle: false,
    }
  },
  reducers: {
    // increment(state) {
    //   state.maxPlayersCount++;
    // },
    allianceToggle(state) {
      state.galaxyOptionsState = {...state.galaxyOptionsState, allianceToggle: !state.galaxyOptionsState.allianceToggle};
    }
  }
});

export const { increment, allianceToggle } = galaxyOptionsSlice.actions;

export default galaxyOptionsSlice.reducer;

