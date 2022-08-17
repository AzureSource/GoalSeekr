import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  galaxyName: '',
};

export const currentGalaxyName = createSlice({
  name: 'galaxyName',
  initialState,
  reducers: {
    setGalaxyName: (state, action) => {
      state.galaxyName = action.payload;
    },
  },
});

export const { setGalaxyName } = currentGalaxyName.actions;
export default currentGalaxyName.reducer;