import React from 'react';
import PropTypes from 'prop-types';

const RoomAmenities = props => {
  const { amenities } = props;
  if (!amenities) return null;

  const {
    wifi,
    breakfast,
    minibar,
    roomService,
    airConditioner,
    greatView,
    smokeFree,
    childFriendly,
    petFriendly,
  } = amenities;

  return (
    <div className="room-amenities">
      <ul className="room-amenities__list">
        <li className={`room-amenities__item ${wifi ? '' : 'non-available'}`}>
          <img
            src="/images/room-wifi.svg"
            alt="Wifi"
            className="room-amenities__icon"
          />
          <span className="room-amenities__title">Wi-Fi</span>
        </li>
        <li
          className={`room-amenities__item ${breakfast ? '' : 'non-available'}`}
        >
          <img
            src="/images/room-breakfast.svg"
            alt="Breakfast"
            className="room-amenities__icon"
          />
          <span className="room-amenities__title">Bữa Sáng</span>
        </li>
        <li
          className={`room-amenities__item ${minibar ? '' : 'non-available'}`}
        >
          <img
            src="/images/room-bar.svg"
            alt="Mini Bar"
            className="room-amenities__icon"
          />
          <span className="room-amenities__title">Mini Bar</span>
        </li>
        <li
          className={`room-amenities__item ${
            roomService ? '' : 'non-available'
          }`}
        >
          <img
            src="/images/room_service.svg"
            alt="Room Service"
            className="room-amenities__icon"
          />
          <span className="room-amenities__title">Phục Vụ Phòng</span>
        </li>
        <li
          className={`room-amenities__item ${
            airConditioner ? '' : 'non-available'
          }`}
        >
          <img
            src="/images/room-breeze.svg"
            alt="Air-Conditioner"
            className="room-amenities__icon"
          />
          <span className="room-amenities__title">Điều Hòa</span>
        </li>
        <li
          className={`room-amenities__item ${greatView ? '' : 'non-available'}`}
        >
          <img
            src="/images/room-mountain-range.svg"
            alt="Great-View"
            className="room-amenities__icon"
          />
          <span className="room-amenities__title">View Đẹp</span>
        </li>
        <li
          className={`room-amenities__item ${smokeFree ? '' : 'non-available'}`}
        >
          <img
            src="/images/room-no-smoke-symbol.svg"
            alt="Smoke-Free"
            className="room-amenities__icon"
          />
          <span className="room-amenities__title">Hút Thuốc Lá</span>
        </li>
        <li
          className={`room-amenities__item ${
            petFriendly ? '' : 'non-available'
          }`}
        >
          <img
            src="/images/room-dog.svg"
            alt="Pet Friendly"
            className="room-amenities__icon"
          />
          <span className="room-amenities__title">Cho Phép Vật Nuôi</span>
        </li>
        <li
          className={`room-amenities__item ${
            childFriendly ? '' : 'non-available'
          }`}
        >
          <img
            src="/images/room-crawling-baby-silhouette.svg"
            alt="Child Friendly"
            className="room-amenities__icon"
          />
          <span className="room-amenities__title">Cho Phép Trẻ Con</span>
        </li>
      </ul>
    </div>
  );
};

export default RoomAmenities;
