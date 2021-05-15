import React, { Component } from 'react';

import { Ellipsis } from 'react-spinners-css';

import HeroHeader from '../../components/HeroHeader/index';
import RoomCard from '../../components/RoomCard/index';
import { adminCreateUser, getAllRooms } from '../../firebase';

class MainPage extends Component {
  state = {
    rooms: {},
    dataIsFetched: false,
    slidesAreLoaded: false,
  };

  componentDidMount() {
    this.getRoomsData();
  }

  getRoomsData = async () => {
    try {
      const response = await getAllRooms();
      console.log(response);
      this.setState({ rooms: response });
    } catch (e) {
      console.error(`🚫 Something went wrong fetching API calls: ${e}`);
    }

    this.setState({ dataIsFetched: true });
  };

  setSlidesAreLoaded = () => {
    this.setState({ slidesAreLoaded: true });
  };

  render() {
    const { rooms, dataIsFetched, slidesAreLoaded } = this.state;
    const allDownloaded = dataIsFetched && slidesAreLoaded;

    return (
      <>
        {!allDownloaded && (
          <div className="pre-loading">
            <img
              src="/images/hero-logo_white.svg"
              alt="White Space"
              className="hero__info-logo"
            />
            <Ellipsis color="#fff" />
          </div>
        )}
        <div
          className={`container wrapper-l ${
            !allDownloaded ? 'is-loading' : ''
          }`}
        >
          <HeroHeader setSlidesAreLoaded={this.setSlidesAreLoaded} />
          <div className="room-cards">
            <div className="room-cards__list wrapper-m">
              {Object.keys(rooms).map(roomKey => (
                <RoomCard key={roomKey} path={roomKey} data={rooms[roomKey]} />
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default MainPage;
