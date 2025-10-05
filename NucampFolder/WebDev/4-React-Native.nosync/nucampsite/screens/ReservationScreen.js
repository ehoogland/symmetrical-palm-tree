import { useState } from 'react';
import { Text,
    View, 
    ScrollView, 
    StyleSheet, 
    Switch, 
    Button, 
    Platform,
    Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Animatable from 'react-native-animatable';
const ReservationScreen = () => {
    // local state variables for the reservation form inputs
    const [campers, setCampers] = useState(1);
    const [hikeIn, setHikeIn] = useState(false);
    const [date, setDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    // const [showModal, setShowModal] = useState(false); -- deleted the 
    // local state variable and setting function used to toggle the modal visibility
    // as per instructions
    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowCalendar(Platform.OS === 'ios');
        setDate(currentDate);
    };
   
    // Displays an alert with the reservation details and options to reset the form or confirm the reservation
    const handleReservation = () => {
        const message = `Number of Campers: ${campers}\n\nHike-In? ${hikeIn ? 'Yes' : 'No'}\n\nDate: ${date.toLocaleDateString('en-US')}`;
        Alert.alert(
            'Begin Search?',
            message,
            [
                { text: 'CANCEL', onPress: () => { resetForm(); }, style: 'destructive' },
                { text: 'OK', onPress: () => { resetForm(); } }
            ],
            { cancelable: false }
        );
    };
    // Reset form to initial state after submission
    const resetForm = () => {
        setCampers(1);
        setHikeIn(false);
        setDate(new Date());
        setShowCalendar(false); 
        //setShowModal(false); -- deleted the line that hides the modal
    }
    /* Reservation form inputs
    Each input is wrapped in a View with styles for layout
    First input: Number of Campers using Picker component */
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
            </ScrollView> // moved the closing ScrollView tag
        ); // moved the closing parenthesis of return statement
    }; // end of ReservationScreen component


            {/* Deleted Modal code as per instructions
            <Modal
                animationType={'slide'}
                transparent={false}
                visible={showModal}
                onRequestClose={() => setShowModal(!showModal)}
                >
                <View style={styles.modal}>
                    <Text style={styles.modalTitle}>
                        Search Campsite Reservation</Text>
                    <Text style={styles.modalText}>
                        Number of Campers: {campers}
                    </Text>
                    <Text style={styles.modalText}>
                        Hike-In? {hikeIn ? 'Yes' : 'No'}
                    </Text>
                    <Text style={styles.modalText}>
                        Date: {date.toLocaleDateString('en-US')}
                    </Text>
                    <Button
                        onPress={() => {
                            resetForm();
                        }}
                        color='#5637DD'
                        title='Close'
                        />
                </View>
            </Modal>
            */}
            
            
            
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

/* Deleted StyleSheet styles for the modal as per instructions 
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
    },
    modal: { 
        justifyContent: 'center', 
        margin: 20 
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#5637DD',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
}); */

