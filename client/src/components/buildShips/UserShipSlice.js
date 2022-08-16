import { createSlice } from '@reduxjs/toolkit';

export const userShipsSlice = createSlice({
  name: 'userShips',
  initialState: {
    ships: {}
  },
  reducers: {
    getUserShipsFromDB: (state, action) => {
      state.ships = action.payload;
    },
  }
});

export const {getUserShipsFromDB} = userShipsSlice.actions;

export default userShipsSlice.reducer;
