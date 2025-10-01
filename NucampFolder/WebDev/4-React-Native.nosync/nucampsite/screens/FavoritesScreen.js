import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, FlatList, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import Loading from '../components/LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { SwipeRow } from 'react-native-swipe-list-view';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import * as Animatable from 'react-native-animatable'

const FavoritesScreen = ({ navigation }) => {
    const { campsitesArray, isLoading, errorMessage } = useSelector((state) => state.campsites);
    const favorites = useSelector((state) => state.favorites);
    const dispatch = useDispatch();

    const confirmDelete = (campsite) => {
        Alert.alert(
            'Delete Favorite?',
            `Are you sure you wish to delete the favorite campsite ${campsite.name}?`,
            [
                { text: 'Cancel', onPress: () => console.log(campsite.name + ' Not Deleted'), style: 'cancel' },
                { text: 'OK', onPress: () => dispatch(toggleFavorite(campsite.id)) }
            ],
            { cancelable: false }
        );
    };
    // disabled disableRightSwipe to allow right swipe to close the row
    // implicit return used with arrow function
    const renderFavoriteItem = ({ item: campsite }) => (
        <SwipeRow rightOpenValue={-100} >
            <View style={styles.deleteView}>
                <TouchableOpacity style={styles.deleteTouchable} onPress={() => confirmDelete(campsite)}>
                    <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
            </View>

            <View>
                <ListItem
                    onPress={() =>
                        navigation.navigate('DirectoryNav', {
                            screen: 'CampsiteInfoScreen',
                            params: { campsite }
                        })
                    }
                >
                    <Avatar rounded source={{ uri: baseUrl + campsite.image }} />
                    <ListItem.Content>
                        <ListItem.Title>{campsite.name}</ListItem.Title>
                        <ListItem.Subtitle>{campsite.description}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            </View>
        </SwipeRow>
    );

    if (isLoading) return <Loading />;

    if (errorMessage) return (
        <View>
            <Text>{errorMessage}</Text>
        </View>
    );

    return (
        <Animatable.View animation="fadeInRightBig" duration={2000}>
            <FlatList
                data={campsitesArray.filter((campsite) => favorites.includes(campsite.id))}
                renderItem={renderFavoriteItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </Animatable.View>
    );
};

const styles = StyleSheet.create({
    deleteView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1
    },
    deleteTouchable: {
        backgroundColor: 'red',
        height: '100%',
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    deleteText: {
        color: 'white',
        fontWeight: '700',
        textAlign: 'center',
        fontSize: 16,
        width: 100
    }
});

export default FavoritesScreen;

/**
 * FavoritesScreen Notes
 * @description The FavoritesScreen component displays a list of favorite campsites.
 * It retrieves the list of campsites and favorites from the Redux store using the useSelector hook.
 * If the campsites are still loading, it displays a loading indicator.
 * If there is an error message, it displays the error message.
 * Otherwise, it filters the campsites to include only those that are marked as favorites
 * and renders them in a FlatList.
 * Each favorite campsite is displayed using a ListItem component from react-native-elements,
 * which includes an avatar image and the name of the campsite.
 * @component Avatar - A react-native-elements component used to display images in a circular frame.
 * @prop {boolean} rounded - If true, the avatar will be displayed with rounded corners (circular).
 * @prop {string} source - The source of the image to display. In this case, it is constructed
 * by concatenating the baseUrl with the campsite's image path.
 * @component ListItem - A react-native-elements component used to display a list item with
 * optional avatar, title, and other elements.
 * @prop {Object} key - A unique key for the list item, derived from the campsite's id.
 * @prop {JSX.Element} leftAvatar - The avatar to display on the left side of the list item.
 * It uses the Avatar component with the rounded and source props.
 * @prop {JSX.Element} title - The title to display in the list item. In this case, it is
 * a Text component displaying the name of the campsite.
 * @returns {JSX.Element} The FavoritesScreen component rendering a list of favorite campsites.
 * @function renderFavoriteItem - A helper function to render each favorite campsite item.
 * @param {Object} item - The campsite item to be rendered, destructured to extract the campsite property.
 * @param {Object} campsite - The campsite object
 * @property {string} campsite.name - The name of the campsite.
 * @property {string} campsite.image - The image source of the campsite.
 * @property {string} campsite.description - The description of the campsite.
 * @function onPress - arrow function [declaration] to handle press events on the ListItem component.
 * @prop {Object} navigation - The navigation prop provided by React Navigation.
 * @function navigate - React Navigation function to navigate to different screens.
 * In this case, it navigates to the CampsiteInfoScreen within the DirectoryNav stack,
 * passing the selected campsite as a parameter.
 * 
 * Lesson code had navigation.popTo(...) function, but that errors as not being a function. 
 * Changed to navigation.navigate. 
 * "CampsiteInfo" file referred to in code does not exist. I recalled "CampsiteInfoScreen" in screens
 * subdirectory, and it is listed in MainComponent.js as "CampsiteInfoScreen", so I changed to that.
 * 
 * @note The navigate function is used here to navigate to a nested screen (CampsiteInfoScreen)
 * within a nested navigator (DirectoryNav). This is done by specifying the screen name and
 * passing the necessary parameters.
 * @note The FavoritesScreen component assumes that it is part of a navigation stack
 * and that the navigation prop is passed to it. This is typically done when the component
 * is used as a screen in a navigator provided by React Navigation.
 * @function confirmDelete - A helper function to confirm the deletion of a favorite campsite.
 * It displays an alert dialog with options to cancel or confirm the deletion.
 * If confirmed, it dispatches the toggleFavorite action to remove the campsite from favorites.
 * @param {Object} campsite - The campsite object to be deleted from favorites.
 * @component SwipeRow - A component from react-native-swipe-list-view that allows
 * users to swipe a list item to reveal additional options, such as deleting the item.
 * @prop {number} rightOpenValue - The distance (in pixels) to which the row will open when swiped to the left.
 * A negative value indicates a left swipe. In this case, -100 means the row will open 100 pixels to the left.
 * @prop {boolean} disableRightSwipe - If true, it disables swiping to the right. This is useful when
 * you only want to allow left swipes for actions like deleting an item.
 * @component Alert - A React Native component used to display an alert dialog with a title,
 * message, and buttons. In this case, it is used to confirm the deletion of a favorite campsite.
 * @function Alert.alert - A method that creates and displays an alert dialog.
 * @param {string} title - The title of the alert dialog. In this case, it is 'Delete Favorite?'.
 * @param {string} message - The message displayed in the alert dialog. It includes the name of the campsite
 * to be deleted.
 * @param {Array} buttons - An array of button configurations for the alert dialog. Each button is an object
 * with properties such as text, onPress (callback function), and style.
 * In this case, there are two buttons: 'Cancel' and 'OK'. The 'Cancel' button logs a message and has a
 * 'cancel' style, while the 'OK' button dispatches the toggleFavorite action to remove the campsite from favorites.
 * @param {Object} options - An optional configuration object for the alert dialog.
 * In this case, it includes the cancelable property set to false, which means the alert cannot be dismissed
 * by tapping outside of it or pressing the back button on Android.
 * @component View - A core React Native component used as a container for layout purposes. It is similar to a div in web development.
 * @component Text - A core React Native component used to display text.
 * @component StyleSheet - A React Native utility for creating stylesheets for styling components.
 * @constant styles - An object containing styles for the FavoritesScreen component, created using StyleSheet.create.
 * It includes styles for the delete view, delete touchable area, and delete text.  
 */

