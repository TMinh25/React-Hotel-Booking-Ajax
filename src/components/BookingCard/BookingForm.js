import React, { useState } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays, eachDayOfInterval, format, parseISO } from 'date-fns';
import { Facebook } from 'react-spinners-css';
import PropTypes from 'prop-types';

import TotalAmount from './TotalAmount';
import Modal from '../Modal/index';

export const BookingForm = props => {
  const formRef = React.createRef();

  const modalRef = React.createRef();

  const [formData, setFormData] = useState({
    guestname: '',
    tel: '',
    startDate: null,
    endDate: null,
  });
  const [errorMessages, setErrorMessages] = useState({});
  const [modalState, setModalState] = useState({
    isModalOpen: false,
    modalMessage: '',
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [reserveIsLoading, setReserveIsLoading] = useState(false);

  const setNameAndTel = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const setStartDate = (startDate = formData.startDate) => {
    let endDate = '';

    if (startDate > formData.endDate) {
      endDate = addDays(startDate, 1);
    }

    setFormData({
      ...formData,
      startDate,
      endDate,
    });
  };

  const setEndDate = (endDate = formData.endDate) => {
    setFormData({
      ...formData,
      endDate,
    });
  };

  const updateStyleToBody = () => {
    document.body.classList.toggle('modal-is-open');
  };

  const excludeDates = () => {
    const { bookingData } = props;

    return bookingData.map(data => parseISO(data.date));
  };

  const openModal = () => {
    setModalState({ ...modalState, isModalOpen: true });
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
    const { guestname, tel, startDate, endDate } = formData;
    const newErrorMessages = { ...errorMessages };
    const regPattern = /^\d+$/;

    newErrorMessages.guestname = guestname ? '' : 'Name must be filled in';

    newErrorMessages.tel =
      tel && regPattern.test(tel) ? '' : 'Phone number must be filled in';

    newErrorMessages.dates =
      startDate && endDate ? '' : 'Dates should be selected';

    setErrorMessages(newErrorMessages);

    if (Object.values(newErrorMessages).some(message => message !== '')) {
      return false;
    }

    return true;
  };

  const formatDate = (startDate, endDate) => {
    return eachDayOfInterval({
      start: new Date(startDate),
      end: new Date(endDate),
    }).map(date => format(new Date(date), 'yyyy-MM-dd'));
  };

  const createFormData = () => {
    const { guestname, tel, startDate, endDate } = formData;
    const date = formatDate(startDate, endDate);

    const data = {
      name: guestname,
      tel,
      date,
    };

    return data;
  };

  const clearFormInputs = () => {
    setFormData({
      guestname: '',
      tel: '',
      startDate: null,
      endDate: null,
    });
  };

  const sendFormData = async () => {
    const { roomID, refreshBookingData } = props;
    const data = createFormData();
    try {
      setReserveIsLoading(true);

      // await apiPostBookingData(roomID, data);

      const modalMessage =
        'Thank you for booking with White Space, your room was booked successfully!';

      setModalState({ ...modalState, modalMessage });
      setBookingSuccess(true);
      setReserveIsLoading(false);
      openModal();
      clearFormInputs();
      refreshBookingData();
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

  // const {
  //   formData,
  //   errorMessages,
  //   modalIsOpen,
  //   modalMessage,
  //   bookingSuccess,
  //   reserveIsLoading,
  // } = this.state;
  const { guestname, tel, startDate, endDate } = formData;
  const { normalDayPrice, holidayPrice } = props;

  return (
    <>
      <div className="booking-card__form">
        <form className="form" ref={formRef} onSubmit={submitForm}>
          <div className="form__field">
            <p htmlFor="guestname" className="form__label">
              Họ Tên
            </p>
            <input
              type="text"
              className="form__input"
              name="guestname"
              value={guestname}
              onChange={setNameAndTel}
            />
            <em className="form__error-text">{errorMessages.guestname}</em>
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
              onChange={setNameAndTel}
            />
            <em className="form__error-text">{errorMessages.tel}</em>
          </div>
          <div className="form__field">
            <p className="form__label">Ngày</p>
            <div className="form__dates-wrapper">
              <DatePicker
                selected={startDate}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                onChange={setStartDate}
                minDate={addDays(new Date(), 1)}
                maxDate={addDays(new Date(), 90)}
                excludeDates={excludeDates()}
                dateFormat="yyyy-MM-dd"
                placeholderText="Check in"
              />
              &#8594;
              <DatePicker
                selected={endDate}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                onChange={setEndDate}
                minDate={addDays(startDate, 1)}
                maxDate={addDays(new Date(), 90)}
                excludeDates={excludeDates()}
                dateFormat="yyyy-MM-dd"
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
          <TotalAmount
            normalDayPrice={normalDayPrice}
            holidayPrice={holidayPrice}
            startDate={startDate}
            endDate={endDate}
          />
          <div className="form__btn-wrapper">
            <button type="submit" className="form__submit-btn">
              {reserveIsLoading ? <Facebook color="#fff" /> : 'Đặt Phòng'}
            </button>
          </div>
        </form>
      </div>
      {modalState.isModalOpen && (
        <Modal
          modalRef={modalRef}
          modalIsOpen={modalState.isModalOpen}
          modalMessage={modalState.modalMessage}
          closeModal={closeModal}
          handleClickOutside={handleClickOutside}
          bookingSuccess={bookingSuccess}
        />
      )}
    </>
  );
};

export default BookingForm;
