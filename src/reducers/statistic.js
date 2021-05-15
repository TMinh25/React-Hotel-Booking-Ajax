import { createSlice } from '@reduxjs/toolkit';

const statistic = localStorage.getItem('statistic');

const statisticSlice = createSlice({
  name: 'statistic',
  initialState: statistic
    ? JSON.parse(statistic)
    : {
        totalIncome: 0,
      },
  reducers: {
    updateIncome(state, action) {
      const { inCome } = action.payload;
      return { ...state, totalIncome: inCome };
    },
  },
});

export const { updateIncome } = statisticSlice.actions;

export default statisticSlice.reducer;
