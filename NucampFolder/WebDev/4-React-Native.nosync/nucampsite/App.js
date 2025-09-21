import React from 'react';
import Main from './screens/MainComponent';
import { NavigationContainer } from '@react-navigation/native';
/**
 * 
 * @description The App component serves as the root component of the application, encapsulating the Main component
 * within a NavigationContainer to enable navigation features provided by React Navigation.
 * The NavigationContainer is essential for managing the navigation state and linking the app with the navigation system.
 * @component NavigationContainer - A component from @react-navigation/native that manages the navigation tree and
 * contains the navigation state. It must wrap the whole app to provide navigation functionality.
 * @returns {JSX.Element} The main App component wrapped in a NavigationContainer for navigation functionality.
 */
export default function App() {
    return (
        <NavigationContainer>
            <Main />
        </NavigationContainer>
    );
}
