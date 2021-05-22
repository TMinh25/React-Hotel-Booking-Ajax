import React from 'react';

import RoomPrice from './RoomPrice';
import BookingForm from './BookingForm';

const BookingCard = props => {
  const {
    roomIsLoading,
    normalDayPrice,
    holidayPrice,
    roomID,
    bookingData,
    setBookingData,
    clearBookingData,
    setTotalPriceInBooking,
    // refreshBookingData,
  } = props;
  return (
    <div className="booking-card">
      <div className="booking-card__wrapper">
        <RoomPrice
          roomIsLoading={roomIsLoading}
          normalDayPrice={normalDayPrice}
          holidayPrice={holidayPrice}
        />
        <BookingForm
          {...{
            normalDayPrice,
            holidayPrice,
            roomID,
            bookingData,
            setBookingData,
            clearBookingData,
            setTotalPriceInBooking,
            // refreshBookingData,
          }}
        />
      </div>
    </div>
  );
};

export default BookingCard;
