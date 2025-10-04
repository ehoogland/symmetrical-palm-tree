import { configureStore } from '@reduxjs/toolkit';
import { campsitesReducer } from '../features/campsites/campsitesSlice';
import { commentsReducer } from '../features/comments/commentsSlice';
import { partnersReducer } from '../features/partners/partnersSlice';
import { promotionsReducer } from '../features/promotions/promotionsSlice';
import { favoritesReducer } from '../features/favorites/favoritesSlice';
import { persistStore, persistCombineReducers,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const config = {
    key: 'root',
    storage: AsyncStorage,
    debug: true //to get useful logging
};

export const store = configureStore({
    reducer: persistCombineReducers(config, {
        campsites: campsitesReducer,
        comments: commentsReducer,
        partners: partnersReducer,
        promotions: promotionsReducer,
        favorites: favoritesReducer
}),
    /** middleware needed to avoid non-serializable value error. A non‑serializable value is any object
      * that cannot be reliably converted to/from a plain JSON representation (lossless string form).
      * JSON.stringify either fails, returns something lossy, or loses behavior/identity. 
      */
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH, 
                    REHYDRATE, 
                    PAUSE, 
                    PERSIST, 
                    PURGE, 
                    REGISTER
                ]
            }
        })
});
export const persistor = persistStore(store);

/** In Redux, a reducer is a pure function that takes the current state and an action as arguments
 * and returns a new state based on the action type. Just as the .reduce method accumulates values,
 * a Redux reducer accumulates changes to the state over time in response to dispatched actions.
 * @description The Redux store is configured using Redux Toolkit's configureStore function.
 * It combines multiple reducers into a single root reducer, which manages different slices 
 * of the application state. Each slice corresponds to a specific feature of the application, 
 * such as campsites, comments, partners, promotions, and favorites.
 * @export @const [The] store is then exported for use throughout the application, allowing 
 * components to access and interact with the global state.
 * @component configureStore - A function from Redux Toolkit that simplifies the store setup 
 * process by automaticallycombining reducers, adding middleware, and enabling Redux DevTools.
 * @component reducer - An object that maps slice names to their respective reducer functions.
 * @returns {Object} The configured Redux store.
 * @example
 * // Example of using the store in a component
 * import { useSelector } from 'react-redux';
 * const MyComponent = () => {
 *     const campsites = useSelector((state) => state.campsites);
 *     return <div>{campsites.length} campsites available</div>;
 * };
 * @see https://redux-toolkit.js.org/api/configureStore
 * @see https://react-redux.js.org/api/hooks#useselector
 * @const reducer - An object that maps slice names to their respective reducer functions.
 * @example
 * const store = configureStore({
 *     reducer: {
 *         campsites: campsitesReducer,
 *         comments: commentsReducer,
 *         partners: partnersReducer,
 *         promotions: promotionsReducer,
 *         favorites: favoritesReducer
 *     }
 * });          
 * 
 * @const persistor - The persistor is an object that is used to manage the persistence of the Redux store.
 * It is created using the persistStore function from redux-persist and is responsible for rehydrating
 * the store with persisted state when the application starts.
 * @example
 * import { PersistGate } from 'redux-persist/integration/react';
 * const App = () => {
 *     return (
 *         <PersistGate loading={null} persistor={persistor}>
 *             <MyApp />
 *         </PersistGate>
 *     );
 * };
 * @see https://redux-persist.js.org/
 * @see https://react-redux.js.org/api/hooks#useselector
 */


    
  