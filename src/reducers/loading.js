import { createSlice } from '@reduxjs/toolkit';
import { fetchAllBookings } from './bookings';
import { fetchAllRooms } from './rooms';

const loading = localStorage.getItem('loading');

const loadingSlice = createSlice({
  name: 'loading',
  initialState: loading ? JSON.parse(loading) : true,
  reducers: {
    toggleLoading(state, action) {
      return !state;
    },
    onLoading(state, action) {
      return true;
    },
    offLoading(state, action) {
      return false;
    },
  },
});

export const { toggleLoading, onLoading, offLoading } = loadingSlice.actions;

export default loadingSlice.reducer;

export function refresh() {
  return (dispatch, getState, getFirebase) => {
    dispatch(onLoading());

    dispatch(fetchAllRooms());
    dispatch(fetchAllBookings());

    dispatch(offLoading());
  };
}
