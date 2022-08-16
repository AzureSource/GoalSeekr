import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  planetSelection: {
    homePlanet: '',
    targetPlanet: ''
  }
};

export const denseGalaxyPlanetSelection = createSlice({
  name: 'planetSelection',
  initialState,
  reducers: {
    setPlanetSelection: (state, action) => {
      if (Object.keys(action.payload)[0] === 'homePlanet') {
        state.planetSelection.homePlanet = action.payload.homePlanet;
      }
      if (Object.keys(action.payload)[0] === 'targetPlanet') {
        state.planetSelection.targetPlanet = action.payload.targetPlanet;
      }

    },
  },
});

export const { setPlanetSelection } = denseGalaxyPlanetSelection.actions;
export default denseGalaxyPlanetSelection.reducer;