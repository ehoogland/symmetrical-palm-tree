import React from 'react';
import Main from './screens/MainComponent';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './redux/store';

/**
 * 
 * @description The App component serves as the root component of the application, encapsulating the Main component
 * within a NavigationContainer to enable navigation features provided by React Navigation.
 * The NavigationContainer is essential for managing the navigation state and linking the app with the navigation system.
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
            <NavigationContainer>
                <Main />
            </NavigationContainer>
        </Provider>
    );
}
