import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

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
