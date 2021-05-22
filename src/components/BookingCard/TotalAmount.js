import React, { useMemo, useState } from 'react';

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

  const totalPrice = useMemo(() => {
    if (!startDate || !endDate) return null;
    let pricePerDay;
    setTotalHolidayNights(0);
    setTotalNormalNights(0);
    return (
      // return total price for reservation
      // with iteration for each day
      eachDayOfInterval({
        start: startDate,
        end: subDays(endDate, 1),
      })
        // get array of days in reservation
        .map(day => day.getDay(day))
        // return array of price for each day
        .map(day => {
          // holidays = sunday || friday || saturday
          const holiday = day === 0 || day === 5 || day === 6;

          if (holiday) {
            setTotalHolidayNights(totalHolidayNights + 1);
          } else {
            setTotalNormalNights(totalNormalNights + 1);
          }

          pricePerDay = holiday ? holidayPrice : normalDayPrice;
          return pricePerDay;
        })
        // add all of the value to sum
        .reduce((sum, currentPrice) => {
          return parseInt(sum) + parseInt(currentPrice);
        }, 0)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]);

  const VATPrice = useMemo(() => {
    // set total price for parent
    setTotalPriceInBooking(totalPrice + (totalPrice / 100) * 5);

    return (totalPrice / 100) * 5;
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
