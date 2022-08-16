import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  planetSelection: {
    homePlanet: '',
    targetPlanet: ''
  },
  firstSelection: false,
};

export const denseGalaxyPlanetSelection = createSlice({
  name: 'planetSelection',
  initialState,
  reducers: {
    setPlanetSelection: (state, action) => {
      if (Object.keys(action.payload)[0] === 'homePlanet') {
        state.planetSelection.homePlanet = action.payload.homePlanet;
        state.firstSelection = true;
      }
      if (Object.keys(action.payload)[0] === 'targetPlanet') {
        state.planetSelection.targetPlanet = action.payload.targetPlanet;
      }
      if (action.payload === 'reset') {
        state.planetSelection.homePlanet = '';
        state.planetSelection.targetPlanet = '';
        state.firstSelection = false;
      }
    },
  },
});

export const { setPlanetSelection } = denseGalaxyPlanetSelection.actions;
export default denseGalaxyPlanetSelection.reducer;