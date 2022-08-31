import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  endTurn: false,
};

export const toggleEndTurn = createSlice({
  name: 'endTurn',
  initialState,
  reducers: {
    setEndTurnBoolean: (state, action) => {
      if (action.payload === 'true') {
        state.endTurn = true;
      }
      if (action.payload === 'reset') {
        state.endTurn = false;
      }
    },
  },
});

export const { setEndTurnBoolean } = toggleEndTurn.actions;
export default toggleEndTurn.reducer;