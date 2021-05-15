import React from "react";

import { Ellipsis } from "react-spinners-css";
import { numberWithCommas } from "../../utils";

const RoomPrice = ({ roomIsLoading, normalDayPrice, holidayPrice }) => {
  return (
    <div className="booking-card__prices">
      <div className="booking-card__price-item">
        <span className="booking-card__price-title">T2-T5 mỗi tối</span>
        <span className="booking-card__price-per-night">
          {roomIsLoading ? (
            <Ellipsis color="#111" />
          ) : (
            `${numberWithCommas(normalDayPrice)} VNĐ`
          )}
        </span>
      </div>
      <div className="booking-card__price-item">
        <span className="booking-card__price-title">T6-CN mỗi tối</span>
        <span className="booking-card__price-per-night">
          {roomIsLoading ? (
            <Ellipsis color="#111" />
          ) : (
            `${numberWithCommas(holidayPrice)} VNĐ`
          )}
        </span>
      </div>
    </div>
  );
};

export default RoomPrice;
