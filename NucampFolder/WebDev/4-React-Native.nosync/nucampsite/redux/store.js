import { configureStore } from '@reduxjs/toolkit';
import { campsitesReducer } from '../features/campsites/campsitesSlice';
import { commentsReducer } from '../features/comments/commentsSlice';
import { partnersReducer } from '../features/partners/partnersSlice';
import { promotionsReducer } from '../features/promotions/promotionsSlice';
import { favoritesReducer } from '../features/favorites/favoritesSlice';

/**
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
 * 
 * Note that campsites is the key in the above example's reducer object, and it corresponds to the
 * state.campsites that you would access in your components. This is because configureStore
 * automatically sets up the root reducer to use the keys of the reducer object as the top-level
 * keys in the state object.
 */
export const store = configureStore({
    reducer: {
        campsites: campsitesReducer,
        comments: commentsReducer,
        partners: partnersReducer,
        promotions: promotionsReducer,
        favorites: favoritesReducer
    }
});

/*
Note on reducers:
Compare the .reduce() method in JavaScript, which gets passed an iterator function that contains
two arguments. The first is an accumulator (state) and the second is what you want to add to the
accumulator (action). An iterator function is just a function that takes two arguments: the current
accumulator value and the current element being processed. 

In Redux, a reducer is a pure function that takes the current state and an action as arguments 
and returns a new state based on the action type. Just as the .reduce method accumulates values, 
a Redux reducer accumulates changes to the state over time in response to dispatched actions. */