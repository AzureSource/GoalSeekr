import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  planetSelection: {
    homePlanet: '',
    targetPlanet: ''
  }
};

export const sGalaxyPlanetSelection = createSlice({
  name: 'planetSelection',
  initialState,
  reducers: {
    setPlanetSelection: (state, action) => {

    },
  },
});

export const { setPlanetSelection } = sGalaxyPlanetSelection.actions;
export default sGalaxyPlanetSelection.reducer;