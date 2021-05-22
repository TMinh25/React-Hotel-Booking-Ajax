import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import Router from './components/Router';
import './base-styles/index.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from './store';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { offLoading } from './reducers/loading';
import { fetchAllRooms } from './reducers/rooms';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import firebase from './firebase';
import { fetchAllBookings } from './reducers/bookings';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { fetchIncome } from './reducers/statistic';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllRooms());
    dispatch(fetchAllBookings());
    dispatch(fetchIncome());

    dispatch(offLoading());
  }, []);

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        pauseOnHover
        newestOnTop={false}
        closeOnClick
        draggable
      />
      <Router />
    </>
  );
};

const rrfProps = {
  firebase,
  config: {},
  dispatch: store.dispatch,
};

Sentry.init({
  dsn: 'https://7dcec06e0dbb4e32ad7ab74a4d614723@sentry.io/1770835',
});

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <App />
      </MuiPickersUtilsProvider>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root'),
);
