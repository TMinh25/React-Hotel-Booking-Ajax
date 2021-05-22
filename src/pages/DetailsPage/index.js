import React, { useState, useEffect, useCallback } from 'react';

import InfoSkeleton from '../../components/RoomInfo/skeleton';
import MosaicSkeleton from '../../components/MosaicHeader/skeleton';

import MosaicHeader from '../../components/MosaicHeader/index';
import RoomInfo from '../../components/RoomInfo/index';
import RoomAmenities from '../../components/RoomAmenities/index';
import BookingCard from '../../components/BookingCard/index';
import { useParams } from 'react-router';
import { defaultFailCB, statusCode } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllRooms,
  getSingleRoom,
  setCurrentRoom,
} from '../../reducers/rooms';
import { SplashScreen } from '../MainPage';

const DetailsPage = props => {
  // const [currentRoom, setCurrentRoom] = useState({});
  const { roomID } = useParams();
  const dispatch = useDispatch();
  const currentRoom = useSelector(state => state.rooms?.currentRoom);
  const [totalPrice, setTotalPrice] = useState(0);
  const initialState = {
    guestName: '',
    guestCount: null,
    reserveDateStart: null,
    reserveDateEnd: null,
    room: { id: roomID, name: currentRoom?.name },
    status: statusCode.reserveConfirmation,
    timestamp: null,
    tel: '',
    totalPrice,
  };

  const [bookingData, setBookingData] = useState(initialState);

  useEffect(() => {
    console.log('currentRoom', currentRoom);
    setBookingData(prevState => ({
      ...prevState,
      room: { id: roomID, name: currentRoom?.name },
    }));
  }, [currentRoom]);

  const clearBookingData = () => setBookingData(initialState);

  const [roomIsLoading, setRoomIsLoading] = useState(true);

  function setTotalPriceInBooking(val) {
    setTotalPrice(val);
    setBookingData({ ...bookingData, totalPrice: val });
  }

  // useEffect(() => {
  //   console.log(bookingData);
  // }, [bookingData]);

  const getCurrentRoomData = () => {
    try {
      if (roomID) {
        dispatch(getSingleRoom(roomID));
        setBookingData({
          ...bookingData,
          room: { ...bookingData.room, name: currentRoom?.name },
        });
      }
    } catch (e) {
      console.error(
        `🚫 Something went wrong fetching API calls on this room: ${e}`,
      );
    } finally {
      setRoomIsLoading(false);
    }
    // eslint-disable-next-line
  };

  useEffect(() => {
    getCurrentRoomData();
  }, []);

  return (
    <div className="container wrapper-l">
      {!currentRoom ? (
        <MosaicSkeleton />
      ) : (
        <MosaicHeader name={currentRoom?.name} images={currentRoom?.imageUrl} />
      )}
      <main className="main">
        <div className="wrapper-m main__wrapper">
          <section className="main__left">
            {roomIsLoading ? <InfoSkeleton /> : <RoomInfo data={currentRoom} />}
            <RoomAmenities amenities={currentRoom?.amenities} />
          </section>
          <section className="main__right">
            <BookingCard
              {...{
                roomIsLoading,
                normalDayPrice: currentRoom?.normalDayPrice,
                holidayPrice: currentRoom?.holidayPrice,
                roomID,
                bookingData,
                setBookingData,
                clearBookingData,
                setTotalPriceInBooking,
                // refreshBookingData,
              }}
            />
          </section>
        </div>
      </main>
    </div>
  );
};

export default DetailsPage;
