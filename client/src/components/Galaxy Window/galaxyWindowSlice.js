import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  galaxyID: 0,
};

export const currentGalaxyID = createSlice({
  name: 'galaxyID',
  initialState,
  reducers: {
    setGalaxyID: (state, action) => {
      state.galaxyID = action.payload.currentgalaxy;
    },
  },
});

export const { setGalaxyID } = currentGalaxyID.actions;
export default currentGalaxyID.reducer;