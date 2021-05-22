import React, { useEffect, useMemo, useState } from 'react';

import { subDays, eachDayOfInterval } from 'date-fns';
import { numberWithCommas } from '../../utils';

const TotalAmount = props => {
  const {
    normalDayPrice,
    holidayPrice,
    startDate,
    endDate,
    setTotalPriceInBooking,
  } = props;
  const [totalNormalNights, setTotalNormalNights] = useState(0);
  const [totalHolidayNights, setTotalHolidayNights] = useState(0);
  // var totalNormalNights = 0;
  // var totalHolidayNights = 0;
  let pricePerDay;

  const totalPrice = useMemo(() => {
    if (!startDate || !endDate) return null;
    setTotalHolidayNights(0);
    setTotalNormalNights(0);
    return eachDayOfInterval({
      start: startDate,
      end: subDays(endDate, 1),
    })
      .map(day => day.getDay(day))
      .map(day => {
        const holiday = day === 0 || day === 5 || day === 6;

        if (holiday) {
          // totalHolidayNights += 1;
          setTotalHolidayNights(prevState => prevState + 1);
        } else {
          // totalNormalNights += 1;
          setTotalNormalNights(prevState => prevState + 1);
        }

        pricePerDay = holiday ? holidayPrice : normalDayPrice;

        return pricePerDay;
      })
      .reduce((sum, currentPrice) => {
        return parseInt(sum) + parseInt(currentPrice);
      }, 0);
  }, [startDate, endDate]);

  useEffect(() => {
    setTotalPriceInBooking(totalPrice + (totalPrice / 100) * 5);
  }, [totalPrice]);

  const VATPrice = useMemo(() => {
    return (totalPrice / 100) * 5;
  }, [totalPrice]);

  if (!startDate || !endDate) return null;

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
          <span className="booking-card__total-text">
            Thuế VAT <br /> {numberWithCommas(totalPrice)} VNĐ x 5%
          </span>
          <span className="booking-card__total-text">
            {numberWithCommas(VATPrice)} VNĐ
          </span>
        </li>
        <li className="booking-card__total-item">
          <span className="booking-card__total-text bold">Tổng</span>
          <span className="booking-card__total-text bold large">
            {numberWithCommas(totalPrice + VATPrice)} VNĐ
          </span>
        </li>
      </ul>
    </div>
  );
};

export default TotalAmount;
