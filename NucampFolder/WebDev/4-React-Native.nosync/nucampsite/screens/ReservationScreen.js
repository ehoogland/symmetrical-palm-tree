import { useState } from 'react';
import { Text,
    View, 
    ScrollView, 
    StyleSheet, 
    Switch, 
    Button, 
    Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Animatable from 'react-native-animatable';
import * as Notifications from 'expo-notifications';

const ReservationScreen = () => {
    // local state variables for the reservation form inputs
    const [campers, setCampers] = useState(1); 
    const [hikeIn, setHikeIn] = useState(false);
    const [date, setDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    
    /** Handles date change event from the DateTimePicker component
     * @function onDateChange
     * @param {Object} event - The event object containing information about the date change.
     * @param {Date} selectedDate - The date selected by the user from the DateTimePicker.
     * @description This function is called when the user selects a date from the DateTimePicker
     * component. It updates the local state variable 'date' with the newly selected date and
     * manages the visibility of the DateTimePicker based on the platform (iOS or Android).
     * The function first checks if a new date has been selected; if not, it retains the current date.
     * It then updates the 'date' state variable with the selected date. For iOS, the DateTimePicker 
     * remains visible after a date is selected, allowing users to make further changes if needed.
     * For Android, the DateTimePicker is hidden after a date is selected, as it typically appears
     * as a modal dialog. This function ensures that the date selection process is intuitive and 
     * platform-appropriate, enhancing the user experience when selecting a reservation date.
     * @returns {void} This function does not return any value.
    */
    const onDateChange = (event, selectedDate) => {
       const currentDate = selectedDate || date;
       setShowCalendar(Platform.OS === 'ios');
       setDate(currentDate);
    };
    /**
     * @function handleReservation
     * @description This function is called when the user confirms their reservation. It displays an alert
     * with the reservation details, including the number of campers, hike-in option, and selected date.
     * The alert provides options to either cancel the reservation (resetting the form) or proceed with the
     * reservation (also resetting the form). Additionally, the function triggers a local notification to
     * inform the user that their reservation search has been initiated.
     * @const message - A formatted string containing the reservation details.
     * @description This string is displayed in the alert when the user confirms their reservation.
     * @component Alert - A React Native component used to display an alert dialog with a title,
     * message, and buttons. In this case, it is used to confirm the reservation details with the user.
     * @function Alert.alert - A method that creates and displays an alert dialog.
     * @param {string} title - The title of the alert dialog. In this case, it is 'Begin Search?'.
     * @param {string} message - The message displayed in the alert dialog. It includes the number of campers,
     * hike-in option, and selected date.
     * @param {Array} buttons - An array of button configurations for the alert dialog. Each button is an object
     * with properties such as text, onPress (callback function), and style.
     * In this case, there are two buttons: 'CANCEL' and 'OK'. The 'CANCEL' button resets the form and has a
     * 'destructive' style, while the 'OK' button also resets the form and triggers a local notification
     * to inform the user that their reservation search has been initiated.
     * @param {Object} options - An optional configuration object for the alert dialog.
     * In this case, it includes the cancelable property set to false, which means the alert cannot be dismissed
     * by tapping outside of it or pressing the back button on Android.
     * @function presentLocalNotification - A function that schedules and presents a local notification
     * to the user with the details of their campsite reservation search. It is called when the user
     * confirms their reservation by pressing the 'OK' button in the alert dialog.
     * @param {string} reservationDate - The date of the reservation in a human-readable format.
     * In this case, it is passed as the formatted date string from the 'date' state variable.
     * @returns {void} This function does not return any value.
     */
    const handleReservation = () => {
        const message = `Number of Campers: ${campers}
                            \nHike-In? ${hikeIn ? 'Yes' : 'No'}
                            \nDate: ${date.toLocaleDateString('en-US')}`;
        Alert.alert(
            'Begin Search?',
            message,
            [
                { 
                    text: 'Cancel', 
                    onPress: () => {
                        console.log('Reservation Search Canceled');
                        resetForm(); 
                    }, 
                    style: 'cancel' 
                },
                { 
                    text: 'OK', 
                    onPress: () => {
                        presentLocalNotification(
                            date.toLocaleDateString('en-US')
                        );
                        resetForm();
                    }
                }
            ],
            { cancelable: false }
        );
        console.log('campers:', campers);
        console.log('hikeIn:', hikeIn);
        console.log('date:', date);
    };
    /**
     * @function resetForm
     * @description Resets the reservation form to its initial state.
     * This function sets the number of campers back to 1, the hike-in option to false,
     * the date to the current date, and hides the DateTimePicker. It is called after the user
     * either cancels or confirms their reservation in the alert dialog.
     * @returns {void} This function does not return any value.
     */
    const resetForm = () => {
        setCampers(1);
        setHikeIn(false);
        setDate(new Date());
        setShowCalendar(false);
    }
    /** Send local notification with reservation details
     * @function presentLocalNotification
     * @param {string} reservationDate - The date of the reservation in a human-readable format.
     * @param {Object} reservationDetails - An object containing the details of the reservation.
     * @param {number} reservationDetails.campers - The number of campers.
     * @param {boolean} reservationDetails.hikeIn - Whether the reservation is for a hike-in campsite.
     * @param {string} reservationDetails.date - The date of the reservation in a human-readable format.
     * @description This function is responsible for scheduling and presenting a local notification
     * to the user with the details of their campsite reservation search.
     * It uses the Expo Notifications API to handle the notification scheduling and presentation.
     * The function first sets a notification handler to define how notifications should be handled
     * when they are received. In this case, it specifies that an alert should be shown, a sound should
     * be played, and no badge should be set on the app icon. Then it schedules a notification with the
     * specified content, including a title and body that incorporates the reservation date provided as
     * an argument. The notification is set to trigger immediately (trigger: null).
     * This function enhances user experience by providing timely feedback about their reservation search,
     * even if they are not actively using the app at the moment the search is initiated.
     * @const permissions - A variable to store the current notification permissions.
     * It is initially obtained by calling Notifications.getPermissionsAsync(), which checks the current
     * permission status for sending notifications. If the permissions are not granted, the function
     * requests permissions from the user by calling Notifications.requestPermissionsAsync(). This prompts
     * the user to allow or deny notification permissions for the app.
     * @function Notifications.setNotificationHandler - A method to set a global notification handler
     * that defines how notifications should be handled when they are received.
     * @function Notifications.getPermissionsAsync - A method to check the current notification permissions.
     * @function Notifications.requestPermissionsAsync - A method to request notification permissions from the user.
     * @function Notifications.scheduleNotificationAsync - A method to schedule a local notification.
     * @prop {Object} content - An object defining the content of the notification, including title, body, and sound.
     * @prop {Object} trigger - An object defining when the notification should be triggered. It is set to null here.
     * @returns {Promise<void>} A promise that resolves when the notification has been scheduled.
     * The function does not return any value.
    */
    const presentLocalNotification = async (reservationDate) => {
        const sendNotification = () => {
            Notifications.setNotificationHandler({
                handleNotification: async () => ({
                    shouldShowAlert: true,
                    shouldPlaySound: true,
                    shouldSetBadge: false,
                }),
            });
            Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Your Campsite Reservation Search',
                    body: `Search for ${reservationDate} requested`
                },
                trigger: null
            });
        }; // end of nested sendNotification function

        let permissions = await Notifications.getPermissionsAsync();
        if (!permissions.granted) {
            permissions = await Notifications.requestPermissionsAsync();
        }
        if (permissions.granted) {
            sendNotification();
        }
    }; // end of presentLocalNotification function

    /** Reservation form inputs
     * Each input is wrapped in a View with styles for layout
     * First input: Number of Campers using Picker component
     * @component <ScrollView>
     * @component <Animatable.View>
     * @component <View> - for each form row
     * @component <Text> - for each form label
     * @component <Switch> - for Hike-In option
     * @component <Button> - for Date selection and Search Availability
     * @component <DateTimePicker> - for selecting reservation date
     * @component  <Picker>     
     * @component  <Picker.Item> 
     * @component  <View> 
     * @component  <Text> 
     */
    return (
        <ScrollView>
            <Animatable.View
                animation='zoomIn'
                duration={2000}
                delay={1000}
                >

                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number of Campers</Text>
                    <Picker
                        style={styles.formItem}
                        selectedValue={campers}
                        onValueChange={(itemValue) => setCampers(itemValue)}
                        >
                        <Picker.Item label='1' value={1} />
                        <Picker.Item label='2' value={2} />
                        <Picker.Item label='3' value={3} />
                        <Picker.Item label='4' value={4} />
                        <Picker.Item label='5' value={5} />
                        <Picker.Item label='6' value={6} />
                    </Picker>
                </View>

                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Hike-In?</Text>
                    <Switch
                        style={styles.formItem}
                        value={hikeIn}
                        trackColor={{ true: '#5637DD', false: null }}
                        onValueChange={(value) => setHikeIn(value)}
                    />
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Date</Text>
                    <Button
                        onPress={() => setShowCalendar(!showCalendar)}
                        title={date.toLocaleDateString('en-US')}
                        color='#5637DD'
                        accessibilityLabel='Tap me to select a reservation date'
                    />
                    </View>
                    {showCalendar && (
                        <DateTimePicker
                        value={date}
                        mode='date'
                        display='default'
                        onChange={onDateChange}
                        />
                    )}
                    <View style={styles.formRow}>
                        <Button
                            onPress={() => handleReservation()}
                            title='Search Availability'
                            color='#5637DD'
                            accessibilityLabel='Tap me to search for available campsites to reserve'
                        />
                    </View>
            </Animatable.View>
        </ScrollView>
    );
}; // end of ReservationScreen component

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    }
});
        
export default ReservationScreen;