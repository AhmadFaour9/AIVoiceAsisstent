import { createSlice } from '@reduxjs/toolkit';

const itemSlice = createSlice({
  name: 'item',
  initialState: {
    value: 0
  },
  reducers: {
    updateValue: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { updateValue } = itemSlice.actions;
export default itemSlice.reducer;