import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from '@material-ui/core';
import { CheckBox } from '@material-ui/icons';
import React, { useEffect } from 'react';

const ManagePrice = props => {
  const { normalDayPrice, holidayPrice, setFirstLevelValue } = props;
  return (
    <>
      <div>
        Giá Ngày Thường:{' '}
        <input
          type="number"
          name="normalDayPrice"
          value={normalDayPrice}
          onChange={setFirstLevelValue}
          className="input_manage"
        />{' '}
        VNĐ
      </div>
      <div>
        Giá Ngày Lễ / Ngày Nghỉ:{' '}
        <input
          type="number"
          name="holidayPrice"
          value={holidayPrice}
          onChange={setFirstLevelValue}
          className="input_manage"
        />{' '}
        VNĐ
      </div>
    </>
  );
};

export default ManagePrice;
