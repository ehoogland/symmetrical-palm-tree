//import { StatusBar } from 'expo-status-bar';
//import { StyleSheet, Text, View } from 'react-native';
// replace with a single import statement from the MainComponent.js file
import Main from './screens/MainComponent';
import { NavigationContainer } from '@react-navigation/native';
export default function App() {
  return (
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  );
}
