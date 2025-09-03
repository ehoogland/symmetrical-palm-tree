import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { campsitesReducer } from '../features/campsites/campsitesSlice';
import { commentsReducer } from '../features/Comments/commentsSlice'; 
import { partnersReducer } from '../features/partners/partnersSlice';
import { promotionsReducer } from '../features/display/promotions/promotionsSlice';
// update store.js to import userReducer from userSlice
import { userReducer } from '../features/user/userSlice';

/**
 * The Redux store for the application
 * 
 * The call to the configureStore function is where the Redux store is created.
 * It takes a configuration object as an argument.
 * The configuration object typically includes a reducer property, a function that
 * determines how the state is updated in response to actions.
 * Each time we add a property to the reducer object, it will create a corresponding
 * property in our state object that is maintained by the corresponding reducer.
 * 
 * The configureStore function automatically sets up the Redux DevTools extension
 * and includes some useful middleware like logger by default.
 * 
 * @param {Object} config - The configuration object for the store.
 * @var {Object} store
 * @property @add {Function} campsitesReducer
 * @property @add {Function} commentsReducer
 * @property @add {Function} partnersReducer
 * @property @add {Function} promotionsReducer
 * @returns {Object} - The Redux store object
 * @exports {Function} campsitesReducer - The reducer function for the campsites slice.
 * 
 * Add it to the store by passing it into the configureStore
 * function as a property of the reducer object
 *
 * Added userReducer to the store to the set of reducers that are passed to
 * configureStore with the user slice. Key: user
 *
 * TODO: No reducers have been defined for the promotions slice yet.
 */
export const store = configureStore({
  reducer: {  
    campsites: campsitesReducer,
    comments: commentsReducer,
    partners: partnersReducer,
    promotions: promotionsReducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) => {
    const defaultMiddleware = getDefaultMiddleware();
    // Only include redux-logger in non-test environments to avoid noisy test output
    if (process.env.NODE_ENV === 'test') {
      return defaultMiddleware;
    }
    return defaultMiddleware.concat(logger);
  }
});
