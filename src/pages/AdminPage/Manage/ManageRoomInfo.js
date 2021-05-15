import {
  Button,
  Divider,
  NativeSelect,
  Select,
  TextareaAutosize,
  TextField,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import TimePicker from 'react-time-picker';

import LineBreak from '../../../components/LineBreak/index';

const ManageRoomInfo = ({
  descriptionShort,
  setDescriptionShort,
  checkInAndOut,
  setCheckInAndOut,
  name,
  description,
  setFirstLevelValue,
  setBed,
}) => {
  const { guestMin, guestMax, footage, bed, privateBath } = descriptionShort;

  const { checkInEarly, checkInLate, checkOut } = checkInAndOut;

  const addBed = () => {
    setBed([...bed, '']);
  };

  const handleRemoveBed = index => {
    bed.splice(index, 1);
    setBed(bed);
  };

  const onChangeBedValue = (e, index) => {
    bed[index] = e.target.value;
    setBed(bed);
  };

  useEffect(() => {
    console.log(descriptionShort);
    console.log(checkInAndOut);
  }, [descriptionShort, checkInAndOut]);

  const CheckInAndOutHourPicker = ({ value, onChange }) => {
    return (
      <TimePicker
        onChange={onChange}
        value={value}
        disableClock
        format="HH:mm"
      />
    );
  };

  function onChangeCheckInEarly(value) {
    setCheckInAndOut('checkInEarly', value);
  }

  function onChangeCheckInLate(value) {
    setCheckInAndOut('checkInLate', value);
  }

  function onChangeCheckOut(value) {
    setCheckInAndOut('checkOut', value);
  }

  return (
    <>
      <div className="room-info">
        <label>Tên Phòng</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={setFirstLevelValue}
          className="input_manage"
          style={{ width: '100%' }}
        />
        <ul className="room-info__intro-list">
          <li className="room-info__intro-item">
            Số khách:{' '}
            <input
              type="number"
              name="guestMin"
              value={guestMin}
              onChange={setDescriptionShort}
              className="input_manage"
            />{' '}
            -{' '}
            <input
              type="number"
              name="guestMax"
              value={guestMax}
              onChange={setDescriptionShort}
              className="input_manage"
            />
          </li>
          <li className="room-info__intro-item">
            Diện tích:{' '}
            <input
              type="number"
              name="footage"
              value={footage}
              onChange={setDescriptionShort}
              className="input_manage"
            />{' '}
            m²
          </li>
          <li className="room-info__intro-item">
            Giường: <Button onClick={addBed}>Thêm Giường</Button>
            {bed.map((b, index) => (
              <div>
                <NativeSelect
                  key={index}
                  value={b}
                  onChange={e => onChangeBedValue(e, index)}
                  inputProps={{ 'aria-label': 'bed' }}
                >
                  <option selected>Giường</option>
                  <option value="Giường Đơn Nhỏ">Giường Đơn Nhỏ</option>
                  <option value="Giường Đơn To">Giường Đơn To</option>
                  <option value="Giường Đôi Nhỏ">Giường Đôi Nhỏ</option>
                  <option value="Giường Đôi To">Giường Đôi To</option>
                </NativeSelect>
                <Button onClick={() => handleRemoveBed(index)}>Xóa</Button>
              </div>
            ))}{' '}
          </li>
          <li className="room-info__intro-item">
            Phòng tắm riêng:{' '}
            <input
              type="number"
              name="privateBath"
              value={privateBath}
              onChange={setDescriptionShort}
              className="input_manage"
            />
          </li>
        </ul>
        <label>Mô tả</label>
        <TextareaAutosize
          style={{ width: '100%', border: '1px solid #e4e4e4' }}
          name="description"
          value={description}
          onChange={setFirstLevelValue}
          rowsMin={4}
          placeholder="Mô tả sơ bộ căn phòng"
        />
        <Divider className="divider" />
        <h2>Giờ CheckIn và CheckOut</h2>
        <div className="room-info__checks">
          <div className="room-info__check">
            <span className="room-info__check-title">Check in</span>
            <span className="room-info__check-time">
              <CheckInAndOutHourPicker
                onChange={onChangeCheckInEarly}
                value={checkInEarly}
              />{' '}
              -{' '}
              <CheckInAndOutHourPicker
                value={checkInLate}
                onChange={onChangeCheckInLate}
              />
            </span>
          </div>
          <div className="room-info__check">
            <span className="room-info__check-title">Check out</span>
            <span className="room-info__check-time">
              <CheckInAndOutHourPicker
                value={checkOut}
                onChange={onChangeCheckOut}
              />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageRoomInfo;
