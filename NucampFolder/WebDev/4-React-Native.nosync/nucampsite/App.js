import React from 'react';
import Main from './screens/MainComponent';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import Loading from './components/LoadingComponent';

/**
 * 
 * @description The App component serves as the root component of the application, encapsulating the Main component
 * within a NavigationContainer to enable navigation features provided by React Navigation.
 * The NavigationContainer is essential for managing the navigation state and linking the app with the navigation system.
 * @component PersistGate - A component from redux-persist that delays the rendering of the app's UI
 * until the persisted state has been retrieved and saved to Redux. It ensures that the app's state is
 * rehydrated before the UI is displayed, preventing any inconsistencies or flickering.
 * @prop {JSX.Element} loading - A component to display while the persisted state is being restored.
 * In this case, it uses a custom Loading component to indicate that the app is loading.
 * @prop {Object} persistor - The persistor object created using redux-persist, which manages the persistence of the Redux store.
 * @component NavigationContainer - A component from @react-navigation/native that manages the navigation tree and
 * contains the navigation state. It must wrap the whole app to provide navigation functionality.
 * @component Provider - A component from react-redux that makes the Redux store available to any nested components
 * that need to access the Redux store.
 * @component store - The Redux store that holds the entire state of the application.
 * @returns {JSX.Element} The main App component wrapped in a NavigationContainer for navigation functionality.
 */
export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={<Loading />} persistor={persistor}>
                <NavigationContainer>
                    <Main />
                </NavigationContainer>
            </PersistGate>
        </Provider>
    );
}
