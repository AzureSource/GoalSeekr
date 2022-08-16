import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  planetSelection: {
    homePlanet: '',
    targetPlanet: ''
  }
};

export const sparseGalaxyPlanetSelection = createSlice({
  name: 'planetSelection',
  initialState,
  reducers: {
    setPlanetSelection: (state, action) => {

    },
  },
});

export const { setPlanetSelection } = sparseGalaxyPlanetSelection.actions;
export default sparseGalaxyPlanetSelection.reducer;