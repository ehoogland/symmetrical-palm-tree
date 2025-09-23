import { Platform, View } from "react-native";
import Constants from "expo-constants";
import CampsiteInfoScreen from "./CampsiteInfoScreen";
import DirectoryScreen from "./DirectoryScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./HomeScreen";
import AboutScreen from "./AboutScreen";    
import ContactScreen from "./ContactScreen";
import { useDispatch } from 'react-redux';
import { useEffect } from "react";
import { fetchCampsites } from "../features/campsites/campsitesSlice";
import { fetchPartners } from "../features/partners/partnersSlice";
import { fetchPromotions } from "../features/promotions/promotionsSlice";
import { fetchComments } from "../features/comments/commentsSlice";

const Drawer = createDrawerNavigator();

const screenOptions = {
  headerTintColor: "#fff",
  headerStyle: { backgroundColor: "#5637DD" },
};
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
      <Stack.Screen
        name="About"
        component={AboutScreen}
      />
    </Stack.Navigator>
  );
};

const ContactNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Contact" screenOptions={screenOptions}>
      <Stack.Screen
        name="Contact"
        component={ContactScreen}
        options={{ title: 'Contact Us' }}
      />
    </Stack.Navigator>
  );
};
/** 
 * The Main component
 * @const Main is a functional component that serves as the main entry point for the app's navigation structure.
 * It sets up a Drawer Navigator that contains multiple Stack Navigators for different sections of the app,
 * including Home, Directory, About, and Contact screens. Its value is an anonymous arrow function that will
 * @return a JSX.Element representing the navigation structure of the app.
 * @const dispatch is bound to the value of the call to the
 * @hook useDispatch() hook, giving it a reference to the dispatch function from the Redux store. 
 * This allows the component to dispatch actions to the store.
 *
 * @hook The useEffect hook is used to hook into the component lifecycle and perform side effects,
 * such as fetching data using our thunk action creators when the component mounts.
 * The useEffect hook is used to dispatch actions to fetch data when the component mounts.
 * Action creators are functions that when called return an action [object].
 * mounts. Dispatch is included in the dependency array to avoid ESLint warnings.
 * In this case, dispatch is stable and won't change, so in terms of its effect, this is
 * identical to having an empty dependency array for the purpose of ensuring that the effect
 * runs only once when the component mounts. Even though fetchCampsites is a thunk action
 * creator we can still use it like this when dispatching it because Redux Thunk middleware
 * allows us to dispatch functions in addition to action objects. Notice that in the body
 * we are making a call to dispatch and passing in the thunk action creator fetchCampsites.
 * This will cause the thunk action creator to be executed, which in turn will perform the
 * asynchronous operation of fetching the campsites data and then dispatching the appropriate
 * actions based on the result of that operation. It will be executed because () is used
 * after fetchCampsites(). The same applies to fetchPromotions(), fetchPartners(), and fetchComments().
 *
 * When the application starts up and the Main component is rendered for the first time,
 * the useEffect hook will run and all of our data will be fetched and loaded into the Redux store
 * making it available for all of our components to access and make changes to
 * data needed for the app to function properly, provided that the components are connected
 * to the Redux store.
 */
const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCampsites());
    dispatch(fetchPromotions());
    dispatch(fetchPartners());
    dispatch(fetchComments());
  }, [dispatch]);
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

/**
 * @function Main functional component
 *  
 * @description The Main component sets up the overall navigation structure of the app using
 * React Navigation.It includes a Drawer Navigator that contains two Stack Navigators
 * for the Home screen and Directory screen respectively. The Stack Navigators allow for
 * navigation between screens in a stack-like and linear manner. Drawer Navigator provides
 * a side menu for navigating between the Home and Directory sections of the app. Each section
 * is managed by its own Stack Navigator,allowing for linear navigation within each section.
 * The Main component also ensures that the app's content is displayed correctly on different
 * platforms by adding appropriate padding to account for the status bar height on Android devices.
 * @returns {JSX.Element} The Main component containing the Drawer Navigator. 
 * 
 * @function function components HomeNavigator and DirectoryNavigator
 * @returns {JSX.Element} The Home screen wrapped in a Stack Navigator.
 * @returns {JSX.Element} The Directory screen
 * @returns {JSX.Element} The Campsite Info screen
 * @returns {JSX.Element} The Contact screen wrapped in a Stack Navigator.
 * @returns {JSX.Element} The About screen
 * wrapped in a Stack Navigator.
 * @description
 * In React Navigation, a Stack Navigator remembers the order in which you accessed
 * the screens within its stack, and if you use the provided back arrow or a hardware
 * back button, pops the current screen off the stack and returns you to the previous one.
 * @Stack.Screen - A component that represents a single screen in the stack navigator.
 */
