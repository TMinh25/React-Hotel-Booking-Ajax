import React from 'react';

import { subDays, eachDayOfInterval } from 'date-fns';
import { numberWithCommas } from '../../utils';

const TotalAmount = props => {
  const { normalDayPrice, holidayPrice, startDate, endDate } = props;
  let totalNormalNights = 0;
  let totalHolidayNights = 0;
  let pricePerDay;

  if (!startDate || !endDate) return null;

  const totalPrice = eachDayOfInterval({
    start: startDate,
    end: subDays(endDate, 1),
  })
    .map(day => day.getDay(day))
    .map(day => {
      const holiday = day === 0 || day === 5 || day === 6;

      if (holiday) {
        totalHolidayNights += 1;
      } else {
        totalNormalNights += 1;
      }

      pricePerDay = holiday ? holidayPrice : normalDayPrice;

      return pricePerDay;
    })
    .reduce((sum, currentPrice) => {
      return sum + currentPrice;
    }, 0);

  return (
    <div className="booking-card__total">
      <ul className="booking-card__total-list">
        <li className="booking-card__total-item">
          <span className="booking-card__total-text">
            Ngày trong tuần <br /> {numberWithCommas(normalDayPrice)} VNĐ x{' '}
            {totalNormalNights} đêm
          </span>
          <span className="booking-card__total-text">
            {numberWithCommas(normalDayPrice * totalNormalNights)} VNĐ
          </span>
        </li>
        <li className="booking-card__total-item">
          <span className="booking-card__total-text">
            Ngày cuối tuần <br /> {numberWithCommas(holidayPrice)} VNĐ x{' '}
            {totalHolidayNights} đêm
          </span>
          <span className="booking-card__total-text">
            {numberWithCommas(holidayPrice * totalHolidayNights)} VNĐ
          </span>
        </li>
        <li className="booking-card__total-item">
          <span className="booking-card__total-text bold">Tổng</span>
          <span className="booking-card__total-text bold large">
            {numberWithCommas(totalPrice)} VNĐ
          </span>
        </li>
      </ul>
    </div>
  );
};

export default TotalAmount;
