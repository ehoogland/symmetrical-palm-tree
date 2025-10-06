import { useEffect, useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { CheckBox, Input } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store'; /* For secure storage of user info */

/**
 * LoginScreen component
 * @description The LoginScreen component provides a user interface for logging in.
 * It includes input fields for username and password, a checkbox to remember the user,
 * and a login button. The component uses state to manage the input values and the
 * remember me option. When the login button is pressed, it handles the login logic,
 * including saving or deleting user information from secure storage based on the
 * remember me option.
 * @returns {JSX.Element} A login screen component with 
 * username, password, and remember me checkbox.
 */
const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    
/**
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
 */
const handleLogin = () => {
    console.log('username:', username);
    console.log('password:', password);
    console.log('remember:', remember);

    if (remember) {
        SecureStore.setItemAsync(
            'userinfo',
            JSON.stringify({ 
                username, 
                password })
        ).catch((error) => console.log('Could not save user info', error));
    } else {
        SecureStore.deleteItemAsync('userinfo').catch((error) =>
            console.log('Could not delete user info', error)
        );
    }
};
/**
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
            />
        </View>
    </View>
    );
};
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20
    },
    formIcon: {
        marginRight: 10
    },
    formInput: {
        padding: 10
    },
    formCheckbox: {
        margin: 10,
        backgroundColor: null
    },
    formButton: {
        margin: 40
    }
});
export default LoginScreen;

/**
 * Dev Notes
 * In testing, the app freezes if you do not the dismiss the IDE's dev modal before pressing the home icon.
 *
 */