import React, { createRef, useState } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays } from 'date-fns';
import { Facebook } from 'react-spinners-css';

import TotalAmount from './TotalAmount';
import Modal from '../Modal/index';
import { addBooking } from '../../reducers/bookings';
import { useDispatch } from 'react-redux';

export const BookingForm = props => {
  const {
    bookingData,
    setBookingData,
    clearBookingData,
    setTotalPriceInBooking,
  } = props;
  const formRef = createRef();
  const modalRef = createRef();

  const dispatch = useDispatch();

  const [errorMessages, setErrorMessages] = useState({});
  const [modalState, setModalState] = useState({
    isModalOpen: false,
    modalMessage: '',
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [reserveIsLoading, setReserveIsLoading] = useState(false);

  const setNameTelAndGuestCount = e =>
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });

  const setStartDate = (startDate = bookingData.reserveDateStart) => {
    let endDate = '';

    if (startDate >= bookingData.reserveDateEnd) {
      endDate = addDays(startDate, 1);
    }

    setBookingData({
      ...bookingData,
      reserveDateStart: +new Date(startDate),
      reserveDateEnd: +new Date(endDate),
    });
  };

  const setEndDate = (endDate = bookingData.reserveDateEnd) => {
    setBookingData({
      ...bookingData,
      reserveDateEnd: +new Date(endDate),
    });
  };

  const updateStyleToBody = () => {
    document.body.classList.toggle('modal-is-open');
  };

  const openModal = () => {
    const modalMessage =
      'Cảm ơn bạn đã tương tác với White Space, sẽ có nhận viên gọi điện xác nhận cho bạn!';
    setModalState({ ...modalState, modalMessage, isModalOpen: true });
    updateStyleToBody();
  };

  const closeModal = () => {
    setModalState({ ...modalState, isModalOpen: false });
    updateStyleToBody();
  };

  const handleClickOutside = e => {
    const modal = modalRef.current;

    if (modal && modal.contains(e.target)) {
      return;
    }

    closeModal();
  };

  const validateForm = () => {
    const { guestName, tel, reserveDateStart, reserveDateEnd } = bookingData;
    const newErrorMessages = { ...errorMessages };
    const regPattern = /^\d+$/;

    newErrorMessages.guestName = guestName ? '' : 'Bắt buộc phải điền tên';

    newErrorMessages.tel =
      tel && regPattern.test(tel) ? '' : 'Số điện thoại là thông tin bắt buộc';

    newErrorMessages.dates =
      reserveDateStart && reserveDateEnd
        ? ''
        : 'Hãy chọn ngày đến và đi của bạn';

    setErrorMessages(newErrorMessages);

    if (Object.values(newErrorMessages).some(message => message !== '')) {
      return false;
    }

    return true;
  };

  const sendFormData = async () => {
    try {
      setReserveIsLoading(true);
      // add current timestamp to bookingData
      await dispatch(addBooking({ ...bookingData, timestamp: +new Date() }));
      setBookingSuccess(true);
      setReserveIsLoading(false);
      clearBookingData();
      openModal();
    } catch (e) {
      if (!e.response) return;

      const modalMessage = e.response.data.message;

      setModalState({ ...modalState, modalMessage });
      setBookingSuccess(false);
      setReserveIsLoading(false);
      openModal();

      console.error(
        `🚫 Something went wrong posting data: ${e.response.data.message}`,
      );
    }
  };

  const submitForm = e => {
    e.preventDefault();

    const allValidated = validateForm();

    if (allValidated) {
      sendFormData();
    }
  };
  const {
    guestName,
    tel,
    reserveDateStart,
    reserveDateEnd,
    guestCount,
  } = bookingData;
  const { normalDayPrice, holidayPrice } = props;

  return (
    <>
      <div className="booking-card__form">
        <form className="form" ref={formRef} onSubmit={submitForm}>
          <div className="form__field">
            <p htmlFor="guestName" className="form__label">
              Họ Tên
            </p>
            <input
              type="text"
              className="form__input"
              name="guestName"
              value={guestName}
              onChange={setNameTelAndGuestCount}
            />
            <em className="form__error-text">{errorMessages.guestName}</em>
          </div>
          <div className="form__field">
            <p htmlFor="tel" className="form__label">
              Điện Thoại
            </p>
            <input
              type="text"
              className="form__input"
              name="tel"
              value={tel}
              onChange={setNameTelAndGuestCount}
            />
            <em className="form__error-text">{errorMessages.tel}</em>
          </div>
          <div className="form__field">
            <p htmlFor="tel" className="form__label">
              Số Lượng Khách
            </p>
            <input
              type="number"
              className="form__input"
              name="guestCount"
              value={guestCount}
              onChange={setNameTelAndGuestCount}
            />
            <em className="form__error-text">{errorMessages.tel}</em>
          </div>
          <div className="form__field">
            <p className="form__label">Ngày</p>
            <div className="form__dates-wrapper">
              <DatePicker
                selected={reserveDateStart}
                selectsStart
                startDate={reserveDateStart}
                endDate={reserveDateEnd}
                onChange={setStartDate}
                minDate={addDays(new Date(), 1)}
                maxDate={addDays(new Date(), 90)}
                dateFormat="dd-MM-yyyy"
                placeholderText="Check in"
              />
              &#8594;
              <DatePicker
                selected={reserveDateEnd}
                selectsEnd
                startDate={reserveDateStart}
                endDate={reserveDateEnd}
                onChange={setEndDate}
                minDate={addDays(reserveDateStart, 1)}
                maxDate={addDays(new Date(), 90)}
                dateFormat="dd-MM-yyyy"
                placeholderText="Check out"
                popperModifiers={{
                  preventOverflow: {
                    enabled: true,
                    escapeWithReference: false,
                    boundariesElement: 'viewport',
                  },
                }}
              />
            </div>
            <em className="form__error-text">{errorMessages.dates}</em>
          </div>
          {bookingData && (
            <TotalAmount
              {...{
                normalDayPrice,
                holidayPrice,
                setTotalPriceInBooking,
              }}
              startDate={reserveDateStart}
              endDate={reserveDateEnd}
            />
          )}
          <div className="form__btn-wrapper">
            <button type="submit" className="form__submit-btn">
              {reserveIsLoading ? <Facebook color="#fff" /> : 'Đặt Phòng'}
            </button>
          </div>
        </form>
      </div>
      {modalState.isModalOpen && (
        <Modal
          {...{
            modalRef,
            closeModal,
            handleClickOutside,
            bookingSuccess,
          }}
          modalIsOpen={modalState.isModalOpen}
          modalMessage={modalState.modalMessage}
        />
      )}
    </>
  );
};

export default BookingForm;
