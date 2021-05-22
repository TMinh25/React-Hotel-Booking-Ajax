import { createSlice } from '@reduxjs/toolkit';
import { defaultFailCB, statusCode } from '../utils';

const months = [
  'Tháng 1',
  'Tháng 2',
  'Tháng 3',
  'Tháng 4',
  'Tháng 5',
  'Tháng 6',
  'Tháng 7',
  'Tháng 8',
  'Tháng 9',
  'Tháng 10',
  'Tháng 11',
  'Tháng 12',
];

const monthInitialData = { guest: 0, income: 0 };

const statistic = localStorage.getItem('statistic');

const statisticSlice = createSlice({
  name: 'statistic',
  initialState: statistic
    ? JSON.parse(statistic)
    : {
        totalIncome: 0,
        reservationData: {
          numberOfReserveCancel: null,
          numberOfReserveAccept: null,
        },
        chartData: months.map(month => ({
          label: month,
          data: monthInitialData,
        })),
      },
  reducers: {
    updateIncome(state, action) {
      return { ...state, totalIncome: action.payload };
    },
    setReservationData(state, action) {
      return { ...state, reservationData: action.payload };
    },
    setMonthData(state, action) {
      const { id, data } = action.payload;
      const { chartData } = state;
      // var tempVal = chartData;
      // replace value at id with data
      const currentData = chartData[id];
      currentData.data = data;
      chartData.splice(id, 1, currentData);

      // return { ...state, chartData: tempVal };
    },
  },
});

export const { updateIncome, setMonthData } = statisticSlice.actions;

export default statisticSlice.reducer;

export function fetchIncome() {
  return (dispatch, getState, getFirebase) => {
    return getFirebase()
      .ref('bookings')
      .once('value', snap => {
        var totalIncome = 0;
        var chartData = months.map(month => monthInitialData);
        const data = snap.val();
        Object.values(data).forEach(booking => {
          if (booking?.status === statusCode.paid) {
            totalIncome += booking?.totalPrice;
            const month = new Date(booking?.reserveDateEnd).getMonth();
            const currentMonthData = chartData[month];
            chartData[month] = {
              guest: currentMonthData.guest + Math.round(Math.random() * 5),
              income: currentMonthData.income + booking?.totalPrice,
            };
          }
        });
        chartData.forEach((item, index) => {
          dispatch(setMonthData({ id: index, data: item }));
        });
        dispatch(updateIncome(totalIncome));
      })
      .catch(e => defaultFailCB(e.message));
  };
}
