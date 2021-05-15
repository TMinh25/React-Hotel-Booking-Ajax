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

import { loginUser } from './reducers/user';
import { useDispatch } from 'react-redux';
import { isToday } from './utils';

const firebaseConfig = {
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
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const database = firebase.database();

const allRoomRef = database.ref('rooms');
const bookingRef = database.ref('booking');
const staffRef = database.ref('staff');

export function getAllRooms() {
  return new Promise(resolve => {
    allRoomRef.on('value', snapshot => {
      if (snapshot.val() != null) {
        resolve(snapshot.val());
      } else {
        resolve({});
      }
    });
  });
}

export function getSingleRoom(id) {
  console.log(id);
  return new Promise(resolve => {
    allRoomRef.child(id).once('value', snapshot => {
      resolve(snapshot.val());
    });
  });
}

export function getBookingList() {
  return new Promise(resolve => {
    bookingRef.on('value', snapshot => {
      if (snapshot.val() != null) {
        resolve(snapshot.val());
      } else {
        resolve({});
      }
    });
  });
}

export function addBooking() {
  return new Promise((resolve, reject) => {
    bookingRef.once('value', snapshot => {
      snapshot.forEach(childSnapshot => {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        // ...
      });
    });
  });
}

export function getTodayBooking() {
  return new Promise((resolve, reject) => {
    bookingRef.on('value', snapshot => {
      const bookings = snapshot.val();
      const result = {};
      Object.keys(bookings).forEach(bookingKey => {
        const { timestamp } = bookings[bookingKey];
        if (isToday(new Date(timestamp))) {
          result[bookingKey] = bookings[bookingKey];
        }
      });
      console.log(result);
      resolve(result);
    });
  });
}
