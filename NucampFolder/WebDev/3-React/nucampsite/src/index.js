import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-social/bootstrap-social.css';
import 'font-awesome/css/font-awesome.css';
import 'typeface-lobster';
import 'typeface-open-sans';

const container = document.getElementById("root");
const root = createRoot(container);
/**
 * The Redux template wraps the Provider component around the App component.
 * so that the App component and all of its child components can access the Redux store
 * via the useSelector and useDispatch hooks.
 *
 * The store is imported into this file--import { store } from './app/store'--and
 * passed to the Provider component as prop {store}, which then makes it available
 * to the App component and all its child components. The store is an object that
 * acts as a container around the state object that contains the global application state.
 * It also has useful methods such as dispatch, which is typically accessed via the 
 * useDispatch hook.
 */
// console.log(store.dispatch);
// console.log(store.getState());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);


