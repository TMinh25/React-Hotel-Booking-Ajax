// import axios from 'axios';

// const roomRequest = axios.create({
//   baseURL: 'https://challenge.thef2e.com/api/thef2e2019/stage6/',
//   headers: {
//     Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
// });

// export const apiGetAllRooms = () => roomRequest.get('/rooms');
// export const apiGetSingleRoom = id => roomRequest.get(`/room/${id}`);
// export const apiPostBookingData = (id, data) => roomRequest.post(`/room/${id}`, data);
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

import { isToday, statusCode } from './utils';

export const firebaseConfig = {
  apiKey: 'AIzaSyAbFVifN8hKm_obKS7Rb9PcCLLSus0v-G0',
  authDomain: 'min-bnb.firebaseapp.com',
  databaseURL: 'https://min-bnb-default-rtdb.firebaseio.com',
  projectId: 'min-bnb',
  storageBucket: 'min-bnb.appspot.com',
  messagingSenderId: '464110639154',
  appId: '1:464110639154:web:f66a428adbbee9632f442b',
  measurementId: 'G-GNS482SSP3',
};
// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const database = firebase.database();
export const storage = firebase.storage();

export const allRoomRef = database.ref('rooms');
export const bookingRef = database.ref('bookings');
export const staffRef = database.ref('staff');

// export function getAllRooms() {
//   return new Promise(resolve => {
//     allRoomRef.on('value', snapshot => {
//       if (snapshot.val() != null) {
//         resolve(snapshot.val());
//       } else {
//         resolve({});
//       }
//     });
//   });
// }

// export function getSingleRoom(id) {
//   return new Promise(resolve => {
//     allRoomRef.child(id).once('value', snapshot => {
//       resolve(snapshot.val());
//     });
//   });
// }

// export function addRoom(roomInfo, images) {
//   return new Promise(async (resolve, reject) => {
//     const roomKey = database
//       .ref()
//       .child('rooms')
//       .push().key;
//     const imageUrl = [];
//     for (const [index, image] of images.entries()) {
//       imageUrl.push(
//         await uploadFireStore({ folder: roomKey, path: index, image }),
//       );
//     }
//     roomInfo.imageUrl = imageUrl;
//     const updates = {};
//     updates[roomKey] = roomInfo;
//     database
//       .ref()
//       .child('rooms')
//       .update(updates)
//       .catch(e => reject(e));
//     resolve(true);
//   });
// }

// export function updateRoomInfo(roomID, roomInfo, images) {
//   return new Promise(async (resolve, reject) => {
//     const imageUrl = [];
//     for (const [index, image] of images.entries()) {
//       imageUrl.push(
//         await uploadFireStore({ folder: roomID, path: index, image }),
//       );
//     }
//     const updateInfo = { ...roomInfo };
//     roomInfo.imageUrl = imageUrl;
//     database
//       .ref()
//       .child('rooms')
//       .child(roomID)
//       .update(roomInfo)
//       .catch(e => reject(e));
//     resolve(true);
//   });
// }

// export function removeRoom(roomID) {
//   return allRoomRef.child(roomID).remove();
// }

// export function getBookingList() {
//   return new Promise(resolve => {
//     bookingRef.on('value', snapshot => {
//       if (snapshot.val() != null) {
//         resolve(snapshot.val());
//       } else {
//         resolve({});
//       }
//     });
//   });
// }

// export function addBooking(value) {
//   return new Promise((resolve, reject) => {
//     bookingRef.push(value, err => {
//       // failed to write data
//       err
//         ? reject('failed to write data to firebase: ' + err.message)
//         : resolve('addBooking success!');
//     });
//   });
// }

// export function getSingleBookingData(bookingID) {
//   return new Promise((resolve, reject) => {
//     bookingRef.child(bookingID).on('value', snapshot => {
//       console.log(snapshot.val());
//       resolve(snapshot.val());
//     });
//   });
// }

// export function getTodayConfirmationBooking() {
//   return new Promise((resolve, reject) => {
//     bookingRef.on('value', snapshot => {
//       const bookings = snapshot.val();
//       console.log(bookings);
//       const result = {};
//       Object.keys(bookings).forEach(bookingKey => {
//         const { timestamp } = bookings[bookingKey];
//         // console.log(timestamp);
//         // console.log(isToday(timestamp));
//         if (
//           isToday(timestamp) &&
//           bookings[bookingKey]?.status === statusCode.reserveConfirmation
//         ) {
//           result[bookingKey] = bookings[bookingKey];
//         }
//       });
//       resolve(result);
//     });
//   });
// }

export function getAllBooking(params) {
  return new Promise((resolve, reject) => {
    bookingRef.on(
      'value',
      snapshot => {
        resolve(snapshot.val());
      },
      err => reject(err),
    );
  });
}

export function getReservationBooking() {
  return new Promise((resolve, reject) => {
    const reservationBooking = {};
    getAllBooking()
      .then(allBooking => {
        Object.keys(allBooking).forEach(bookingKey => {
          const { status } = allBooking[bookingKey];
          if (
            status === statusCode.reserveConfirmation ||
            status === statusCode.reserveAccept ||
            status === statusCode.reserveCancel
          ) {
            reservationBooking[bookingKey] = allBooking[bookingKey];
          }
        });
        resolve(reservationBooking);
      })
      .catch(err => reject(err));
  });
}

export function getCheckInAndOutBooking() {
  return new Promise((resolve, reject) => {
    const reservationBooking = {};
    getAllBooking().then(allBooking => {
      Object.keys(allBooking).forEach(bookingKey => {
        const { status } = allBooking[bookingKey];
        if (
          status === statusCode.checkingIn ||
          status === statusCode.notCheckIn ||
          status === statusCode.checkedIn ||
          status === statusCode.checkOut
        ) {
          reservationBooking[bookingKey] = allBooking[bookingKey];
        }
      });
      resolve(reservationBooking);
    });
  });
}

export function getPaidBooking() {
  return new Promise((resolve, reject) => {
    const reservationBooking = {};
    getAllBooking().then(allBooking => {
      Object.keys(allBooking).forEach(bookingKey => {
        const { status } = allBooking[bookingKey];
        if (status === statusCode.paid)
          reservationBooking[bookingKey] = allBooking[bookingKey];
      });
      resolve(reservationBooking);
    });
  });
}

// export function updateBookingStatus({ id, status }) {
//   return bookingRef.child(`${id}/status`).set(status);
// }

// export function removeBooking(bookingID) {
//   return bookingRef.child(bookingID).remove();
// }

// export function uploadFireStore({ folder, path, image }) {
//   return new Promise((resolve, reject) => {
//     storage
//       .ref()
//       .child(`${folder}/${path}`)
//       .put(image)
//       .then(snapshot => {
//         snapshot.ref.getDownloadURL().then(res => {
//           console.log(res);
//           resolve(res);
//         });
//       });
//   });
// }
