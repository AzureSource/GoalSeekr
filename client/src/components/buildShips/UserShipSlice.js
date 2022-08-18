import { createSlice } from '@reduxjs/toolkit';

export const userShipsSlice = createSlice({
  name: 'userShips',
  initialState: {
    ships: {},
    planets: {}
  },
  reducers: {
    getUserShipsFromDB: (state, action) => {
      state.ships = action.payload;
    },
    getUserPlanetsFromDB: (state, action) => {
      state.planets = action.payload;
    }
  }
});

export const {getUserShipsFromDB, getUserPlanetsFromDB} = userShipsSlice.actions;

export default userShipsSlice.reducer;
