import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  updateFlag: 0,
};

export const currencyUpdateFlag = createSlice({
  name: 'updateFlag',
  initialState,
  reducers: {
    setUpdateFlag: (state) => {
      state.updateFlag++;
    },
  },
});

export const { setUpdateFlag } = currencyUpdateFlag.actions;
export default currencyUpdateFlag.reducer;