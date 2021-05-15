import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from '@material-ui/core';
import { CheckBox } from '@material-ui/icons';
import React, { useEffect } from 'react';

const ManageRoomAmenities = props => {
  const { amenities, setAmenities } = props;

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

  useEffect(() => {
    console.log(amenities);
  }, [amenities]);

  const handleChange = e => {
    const { name } = e.target;
    console.log(e.target);
    console.log(name, !amenities[name]);
    setAmenities({ name, value: !amenities[name] });
  };

  return (
    <div className="room-amenities">
      {/* <li className={`room-amenities__item ${wifi ? '' : 'non-available'}`}> */}

      <FormControl component="fieldset">
        <FormGroup
          className="room-amenities__list"
          style={{ borderTop: 'none', userSelect: 'none' }}
        >
          <FormControlLabel
            className={`room-amenities__item ${wifi ? '' : 'non-available'}`}
            control={
              <Checkbox
                color="primary"
                checked={wifi}
                onChange={handleChange}
                name="wifi"
              />
            }
            label={
              <>
                <img
                  src="/images/room-wifi.svg"
                  alt="Wifi"
                  className="room-amenities__icon"
                />
                <span className="room-amenities__title">Wi-Fi</span>
              </>
            }
          />
          <FormControlLabel
            className={`room-amenities__item ${
              breakfast ? '' : 'non-available'
            }`}
            control={
              <Checkbox
                color="primary"
                checked={breakfast}
                onChange={handleChange}
                name="breakfast"
              />
            }
            label={
              <>
                <img
                  src="/images/room-breakfast.svg"
                  alt="Breakfast"
                  className="room-amenities__icon"
                />
                <span className="room-amenities__title">Bữa Sáng</span>
              </>
            }
          />
          <FormControlLabel
            className={`room-amenities__item ${minibar ? '' : 'non-available'}`}
            control={
              <Checkbox
                color="primary"
                checked={minibar}
                onChange={handleChange}
                name="minibar"
              />
            }
            label={
              <>
                <img
                  src="/images/room-bar.svg"
                  alt="Mini Bar"
                  className="room-amenities__icon"
                />
                <span className="room-amenities__title">Mini Bar</span>
              </>
            }
          />
          <FormControlLabel
            className={`room-amenities__item ${
              roomService ? '' : 'non-available'
            }`}
            control={
              <Checkbox
                color="primary"
                checked={roomService}
                onChange={handleChange}
                name="roomService"
              />
            }
            label={
              <>
                <img
                  src="/images/room_service.svg"
                  alt="Room Service"
                  className="room-amenities__icon"
                />
                <span className="room-amenities__title">Phục Vụ Phòng</span>
              </>
            }
          />
          <FormControlLabel
            className={`room-amenities__item ${
              airConditioner ? '' : 'non-available'
            }`}
            control={
              <Checkbox
                color="primary"
                checked={airConditioner}
                onChange={handleChange}
                name="airConditioner"
              />
            }
            label={
              <>
                <img
                  src="/images/room-breeze.svg"
                  alt="Air-Conditioner"
                  className="room-amenities__icon"
                />
                <span className="room-amenities__title">Điều Hòa</span>
              </>
            }
          />
          <FormControlLabel
            className={`room-amenities__item ${
              greatView ? '' : 'non-available'
            }`}
            control={
              <Checkbox
                color="primary"
                checked={greatView}
                onChange={handleChange}
                name="greatView"
              />
            }
            label={
              <>
                <img
                  src="/images/room-mountain-range.svg"
                  alt="Great-View"
                  className="room-amenities__icon"
                />
                <span className="room-amenities__title">View Đẹp</span>
              </>
            }
          />
          <FormControlLabel
            className={`room-amenities__item ${
              smokeFree ? '' : 'non-available'
            }`}
            control={
              <Checkbox
                color="primary"
                checked={smokeFree}
                onChange={handleChange}
                name="smokeFree"
              />
            }
            label={
              <>
                <img
                  src="/images/room-no-smoke-symbol.svg"
                  alt="Smoke-Free"
                  className="room-amenities__icon"
                />
                <span className="room-amenities__title">Hút Thuốc Lá</span>
              </>
            }
          />
          <FormControlLabel
            className={`room-amenities__item ${
              petFriendly ? '' : 'non-available'
            }`}
            control={
              <Checkbox
                color="primary"
                checked={petFriendly}
                onChange={handleChange}
                name="petFriendly"
              />
            }
            label={
              <>
                <img
                  src="/images/room-dog.svg"
                  alt="Pet Friendly"
                  className="room-amenities__icon"
                />
                <span className="room-amenities__title">Cho Phép Vật Nuôi</span>
              </>
            }
          />
          <FormControlLabel
            className={`room-amenities__item ${
              childFriendly ? '' : 'non-available'
            }`}
            control={
              <Checkbox
                color="primary"
                checked={childFriendly}
                onChange={handleChange}
                name="childFriendly"
              />
            }
            label={
              <>
                <img
                  src="/images/room-crawling-baby-silhouette.svg"
                  alt="Child Friendly"
                  className="room-amenities__icon"
                />
                <span className="room-amenities__title">Cho Phép Trẻ Con</span>
              </>
            }
          />
        </FormGroup>
      </FormControl>
    </div>
  );
};

export default ManageRoomAmenities;
