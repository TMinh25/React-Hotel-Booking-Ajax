import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Ellipsis } from 'react-spinners-css';

import HeroHeader from '../../components/HeroHeader/index';
import RoomCard from '../../components/RoomCard/index';

export function SplashScreen() {
  return (
    <div className="pre-loading">
      <img
        src="/images/hero-logo_white.svg"
        alt="White Space"
        className="hero__info-logo"
      />
      <Ellipsis color="#fff" />
    </div>
  );
}

const MainPage = props => {
  const rooms = useSelector(state => state.rooms);
  const [state, setState] = useState({
    dataIsFetched: false,
    slidesAreLoaded: false,
  });

  useEffect(() => {
    if (rooms) {
      setState({ ...state, dataIsFetched: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rooms]);

  // useEffect(() => {
  //   console.log(state);
  // }, [state]);

  const setSlidesAreLoaded = () => {
    setState({ dataIsFetched: !!rooms, slidesAreLoaded: true });
  };

  const { dataIsFetched, slidesAreLoaded } = state;
  const allDownloaded = dataIsFetched && slidesAreLoaded;

  return (
    <>
      {!allDownloaded && <SplashScreen />}
      {rooms && (
        <div
          className={`container wrapper-l ${
            !allDownloaded ? 'is-loading' : ''
          }`}
        >
          <HeroHeader setSlidesAreLoaded={setSlidesAreLoaded} />
          <div className="room-cards">
            <div className="room-cards__list wrapper-m">
              {Object.keys(rooms).map(roomKey => {
                if (roomKey !== 'currentRoom') {
                  return (
                    <RoomCard
                      key={roomKey}
                      path={roomKey}
                      data={rooms[roomKey]}
                    />
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MainPage;
