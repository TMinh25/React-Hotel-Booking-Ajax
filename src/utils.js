import { toast } from 'react-toastify';
import { isBefore, isAfter } from 'date-fns';

export function numberWithCommas(x) {
  if (x == null || x === undefined) return '';
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// export function isToday(someDate) {
//   const today = new Date();
//   return (
//     someDate.getDate() === today.getDate() &&
//     someDate.getMonth() === today.getMonth() &&
//     someDate.getFullYear() === today.getFullYear()
//   );
// }

export function isToday(inputDate) {
  const today = new Date();
  const date = new Date(inputDate);
  if (today.setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0)) return true;
  else return false;
}

export function isBetween(startDate, date, endDate) {
  return Boolean(
    isBefore(new Date(startDate), new Date(date)) &&
      isAfter(new Date(endDate), new Date(date)),
  );
}

export function getReserveStartAndEnd(start, end) {
  const timeStart = new Date(start),
    timeEnd = new Date(end);

  var res;

  if (timeStart.getMonth() === timeEnd.getMonth()) {
    res = `${timeStart.getDate()}-${timeEnd.getDate()} tháng ${timeStart.getMonth() +
      1}`;
  } else if (timeStart.getMonth() !== timeEnd.getMonth()) {
    res = `${timeStart.getDate()} tháng ${timeStart.getMonth() +
      1}-${timeEnd.getDate()} tháng ${timeEnd.getMonth() + 1}`;
  }
  return res;
}

//#region notification

// success notification
export const defaultSuccessCB = msg =>
  toast.success(msg ? `✌ Thành Công: ${msg}!` : '✌ Thành Công!');

// fail notification
export const defaultFailCB = err =>
  toast.error(err ? `🚫 Lỗi: ${err}!` : '🚫 Lỗi!');

// warn notification
export const defaultWarnCB = msg =>
  toast.warn(msg ? `❗ ${msg}` : '❗ Cảnh báo.');

export const loadingToast = () =>
  toast.dark('🦄 Loading...', {
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    progress: undefined,
  });

//#endregion

export const statusCode = {
  reserveConfirmation: 'reserveConfirmation', // chờ xác nhận
  reserveCancel: 'reserveCancel', // hủy đặt phòng
  reserveAccept: 'reserveAccept', // xác nhận đặt phòng
  checkingIn: 'checkingIn', // chờ check in
  notCheckIn: 'notCheckIn', // không check in
  checkedIn: 'checkedIn', // không check in
  checkOut: 'checkOut', // check out
  paid: 'paid', //đã trả tiền
};

export const statusString = {
  reserveConfirmation: 'Chờ Xác Nhận', // chờ xác nhận
  reserveCancel: 'Hủy Đặt Phòng', // hủy đặt phòng
  reserveAccept: 'Đã Xác Nhận Đặt Phòng', // xác nhận đặt phòng
  checkingIn: 'Chờ Check In', // chờ check in
  notCheckIn: 'Không Check In', // không check in
  checkedIn: 'Đã Check In', // không check in
  checkOut: 'Đã Check Out', // check out
  paid: 'Đã Thanh Toán', //đã trả tiền
};
