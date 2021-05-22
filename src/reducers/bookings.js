import { createSlice } from '@reduxjs/toolkit';
import { defaultFailCB, defaultSuccessCB } from '../utils';
import { offLoading, onLoading } from './loading';

const bookings = localStorage.getItem('bookings');

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState: bookings ? JSON.parse(bookings) : null,
  reducers: {
    setAllBookings(state, action) {
      return { ...state, ...action.payload };
    },
    setCurrentBookingData(state, action) {
      return { ...state, currentBookingData: action.payload };
    },
    clearCurrentBookingData(state, action) {
      return { ...state, currentBookingData: null };
    },
  },
});

export const {
  setAllBookings,
  setCurrentBookingData,
  clearCurrentBookingData,
} = bookingsSlice.actions;
export default bookingsSlice.reducer;

export function fetchAllBookings() {
  return (dispatch, getState, getFirebase) => {
    return getFirebase()
      .ref('bookings')
      .get()
      .then(snap => {
        dispatch(setAllBookings(snap.val()));
      })
      .catch(error => defaultFailCB(error.message));
  };
}

export function fetchSingleBookingData(bookingID) {
  return (dispatch, getState, getFirebase) => {
    return getFirebase()
      .ref('bookings')
      .child(bookingID)
      .once('value', snapshot => {
        dispatch(setCurrentBookingData(snapshot.val()));
      })
      .catch(e => defaultFailCB(e.message));
  };
}

export function addBooking(value) {
  return (dispatch, getState, getFirebase) => {
    dispatch(onLoading());
    return getFirebase()
      .ref('bookings')
      .push(value)
      .catch(e => defaultFailCB(e.message))
      .finally(() => {
        dispatch(fetchAllBookings());
        dispatch(offLoading());
      });
  };
}

export function removeBooking(bookingID) {
  return (dispatch, getState, getFirebase) => {
    dispatch(onLoading());
    return getFirebase()
      .ref('bookings')
      .child(bookingID)
      .remove()
      .then(() => defaultSuccessCB())
      .catch(e => defaultFailCB(e.message))
      .finally(() => {
        dispatch(fetchAllBookings());
        dispatch(offLoading());
      });
  };
}

export function updateBookingStatus({ id, status }) {
  return (dispatch, getState, getFirebase) => {
    dispatch(onLoading());
    return getFirebase()
      .ref('bookings')
      .child(`${id}/status`)
      .set(status)
      .catch(e => defaultFailCB(e.message))
      .finally(() => {
        dispatch(fetchAllBookings());
        dispatch(fetchSingleBookingData(id));
        dispatch(offLoading());
      });
  };
}
