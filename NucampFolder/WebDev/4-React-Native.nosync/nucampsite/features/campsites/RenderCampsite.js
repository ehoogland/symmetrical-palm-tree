import { useRef } from 'react';
import { Text, View, StyleSheet, Alert, PanResponder } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { baseUrl } from '../../shared/baseUrl';
const RenderCampsite = (props) => {
    const { campsite } = props;
    // useRef hook to create a reference to the view component
    const view = useRef(null); 
    // function to determine if the swipe gesture is a left swipe
    
    const isLeftSwipe = ({ dx }) => dx < -200 ? true : false;       
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
            view.current
            .rubberBand(1000)
            .then(endState => console.log(endState.finished ? 'finished' : 'canceled'));
        },
        onPanResponderEnd: (e, gestureState) => { 
            console.log('pan responder end', gestureState);
            if (isLeftSwipe(gestureState)) {
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' +
                    campsite.name +
                    ' to favorites?',
                    [
                        {
                            text: 'Cancel',
                            style: 'cancel',
                            onPress: () => console.log('Cancel Pressed')
                        },
                        {
                            text: 'OK',
                            onPress: () =>
                                props.isFavorite
                            ? console.log('Already set as a favorite')
                            : props.markFavorite()
                        }
                    ],
                    { cancelable: false }
                );
            }
        }
    });
    
    if (campsite) {
        return (
            <Animatable.View 
            animation='fadeInUp' 
            duration={2000} 
            delay={1000}
            ref={view}
            {...panResponder.panHandlers}
            >
                <Card containerStyle={styles.cardContainer}>
                    <Card.Image source={{ uri: baseUrl + campsite.image }}>
                        <View style={{ justifyContent: 'center', flex: 1 }}>
                            <Text
                                style={styles.cardText}
                                >
                                {campsite.name}
                            </Text>
                        </View>
                    </Card.Image>
                    <Text style={{ margin: 20 }}>{campsite.description}</Text>
                    <View style={styles.cardRow}>
                        <Icon
                            name={props.isFavorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            raised
                            reverse
                            onPress={() => props.markFavorite()}
                            />
                        <Icon
                            name={ 'pencil' }
                            type='font-awesome'
                            color='#5637DD'
                            raised
                            reverse
                            onPress={() => props.onShowModal()}  
                            />
                    </View>
                </Card>
            </Animatable.View>
        );
    }
    return <View />;
};
const styles = StyleSheet.create({
    cardContainer: {
        padding: 0,
        margin: 0,
        marginBottom: 20
    },
    cardRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    cardText: {
        textShadowColor: 'rgba(0,0,0,1)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 20,
        textAlign: 'center',
        color: 'white',
        fontSize: 20
    }
});

export default RenderCampsite;

/**
 * @note @function functional component RenderCampsite
 * @description This component renders a campsite item using the Card component
 * @component Card - A react-native-elements component used to display content in a card layout.
 * @param {props} props - The props object passed to the component. Originally was:
 * @param ({ campsite }) - The props object, destructured to extract just the campsite property. Now
 * we are using props directly because we need to access multiple props (isFavorite, markFavorite, onShowModal).
 * @param {Object} props.campsite - The campsite item to render
 * @property {string} campsite.name - The name of the campsite.
 * @property {string} campsite.image - The image source of the campsite.
 * @property {string} campsite.description - The description of the campsite.
 * @returns {JSX.Element} The rendered campsite item, or an empty View if no campsite is provided.
 * @View is used as a container for layout purposes, like a div in web development.
 * @Card <Card.Image source={campsite.image}> updated to <Card.Image source={{ 
 * uri: baseUrl + campsite.image }}> to load images from server. The extra curly braces
 * are necessary because the image source prop expects an object with a uri property.
 * The outer curly braces {} indicate that we are embedding a JavaScript expression within JSX.
 * The inner curly braces {} define a JavaScript object containing the uri property with the
 * value of baseUrl + campsite.image.
 * @component Icon - A react-native-elements component used to display icons.
 * @prop {string} name - The name of the icon to display. 'heart' for filled heart, 'heart-o' for 
 * outlined heart.
 * @prop {string} type - The icon library to use. 'font-awesome' specifies the FontAwesome icon set.
 * @prop {string} color - The color of the icon. '#f50' is a shade of red.
 * @prop {boolean} raised - If true, the icon will have a raised appearance with a shadow.
 * @prop {boolean} reverse - If true, the icon will have a circular background with the specified color.
 * @prop {function} onPress - A callback function that is called when the icon is pressed.
 * In this case, it calls the markFavorite function passed via props to handle marking the campsite 
 * as favorite.
 * The second Icon component is added to render a pencil icon for editing purposes.
 * It uses similar props as the heart icon but has a different name and color.
 * @modal The modal is not defined in this component but is assumed to be handled in the parent component.
 * The onPress prop for the pencil icon calls the onShowModal function passed via props to handle
 * showing a modal for editing.
 * @const @function isLeftSwipe - A function to determine if the swipe gesture is a left swipe.
 * It checks if the horizontal distance (dx) of the swipe is less than -200. If so, it returns true, indicating a left swipe.
 * Keep in mind that this is a negative value because swiping left decreases the x-coordinate, and that a smaller
 * (more negative) value indicates a more significant left swipe. You can think of it as delta x or the distance of a gesture
 * across the x-axis. A right swipe would have a positive dx value, while a left swipe has a negative dx value.
 * Here, we are using -200 as the threshold to determine if the swipe is significant enough to be considered a left swipe.
 * This threshold can be adjusted based on the desired sensitivity for detecting left swipes.
 * 
 * @const @function panResponder - A PanResponder instance to handle touch gestures.
 * It is created using PanResponder.create and defines various callbacks to manage the gesture lifecycle.
 * 
 * @prop {function} onStartShouldSetPanResponder - A callback that is called when a touch gesture starts.
 * It returns true to indicate that this component wants to become the responder for the gesture.
 * @prop {function} onPanResponderEnd - A callback that is called when the touch gesture ends.
 * It receives the gesture state as an arguument and its parameter is destructured to extract the dx property.
 * It logs the gesture state to the console for debugging purposes.
 * It then calls the isLeftSwipe function with the gestureState to check if the gesture was a left swipe.
 * If it was a left swipe, it displays an alert dialog to confirm adding the campsite to favorites.
 * The alert has two buttons: 'Cancel' and 'OK'. The 'Cancel' button logs a message to the console,
 * while the 'OK' button checks if the campsite is already marked as favorite using props.isFavorite.
 * If it is not already a favorite, it calls the props.markFavorite function to mark it as favorite.
 * 
 * @prop {...panResponder.panHandlers} - This syntax spreads the panHandlers from the panResponder instance
 * onto the Animatable.View component. This allows the Animatable.View to respond to touch gestures
 * defined in the panResponder, enabling swipe functionality for the campsite card.
 * 
 * @component Animatable.View - A component from react-native-animatable that provides animation capabilities.
 * It is used here to wrap the Card component and apply a fadeInUp animation when the component mounts.
 * @prop {string} animation - The name of the animation to apply. 'fadeInUp' makes the component fade in
 * while moving upwards.
 * @prop {number} duration - The duration of the animation in milliseconds. Here, it is set to 2000ms (2 seconds).
 * @prop {number} delay - The delay before the animation starts in milliseconds. Here, it is set to 1000ms (1 second).
 */