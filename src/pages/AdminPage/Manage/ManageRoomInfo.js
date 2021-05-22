import {
  Button,
  Divider,
  Input,
  NativeSelect,
  TextareaAutosize,
  TextField,
} from '@material-ui/core';
import { TimePicker } from '@material-ui/pickers';
import React from 'react';
import { format, set } from 'date-fns';

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

  function onChangeCheckInEarly(value) {
    setCheckInAndOut('checkInEarly', format(value, 'HH:mm'));
  }

  function onChangeCheckInLate(value) {
    setCheckInAndOut('checkInLate', format(value, 'HH:mm'));
  }

  function onChangeCheckOut(value) {
    setCheckInAndOut('checkOut', format(value, 'HH:mm'));
  }

  return (
    <>
      <div className="room-info">
        <span className="room-info__check-title">Tên Phòng</span>
        <TextField
          id="outlined-margin-dense"
          margin="dense"
          variant="outlined"
          fullWidth
          placeholder="Tên Phòng"
          value={name}
          onChange={setFirstLevelValue}
        />
        <ul className="room-info__intro-list">
          <li className="room-info__intro-item">
            <Input
              placeholder="Số Khách Ít Nhất"
              inputProps={{ 'aria-label': 'description' }}
              type="number"
              name="guestMin"
              value={guestMin}
              onChange={setDescriptionShort}
            />{' '}
            -{' '}
            <Input
              placeholder="Số Khách Nhiều Nhất"
              inputProps={{ 'aria-label': 'description' }}
              type="number"
              name="guestMax"
              value={guestMax}
              onChange={setDescriptionShort}
            />
          </li>
          <li className="room-info__intro-item">
            <Input
              placeholder="Diện Tích"
              inputProps={{ 'aria-label': 'description' }}
              type="number"
              name="footage"
              value={footage}
              onChange={setDescriptionShort}
            />
            m²
          </li>
          <li style={{ margin: '15px 0px' }} className="room-info__intro-item">
            Giường: <Button onClick={addBed}>Thêm Giường</Button>
            {bed?.map((b, index) => (
              <div style={{ margin: 10 }}>
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
            <Input
              placeholder="Phòng Tắm Riêng"
              inputProps={{ 'aria-label': 'description' }}
              type="number"
              name="privateBath"
              value={privateBath}
              onChange={setDescriptionShort}
            />
          </li>
        </ul>
        <TextField
          id="outlined-multiline-static"
          label="Mô Tả"
          placeholder="Mô tả sơ bộ căn phòng"
          multiline
          fullWidth
          rows={4}
          variant="outlined"
          name="description"
          value={description}
          onChange={setFirstLevelValue}
        />
        <div className="room-info__checks">
          <div className="room-info__check">
            <span className="room-info__check-title">Check in</span>
            <span className="room-info__check-time">
              <TimePicker
                ampm={false}
                margin="normal"
                label="Check In Sớm"
                value={set(new Date(), {
                  hours: checkInEarly.split(':')[0],
                  minutes: checkInEarly.split(':')[1],
                })}
                onChange={onChangeCheckInEarly}
              />
              <TimePicker
                ampm={false}
                margin="normal"
                label="Check In Muộn"
                value={set(new Date(), {
                  hours: checkInLate.split(':')[0],
                  minutes: checkInLate.split(':')[1],
                })}
                onChange={onChangeCheckInLate}
              />
            </span>
          </div>
          <div className="room-info__check">
            <span className="room-info__check-title">Check out</span>
            <span className="room-info__check-time">
              <TimePicker
                ampm={false}
                margin="normal"
                label="Check Out"
                value={set(new Date(), {
                  hours: checkOut.split(':')[0],
                  minutes: checkOut.split(':')[1],
                })}
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
