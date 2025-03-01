import { Input } from '@material-ui/core';
import React from 'react';

const ManagePrice = props => {
  const { normalDayPrice, holidayPrice, setFirstLevelValue } = props;
  return (
    <>
      <div>
        Giá Ngày Thường:{' '}
        <Input
          placeholder="Phòng Tắm Riêng"
          inputProps={{ 'aria-label': 'description' }}
          type="number"
          name="normalDayPrice"
          value={normalDayPrice}
          onChange={setFirstLevelValue}
        />{' '}
        VNĐ
      </div>
      <div>
        Giá Ngày Lễ / Ngày Nghỉ:{' '}
        <Input
          placeholder="Phòng Tắm Riêng"
          inputProps={{ 'aria-label': 'description' }}
          type="number"
          name="holidayPrice"
          value={holidayPrice}
          onChange={setFirstLevelValue}
        />{' '}
        VNĐ
      </div>
    </>
  );
};

export default ManagePrice;
