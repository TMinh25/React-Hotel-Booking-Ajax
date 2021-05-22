import React, { useEffect, useState } from 'react';
import './index.scss';
import BookingDataTable from './Components/BookingDataTable';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { isBetween } from '../../utils';

function AllBookingDataTab(props) {
  const [isBookingToday, setIsBookingToday] = useState(false);
  const bookings = useSelector(state => state.bookings);
  const [reserveData, setReserveData] = useState(bookings ?? {});

  const toggleToday = () => setIsBookingToday(!isBookingToday);

  useEffect(() => {
    if (bookings && isBookingToday) {
      const todayBooking = {};
      for (const [key, value] of Object.entries(bookings)) {
        const { reserveDateStart, reserveDateEnd } = value;
        if (isBetween(reserveDateStart, new Date(), reserveDateEnd)) {
          todayBooking[key] = value;
        }
      }
      setReserveData(todayBooking);
    } else if (bookings && !isBookingToday) {
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
        title="Tất Cả Dữ Liệu"
        {...{ ToolbarItem }}
      />
    </>
  );
}

export default AllBookingDataTab;
