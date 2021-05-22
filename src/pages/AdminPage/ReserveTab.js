import React, { useEffect, useState } from 'react';
import { getReservationBooking } from '../../firebase';
import './index.scss';
import BookingDataTable from './Components/BookingDataTable';
import { defaultFailCB, isBetween, statusCode } from '../../utils';
import { useSelector } from 'react-redux';
import { Checkbox, FormControlLabel } from '@material-ui/core';

const ReserveTab = props => {
  const [isBookingToday, setIsBookingToday] = useState(false);
  const [reserveData, setReserveData] = useState({});
  const bookings = useSelector(state => state.bookings);

  const toggleToday = () => setIsBookingToday(!isBookingToday);

  useEffect(() => {
    if (bookings) {
      const reservationBooking = {};
      for (const [key, value] of Object.entries(bookings)) {
        const { status } = value;
        if (
          status === statusCode.reserveConfirmation ||
          status === statusCode.reserveAccept ||
          status === statusCode.reserveCancel
        ) {
          reservationBooking[key] = value;
        }
      }
      setReserveData(reservationBooking);
    }
  }, [bookings]);

  useEffect(() => {
    if (reserveData && isBookingToday) {
      const todayBooking = {};
      for (const [key, value] of Object.entries(reserveData)) {
        const { reserveDateStart, reserveDateEnd } = value;
        if (isBetween(reserveDateStart, new Date(), reserveDateEnd)) {
          todayBooking[key] = value;
        }
      }
      setReserveData(todayBooking);
    } else if (reserveData && !isBookingToday) {
      setReserveData(bookings);
    }
  }, [bookings, isBookingToday]);

  const ToolbarItem = () => {
    return (
      <FormControlLabel
        style={{ marginLeft: 4 }}
        control={
          <Checkbox
            checked={isBookingToday}
            onChange={toggleToday}
            name="isBookingToday"
            color="primary"
          />
        }
        label="Hôm Nay"
      />
    );
  };

  return (
    <>
      <BookingDataTable
        data={reserveData}
        title="Khách Đặt Phòng"
        {...{ ToolbarItem }}
      />
    </>
  );
};

export default ReserveTab;
