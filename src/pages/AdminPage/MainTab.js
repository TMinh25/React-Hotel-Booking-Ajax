import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TotalIncome from './Components/TotalIncome';
import RecentBookings from './Components/RecentBookings';
import useStyles from '../../hooks/useStyles';
import { isToday, statusCode } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { updateBookingStatus } from '../../reducers/bookings';

function MainTab() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [todayBooking, setTodayBooking] = useState({});
  const bookings = useSelector(state => state.bookings);

  async function getBookings() {
    if (bookings) {
      const result = {};
      Object.keys(bookings).forEach(bookingKey => {
        const { timestamp } = bookings[bookingKey];
        if (
          isToday(timestamp) &&
          bookings[bookingKey]?.status === statusCode.reserveConfirmation
        ) {
          result[bookingKey] = bookings[bookingKey];
        }
      });
      setTodayBooking(result);
    }
  }

  useEffect(() => {
    getBookings();

    if (bookings) {
      for (const [key, value] of Object.entries(bookings)) {
        const startDate = new Date(value.reserveDateStart);
        const status = value.status;

        if (isToday(startDate) && status === statusCode.reserveAccept) {
          dispatch(
            updateBookingStatus({
              id: key,
              status: statusCode.checkingIn,
            }),
          );
        } else if (
          isToday(startDate.setDate(startDate.getDate() + 1)) &&
          status === statusCode.reserveAccept
        ) {
          dispatch(
            updateBookingStatus({
              id: key,
              status: statusCode.notCheckIn,
            }),
          );
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookings]);

  const loading = useSelector(state => state.loading);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          {/* <Paper className={fixedHeightPaper}>
            <Chart />
          </Paper> */}
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={classes.paper}>
            <TotalIncome />
            {loading}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <RecentBookings {...{ bookings: todayBooking }} />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default MainTab;
