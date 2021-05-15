import React, { useState, useEffect, useCallback } from 'react';

import InfoSkeleton from '../../components/RoomInfo/skeleton';
import MosaicSkeleton from '../../components/MosaicHeader/skeleton';

import MosaicHeader from '../../components/MosaicHeader/index';
import RoomInfo from '../../components/RoomInfo/index';
import RoomAmenities from '../../components/RoomAmenities/index';
import BookingCard from '../../components/BookingCard/index';
import { getSingleRoom } from '../../firebase';
import { useParams } from 'react-router';

const DetailsPage = props => {
  const [currentRoom, setCurrentRoom] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [roomIsLoading, setRoomIsLoading] = useState(true);

  const { roomID } = useParams();

  useEffect(() => {
    getCurrentRoomData();
    console.log(roomID);
    // eslint-disable-next-line
  }, []);

  const getCurrentRoomData = useCallback(async () => {
    try {
      // console.log(location.state.roomID);
      const currentRoomResponse = await getSingleRoom(roomID);
      console.log(currentRoomResponse);
      setCurrentRoom(currentRoomResponse);
    } catch (e) {
      console.error(
        `🚫 Something went wrong fetching API calls on this room: ${e}`,
      );
    }

    setRoomIsLoading(false);

    // eslint-disable-next-line
  }, []);

  const refreshBookingData = async () => {
    // const { location } = this.props;

    try {
      // const response = await apiGetSingleRoom(location.state.roomID);
      // this.setState({
      //   bookingData: response.data.booking,
      // });
    } catch (e) {
      console.error(
        `🚫 Something went wrong fetching API calls on this room: ${e}`,
      );
    }
  };

  const {
    name,
    imageUrl,
    amenities,
    normalDayPrice,
    holidayPrice,
  } = currentRoom;

  return (
    <div className="container wrapper-l">
      {roomIsLoading ? (
        <MosaicSkeleton />
      ) : (
        <MosaicHeader name={name} images={imageUrl} />
      )}
      <main className="main">
        <div className="wrapper-m main__wrapper">
          <section className="main__left">
            {roomIsLoading ? <InfoSkeleton /> : <RoomInfo data={currentRoom} />}
            <RoomAmenities amenities={amenities} />
          </section>
          <section className="main__right">
            <BookingCard
              roomIsLoading={roomIsLoading}
              normalDayPrice={normalDayPrice}
              holidayPrice={holidayPrice}
              roomID={roomID}
              bookingData={bookingData}
              refreshBookingData={refreshBookingData}
            />
          </section>
        </div>
      </main>
    </div>
  );
};

export default DetailsPage;
