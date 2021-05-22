import { combineReducers } from '@reduxjs/toolkit';
import statistic from './statistic';
import loading from './loading';
import rooms from './rooms';
import bookings from './bookings';
import { firebaseReducer } from 'react-redux-firebase';

export default combineReducers({
  statistic,
  loading,
  rooms,
  bookings,
  firebase: firebaseReducer,
});
