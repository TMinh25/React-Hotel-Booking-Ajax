import { createSlice } from '@reduxjs/toolkit';
import { defaultFailCB, defaultSuccessCB } from '../utils';
import { offLoading, onLoading } from './loading';

const rooms = localStorage.getItem('rooms');

const roomsSlice = createSlice({
  name: 'rooms',
  initialState: rooms ? JSON.parse(rooms) : null,
  reducers: {
    setAllRooms(state, action) {
      return { ...state, ...action.payload };
    },
    setCurrentRoom(state, action) {
      return { ...state, currentRoom: action.payload };
    },
  },
});

export const { setAllRooms, setCurrentRoom } = roomsSlice.actions;
export default roomsSlice.reducer;

export function fetchAllRooms() {
  return (dispatch, getState, getFirebase) => {
    dispatch(onLoading());
    return getFirebase()
      .ref('rooms')
      .once(
        'value',
        snap => {
          const data = snap.val();
          dispatch(setAllRooms(data));
        },
        e => defaultFailCB(e.message),
      )
      .then(() => dispatch(offLoading()));
  };
}

export function getSingleRoom(id) {
  return (dispatch, getState, getFirebase) => {
    dispatch(onLoading());
    return getFirebase()
      .ref('rooms')
      .child(id)
      .once(
        'value',
        snap => {
          const data = snap.val();
          dispatch(setCurrentRoom(data));
        },
        e => defaultFailCB(e.message),
      )
      .then(() => dispatch(offLoading()));
  };
}

export function addRoom(roomInfo, images) {
  return async (dispatch, getState, getFirebase) => {
    dispatch(onLoading());
    const info = { ...roomInfo };
    const database = getFirebase();
    const roomKey = database
      .ref()
      .child('rooms')
      .push().key;
    const imageUrl = [];
    for (const [index, image] of images.entries()) {
      imageUrl.push(
        await dispatch(
          uploadFireStore({ folder: roomKey, path: index, image }),
        ),
      );
    }
    info.imageUrl = imageUrl;
    database
      .ref()
      .child('rooms')
      .update(info)
      .catch(e => (e ? defaultFailCB() : defaultSuccessCB()));
    dispatch(fetchAllRooms());
    dispatch(offLoading());
  };
}

export function updateRoomInfo(roomID, roomInfo, images) {
  return async (dispatch, getState, getFirebase) => {
    dispatch(onLoading());
    const updateInfo = { ...roomInfo };
    const database = getFirebase();
    if (!images.every(image => typeof image === 'string')) {
      const imageUrl = [];
      for (const [index, image] of images.entries()) {
        const url = await dispatch(
          uploadFireStore({
            folder: roomID,
            path: index,
            image,
          }),
        );
        imageUrl.push(url);
      }
      updateInfo.imageUrl = imageUrl;
    }
    database
      .ref('rooms')
      .child(roomID)
      .update(updateInfo)
      .then(() => defaultSuccessCB())
      .catch(e => defaultFailCB(e.message));
    dispatch(fetchAllRooms());
    dispatch(offLoading());
  };
}

export function removeRoom(roomID) {
  return async (dispatch, getState, getFirebase) => {
    dispatch(onLoading());
    getFirebase()
      .ref('rooms')
      .child(roomID)
      .remove()
      .then(() => defaultSuccessCB())
      .catch(e => defaultFailCB(e.message))
      .finally(() => {
        dispatch(fetchAllRooms());
        dispatch(offLoading());
      });
  };
}

export function uploadFireStore({ folder, path, image }) {
  return (dispatch, getState, getFirebase) => {
    return new Promise((resolve, reject) => {
      getFirebase()
        .storage()
        .ref()
        .child(`${folder}/${path}`)
        .put(image)
        .then(snapshot => {
          snapshot.ref.getDownloadURL().then(res => {
            resolve(res);
          });
        });
    });
  };
}
