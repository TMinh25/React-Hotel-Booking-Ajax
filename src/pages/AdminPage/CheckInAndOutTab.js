import React, { useEffect, useState } from 'react';
import { getCheckInAndOutBooking } from '../../firebase';
import './index.scss';
import BookingDataTable from './Components/BookingDataTable';
import { Button } from '@material-ui/core';
import { defaultFailCB, isToday } from '../../utils';
import { useSelector } from 'react-redux';

function CheckInAndOutTab(props) {
  const [reserveData, setReserveData] = useState({});
  const bookings = useSelector(state => state.bookings);

  async function getBookings() {}

  useEffect(() => {
    try {
      if (bookings) {
        const todayBooking = {};
        for (const [key, value] of Object.entries(bookings)) {
          if (
            isToday(new Date(value.reserveDateStart)) ||
            isToday(new Date(value.reserveDateEnd))
          ) {
            todayBooking[key] = value;
          }
        }
        setReserveData(todayBooking);
        console.log('todayBooking', todayBooking);
      }
    } catch (error) {
      defaultFailCB(error);
    }
  }, [bookings]);

  return (
    <>
      <BookingDataTable data={reserveData} title="Check In và Check Out" />
    </>
  );
}

export default CheckInAndOutTab;
