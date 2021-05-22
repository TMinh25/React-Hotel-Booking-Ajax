import { compose, createStore, applyMiddleware } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import { getFirebase } from 'react-redux-firebase';
import thunk from 'redux-thunk';

// Chrome Redux Devtools extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [thunk.withExtraArgument(getFirebase)];

export default createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(...middlewares)),
);

// @redux/toolkit configureStore

// configureStore({
//   reducer: rootReducer,
//   preloadedState: {},
//   devTools: true,
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [
//           // just ignore every redux-firebase and react-redux-firebase action type
//           ...Object.keys(rrfActionTypes).map(
//             type => `@@reactReduxFirebase/${type}`,
//           ),
//         ],
//         ignoredPaths: ['firebase', 'firestore'],
//       },
//       thunk: {
//         extraArgument: {
//           getFirebase,
//         },
//       },
//     }),
// });
