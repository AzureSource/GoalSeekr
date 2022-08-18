import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  planetSelection: {
    homePlanet: '',
    targetPlanet: '',
    planetIdSelected: 0
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
        state.planetSelection.planetIdSelected = action.payload.planetIdSelected;
      }
      if (Object.keys(action.payload)[0] === 'targetPlanet') {
        state.planetSelection.targetPlanet = action.payload.targetPlanet;
      }
      if (action.payload === 'reset') {
        state.planetSelection.homePlanet = '';
        state.planetSelection.targetPlanet = '';
        state.planetSelection.planetIdSelected = 0;
        state.firstSelection = false;
      }
    },
  },
});

export const { setPlanetSelection } = denseGalaxyPlanetSelection.actions;
export default denseGalaxyPlanetSelection.reducer;