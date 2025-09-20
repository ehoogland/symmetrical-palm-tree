import { Platform, View } from "react-native";
import Constants from "expo-constants";
import CampsiteInfoScreen from "./CampsiteInfoScreen";
import DirectoryScreen from "./DirectoryScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./HomeScreen";
import AboutScreen from "./AboutScreen";    
import ContactScreen from "./ContactScreen";
/**
 * @module MainComponent
 * @requires modules @react-navigation/stack @react-navigation/drawer expo-constants
 * @requires modules: react module:react-native ./CampsiteInfoScreen ./DirectoryScreen ./HomeScreen
 * @description This is the main component that sets up the navigation structure of the app
 * using React Navigation. It includes a Drawer Navigator that contains two Stack Navigators
 * for the Home screen and Directory screen respectively. The Stack Navigators allow for
 * navigation between screens in a stack-like and linear manner. Drawer Navigator provides
 * a side menu for easy access to different sections of the app.
*/
const Drawer = createDrawerNavigator();

const screenOptions = {
    headerTintColor: "#fff",
    headerStyle: { backgroundColor: "#5637DD" },
};
/**
 * @function function components HomeNavigator and DirectoryNavigator
 * @returns {JSX.Element} The Home screen wrapped in a Stack Navigator.
 * @returns {JSX.Element} The Directory screen and Campsite Info screen 
 * wrapped in a Stack Navigator.
 * @description
 * In React Navigation, a Stack Navigator remembers the order in which you accessed
 * the screens within its stack, and if you use the provided back arrow or a hardware
 * back button, pops the current screen off the stack and returns you to the previous one.
 * @Stack.Screen - A component that represents a single screen in the stack navigator.
 */
const HomeNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
    </Stack.Navigator>
  );
};

const DirectoryNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Directory" screenOptions={screenOptions}>
      <Stack.Screen
        name="Directory"
        component={DirectoryScreen}
        options={{ title: "Campsite Directory" }}
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

const AboutNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="About" screenOptions={screenOptions}>
      <Stack.Screen name="About" component={AboutScreen} />
    </Stack.Navigator>
  );
};

const ContactNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Contact" screenOptions={screenOptions}>
      <Stack.Screen name="Contact" component={ContactScreen} options={{ title: 'Contact Us' }} />
    </Stack.Navigator>
  );
};
/**
 * @component Main component
 * @description The Main component sets up the overall navigation structure of the app.
 * It uses a Drawer Navigator to provide a side menu for navigating between the Home
 * and Directory sections of the app. Each section is managed by its own Stack Navigator,
 * allowing for linear navigation within each section. The Main component also ensures
 * that the app's content is displayed correctly on different platforms by adding
 * appropriate padding to account for the status bar height on Android devices.
 * @returns {JSX.Element} The Main component containing the Drawer Navigator. 
 */
const Main = () => {
  return (
    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
      }}
    >
      <Drawer.Navigator
        initialRouteName="HomeNav"
        screenOptions={{
          drawerStyle: { backgroundColor: "#CEC8FF" },
          headerShown: true,
        }}
      >
        <Drawer.Screen
          name="HomeNav"
          component={HomeNavigator}
          options={{
            title: "Home",
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="DirectoryNav"
          component={DirectoryNavigator}
          options={{
            title: "Campsite Directory",
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="AboutNav"
          component={AboutNavigator}
          options={{ title: "About Us", headerShown: false }}
        />
        <Drawer.Screen
          name="ContactNav"
          component={ContactNavigator}
          options={{ title: "Contact Us", headerShown: false }}
        />
      </Drawer.Navigator>
    </View>
  );
};

export default Main;

