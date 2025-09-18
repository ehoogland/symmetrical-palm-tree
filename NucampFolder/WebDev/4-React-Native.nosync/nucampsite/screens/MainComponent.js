
import { Platform, View } from 'react-native';
import Constants from 'expo-constants';
import { createStackNavigator } from '@react-navigation/stack';
import CampsiteInfoScreen from './CampsiteInfoScreen';
import DirectoryScreen from './DirectoryScreen';


const DirectoryNavigator = () => {
    const Stack = createStackNavigator();
    return (
        // Directory Navigator
        <Stack.Navigator
            initialRouteName="Directory"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#5637DD',
                },
                headerTintColor: '#fff',
            }}
        >
            {/* 
             * @Stack Navigator
             * @Screen Directory
             * @name name of the route, here "Directory" and "CampsiteInfo"
             * @component DirectoryScreen responsible for rendering the list of campsites
             * @component CampsiteInfoScreen responsible for rendering details of a selected campsite
             * @options option for the screen. In the directory route, the title
             * @options route parameters for CampsiteInfoScreen to access the selected campsite details
             * The parantheses around route allow us to access the route object and get the campsite name
             * for the header title.
             * The inner braces around route indicate that we are embedding JavaScript within JSX.
             * The inner braces around route.params.campsite.name allow us to return an object
             * with the title property set to the campsite name.
             * The outer braces around the entire right side of the options prop indicate that we are
             * embedding a JavaScript expression within JSX.
             */}
            <Stack.Screen
                name="Directory"
                component={DirectoryScreen}
                options={{ title: 'Campsite Directory' }}
            />
            <Stack.Screen
                name="CampsiteInfo"
                component={CampsiteInfoScreen}
                options={({ route }) => ({
                    title: route.params.campsite.name,
                })}
            />
        </Stack.Navigator>
    );
};
/**
 * Main component
 * @Platform imported above gets the OS the app is running on
 * @Constants.statusBarHeight gets the height of the status bar
 * @paddingTop adds padding to the top of the view if the OS is not iOS
 * @DirectoryNavigator renders the directory navigator component

 */

const Main = () => {
    return (
        <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight }}>
            <DirectoryNavigator />
        </View>
    );
};

export default Main;
