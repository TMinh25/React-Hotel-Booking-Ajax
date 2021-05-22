import React, { useEffect, useState } from 'react';
import './index.scss';
import BookingDataTable from './Components/BookingDataTable';
import { defaultFailCB, isToday } from '../../utils';
import { useSelector } from 'react-redux';

function CheckInAndOutTab(props) {
  const [reserveData, setReserveData] = useState({});
  const bookings = useSelector(state => state.bookings);

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
