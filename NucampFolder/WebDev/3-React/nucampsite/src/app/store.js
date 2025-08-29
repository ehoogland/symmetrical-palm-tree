import { configureStore } from '@reduxjs/toolkit';
import { campsitesReducer } from '../features/campsites/campsitesSlice';
/**
 * The counter feature, including the counterSlice reducer were included
 * in the Redux template as example code, and were replaced by
 * campsiteReducer.
 
import counterReducer from '../features/counter/counterSlice'; */

/** 
 * You can think of the store as a slightly more complicated example
 * of the useReducer hook
 *
 * The call to the configureStore function is where the Redux store is created.
 * It takes a configuration object as an argument.
 * The configuration object typically includes a reducer property, a function that 
 * determines how the state is updated in response to actions.
 * Each time we add a property to the reducer object, it will create a corresponding
 * property in our state object that is maintained by the corresponding reducer.
 * 
 * The configureStore function automatically sets up the Redux DevTools extension
 * and includes some useful middleware like loggerby default.
 * Replace counterReducer example code with campsiteReducer.
 * Add it to the store by passing it into the configureStore
 * function as a property of the reducer object */
export const store = configureStore({
  reducer: {
    
    campsites: campsitesReducer,
  },
});
