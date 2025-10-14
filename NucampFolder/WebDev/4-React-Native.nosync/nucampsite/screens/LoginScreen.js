import { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { CheckBox, Input, Button, Icon } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { baseUrl } from '../shared/baseUrl';
import logo from '../assets/images/logo.png';
// ImagePicker API to access the device camera or photo library
import * as ImagePicker from 'expo-image-picker';
// ImageManipulator API to manipulate images (resize, rotate, etc.)
import * as ImageManipulator from 'expo-image-manipulator';
// using both ImagePicker and ImageManipulator in RegisterTab component for image capture and processing
// for learning purposes only

const LoginTab = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    const handleLogin = () => {
        console.log('username:', username);
        console.log('password:', password);
        console.log('remember:', remember);
        if (remember) {
            SecureStore.setItemAsync(
                'userinfo',
                JSON.stringify({
                    username,
                    password
                })
            ).catch((error) => console.log('Could not save user info', error));
        } else {
            SecureStore.deleteItemAsync('userinfo').catch((error) =>
                console.log('Could not delete user info', error)
            );
        }
    };

    useEffect(() => {
        SecureStore.getItemAsync('userinfo').then((userdata) => {
            const userinfo = JSON.parse(userdata);
            if (userinfo) {
                setUsername(userinfo.username);
                setPassword(userinfo.password);
                setRemember(true);
            }
        });
    }, []);

    return (
        <View style={styles.container}>
            <Input
                placeholder='Username'
                leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                onChangeText={(text) => setUsername(text)}
                value={username}
                containerStyle={styles.formInput}
                leftIconContainerStyle={styles.formIcon}
            />
            <Input
                placeholder='Password'
                leftIcon={{ type: 'font-awesome', name: 'key' }}
                onChangeText={(text) => setPassword(text)}
                value={password}
                containerStyle={styles.formInput}
                leftIconContainerStyle={styles.formIcon}
            />
            <CheckBox
                title='Remember Me'
                center
                checked={remember}
                onPress={() => setRemember(!remember)}
                containerStyle={styles.formCheckbox}
            />
            <View style={styles.formButton}>
                <Button
                    onPress={() => handleLogin()}
                    title='Login'
                    color='#5637DD'
                    icon={
                        <Icon
                            name='sign-in'
                            type='font-awesome'
                            color='#fff'
                            iconStyle={{ marginRight: 10 }}
                        />
                    }
                    buttonStyle={{ backgroundColor: '#5637DD' }}
                />
            </View>
            <View style={styles.formButton}>
                <Button
                    onPress={() => navigation.navigate('Register')}
                    title='Register'
                    type='clear'
                    icon={
                        <Icon
                            name='user-plus'
                            type='font-awesome'
                            color='blue'
                            iconStyle={{ marginRight: 10 }}
                        />
                    }
                    titleStyle={{ color: 'blue' }}
                />
            </View>
        </View>
    );
};

const RegisterTab = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [remember, setRemember] = useState(false);
    const [imageUrl, setImageUrl] = useState(baseUrl + 'images/logo.png');

    const handleRegister = () => {
        const userInfo = {
            username,
            password,
            firstName,
            lastName,
            email,
            remember
        };
        console.log(JSON.stringify(userInfo));
        if (remember) {
            SecureStore.setItemAsync(
                'userinfo',
                JSON.stringify({
                    username,
                    password
                })
            ).catch((error) => console.log('Could not save user info', error));
        } else {
            SecureStore.deleteItemAsync('userinfo').catch((error) =>
                console.log('Could not delete user info', error)
            );
        }
    };
    /**
     * Get an image from the device's camera
     * @description The getImageFromCamera function requests permission
     * to access the device's camera.
     * @const {Object} cameraPermission - The camera permission status.
     * @method requestCameraPermissionsAsync - Requests permission to access the
     * camera.
     * @method launchCameraAsync - Launches the camera for the user to take a picture.
     * @property {boolean} allowsEditing - Allows the user to edit the image before taking it.
     * @property {Array} aspect - The aspect ratio to maintain when editing the image.
     * @returns {Promise<void>}
     */
    const getImageFromCamera = async () => {
        const cameraPermission =
            await ImagePicker.requestCameraPermissionsAsync();

        if (cameraPermission.status === 'granted') {
            const capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [1, 1]
            });
            if (capturedImage.assets) {
                console.log(capturedImage);
                // setImageUrl(capturedImage.assets[0].uri); -use with image picker only;
                // call processImage function to resize and convert to PNG
                processImage(capturedImage.assets[0].uri);
            }
        }
    };
    /**
     * Get an image from the device's media library
     * @description The getImageFromGallery function requests permission 
     * to access the device's media library.
     * @const {Object} mediaLibraryPermission - The media library permission status.
     * @method requestMediaLibraryPermissionsAsync - Requests permission to access the 
     * media library.
     * @method launchImageLibraryAsync - Launches the image library for the user to 
     * select an image.
     * @property {boolean} allowsEditing - Allows the user to edit the image before selection.
     * @property {Array} aspect - The aspect ratio to maintain when editing the image.
     * @returns {Promise<void>}
     * 
     */
    const getImageFromGallery = async () => {
        const mediaLibraryPermission = await ImagePicker
            .requestMediaLibraryPermissionsAsync();
        if (mediaLibraryPermission.status === 'granted') {
            const capturedImage = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [1, 1]
            });
            if (capturedImage.assets) {
                console.log(capturedImage);
                processImage(capturedImage.assets[0].uri);
            }
        }
    };

    /**
     * Process the image using ImageManipulator
     * @param {string} imgUri - The URI of the image to process
     * @returns {Promise<string>} - The URI of the processed image
     * @method manipulate - A method from the expo-image-manipulator library used
     * to perform image manipulations. Normally replaces 
     * @method manipulateAsync to allow for more options, but for testing purposes
     * I use the simpler manipulate method despite its limitations and the fact that
     * it is deprecated.
     * @note The manipulate method is deprecated and may be removed in future releases.
     * It is recommended to use manipulateAsync for new projects to ensure compatibility
     * with future versions of the library.
     */
    const processImage = async (imgUri) => {
        // create a resized PNG image (width 400px, keep aspect ratio)
        const processedImage = await ImageManipulator.manipulateAsync(
            imgUri,
            [{ resize: { width: 400 } }],
            { format: ImageManipulator.SaveFormat.PNG }
        );

        // Log full processed image object for debugging
        console.log('processedImage', processedImage);

        // Update state with new image uri
        setImageUrl(processedImage.uri);

        return processedImage.uri;
    };
    

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: imageUrl }}
                        loadingIndicatorSource={logo}
                        style={styles.image}
                    />
                    <Button title='Camera' onPress={getImageFromCamera} />
                    <Button title='Gallery' onPress={getImageFromGallery} type='clear' />
                </View>
                <Input
                    placeholder='Username'
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(text) => setUsername(text)}
                    value={username}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.formIcon}
                />
                <Input
                    placeholder='Password'
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.formIcon}
                />
                <Input
                    placeholder='First Name'
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(text) => setFirstName(text)}
                    value={firstName}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.formIcon}
                />
                <Input
                    placeholder='Last Name'
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(text) => setLastName(text)}
                    value={lastName}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.formIcon}
                />
                <Input
                    placeholder='Email'
                    leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.formIcon}
                />
                <CheckBox
                    title='Remember Me'
                    center
                    checked={remember}
                    onPress={() => setRemember(!remember)}
                    containerStyle={styles.formCheckbox}
                />
                <View style={styles.formButton}>
                    <Button
                        onPress={() => handleRegister()}
                        title='Register'
                        color='#5637DD'
                        icon={
                            <Icon
                                name='user-plus'
                                type='font-awesome'
                                color='#fff'
                                iconStyle={{ marginRight: 10 }}
                            />
                        }
                        buttonStyle={{ backgroundColor: '#5637DD' }}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

const Tab = createBottomTabNavigator();

const LoginScreen = () => {
    const screenOptions = {
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#808080',
        tabBarActiveBackgroundColor: '#5637DD',
        tabBarInactiveBackgroundColor: '#CEC8FF',
        tabBarLabelStyle: { fontSize: 16 },
        tabBarStyle: [{ display: 'flex' }, null]
    };

    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen
                name='Login'
                component={LoginTab}
                options={{
                    tabBarIcon: (props) => {
                        return (
                            <Icon
                                name='sign-in'
                                type='font-awesome'
                                color={props.color}
                            />
                        );
                    }
                }}
            />
            <Tab.Screen
                name='Register'
                component={RegisterTab}
                options={{
                    tabBarIcon: (props) => {
                        return (
                            <Icon
                                name='user-plus'
                                type='font-awesome'
                                color={props.color}
                            />
                        );
                    }
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 10
    },
    formIcon: {
        marginRight: 10
    },
    formInput: {
        padding: 8,
        height: 60
    },
    formCheckbox: {
        margin: 8,
        backgroundColor: null
    },
    formButton: {
        margin: 20,
        marginRight: 40,
        marginLeft: 40
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        margin: 10
    },
    image: {
        width: 60,
        height: 60
    }
});

export default LoginScreen;
/**
 * @note LoginScreen Component Notes - there is some redundancy in the comments, but this can
 * help to ensure understanding. Topics are also not in any particular order at this juncture.
 * @function LoginScreen - A functional component that sets up a bottom tab navigator with two tabs: Login and Register.
 * @description The LoginScreen component serves as the main entry point for user authentication,
 * providing a bottom tab navigator with two tabs: Login and Register. Each tab is associated
 * with its respective component (LoginTab and RegisterTab) and includes an icon from 
 * react-native-elements.
 * The tabBarOptions object defines the appearance of the tab bar, including active and
 * inactive background colors, text colors, and label styles.
 * @component <LoginScreen /> - The main component that renders the bottom tab navigator.
 * The LoginScreen component utilizes the createBottomTabNavigator function from
 * @react-navigation/bottom-tabs to create a tab navigator. Each tab is defined using the
 * Tab.Screen component, specifying the name, component, and options such as the tabBarIcon.
 * The Icon component from react-native-elements is used to display icons for each tab,
 * enhancing the user interface and providing visual cues for navigation.
 * @prop {Object} tabBarOptions - An object defining the appearance of the tab bar.
 * @property {string} activeBackgroundColor - The background color of the active tab.
 * @property {string} inactiveBackgroundColor - The background color of inactive tabs.
 * @property {string} activeTintColor - The text color of the active tab.
 * @property {string} inactiveTintColor - The text color of inactive tabs.
 * @property {Object} labelStyle - An object defining the style of the tab labels, including font size.
 * @component Tab.Navigator - A component that provides a tab-based navigation interface.
 * @component Tab.Screen - A component that defines a single tab within the Tab.Navigator.
 * @prop {string} name - The name of the tab, used for navigation and display.
 * @prop {JSX.Element} component - The component to be rendered when the tab is active (LoginTab or RegisterTab).
 * @prop {Object} options - An object defining additional options for the tab, such as the tabBarIcon.
 * @component Icon - A component from react-native-elements used to display icons.
 * @prop {string} name - The name of the icon to be displayed (e.g., 'sign-in', 'user-plus').
 * @prop {string} type - The type of icon set to use (e.g., 'font-awesome').
 * @prop {string} color - The color of the icon, dynamically set based on the active/inactive state of the tab.
 * @returns {JSX.Element} The LoginScreen component rendering a bottom tab navigator
 * with two tabs: Login and Register. Each tab is associated with its respective component
 * (LoginTab and RegisterTab) and includes an icon from react-native-elements.
 * The tabBarOptions object defines the appearance of the tab bar, including active and
 * inactive background colors, text colors, and label styles.
 * The LoginScreen component serves as the main entry point for user authentication,
 * allowing users to switch between logging in and registering for a new account.
 * @see https://reactnavigation.org/docs/bottom-tab-navigator/
 * @see https://reactnativeelements.com/docs/icon/
 * @function LoginTab - A functional component that renders the login form.
 * @description The LoginTab component provides a user interface for logging in.
 * It includes input fields for username and password, a checkbox to remember the user,
 * and a login button. The component uses state to manage the input values and the
 * remember me option. When the login button is pressed, it handles the login logic,
 * including saving or deleting user information from secure storage based on the
 * remember me option.
* @function setUsername - A function to update the username state variable.
 * @function setPassword - A function to update the password state variable.
 * @function setRemember - A function to update the remember state variable.
 * @component Input - A component from react-native-elements used for text input fields.
 * @prop {string} placeholder - The placeholder text displayed in the input field.
 * @prop {Object} leftIcon - An object defining the icon displayed on the left side of the input field.
 * @prop {function} onChangeText - A callback function that is called when the text in the input field changes.
 * @prop {string} value - The current value of the input field, bound to the corresponding state variable.
 * @prop {Object} containerStyle - An object defining custom styles for the input field container.
 * @prop {Object} leftIconContainerStyle - An object defining custom styles for the left icon container.
 * @component CheckBox - A component from react-native-elements used for rendering a checkbox.
 * @prop {string} title - The title text displayed next to the checkbox.
 * @prop {boolean} center - If true, the checkbox and title will be centered.
 * @prop {boolean} checked - A boolean indicating whether the checkbox is checked or not, bound to the remember state variable.
 * @prop {function} onPress - A callback function that is called when the checkbox is pressed, toggling the remember state variable.
 * @prop {Object} containerStyle - An object defining custom styles for the checkbox container.
 * @component Button - A component from react-native-elements used for rendering buttons.
 * @prop {function} onPress - A callback function that is called when the button is pressed, triggering the handleLogin function.
 * @prop {string} title - The text displayed on the button.
 * @prop {string} color - The color of the button text (for Android).
 * @prop {JSX.Element} icon - An icon component displayed on the button, enhancing its visual appearance.
 * @prop {Object} buttonStyle - An object defining custom styles for the button.
 * @function handleLogin - Event handler function that handles the login process when the user 
 * presses the login button. It logs the username, password, and remember state to the console.
 * If the remember checkbox is checked, it saves the username and password to secure storage.
 * If the remember checkbox is unchecked, it deletes any stored user information from secure storage.
 * @param username - A state variable that holds the username input value.
 * @param password - A state variable that holds the password input value.
 * @param remember - A boolean state variable indicating whether the user wants to remember their login info.
 * @param {Object} SecureStore - An object from the expo-secure-store library that provides methods
 * for securely storing key-value pairs on the device.
 * @method SecureStore.setItemAsync - A method to save a key-value pair to secure storage asynchronously.
 * @method SecureStore.deleteItemAsync - A method to delete a key-value pair from secure storage asynchronously.
 * @note SecureStore is used to securely store sensitive information like user credentials.
 * It ensures that the data is encrypted and protected on the device.
 * @see https://reactnative.dev/docs/handling-text-input                    
 * @see https://docs.expo.dev/versions/latest/sdk/securestore/
 * @function RegisterTab - A functional component that serves as a placeholder for the registration form.
 * @description The RegisterTab component is intended to provide a user interface for registering a new account.
 * Currently, it returns an empty ScrollView, indicating that the registration form is yet to be implemented.
 * @param {Object} navigation - The navigation prop provided by React Navigation.
 * @returns {JSX.Element} An empty ScrollView component, serving as a placeholder for future registration form implementation.
 * @function LoginScreen - A functional component that sets up a bottom tab navigator with two tabs: Login and Register.
 * @description The LoginScreen component serves as the main entry point for user authentication,
 * providing a bottom tab navigator with two tabs: Login and Register. Each tab is associated
 * with its respective component (LoginTab and RegisterTab) and includes an icon from 
 * react-native-elements.
 * The tabBarOptions object defines the appearance of the tab bar, including active and
 * inactive background colors, text colors, and label styles.
 * @component Tab.Navigator - A component that provides a tab-based navigation interface.
 * @function useEffect - React hook that runs after the component mounts.           
 * It retrieves user information from secure storage and updates the state
 * with the retrieved username and password if available. If user information
 * is found, it also sets the remember state to true.
 * This ensures that if the user had previously chosen to remember their login
 * credentials, they will be automatically populated in the input fields.
 * The empty dependency array [] ensures that this effect runs only once 
 * when the component mounts.
 * @see https://reactjs.org/docs/hooks-effect.html
 * @see https://docs.expo.dev/versions/latest/sdk/securestore/
 * @note SecureStore.getItemAsync returns a promise that resolves to the stored value,
 * or null if the item does not exist. Hence, we use .then to handle the resolved value.
 */
