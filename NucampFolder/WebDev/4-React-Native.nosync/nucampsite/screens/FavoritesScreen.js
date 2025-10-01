import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, FlatList, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import Loading from '../components/LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { SwipeRow } from 'react-native-swipe-list-view';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
/**
 * 
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
 * 
 */
const FavoritesScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites);
    const { campsitesArray, isLoading, errorMessage } = useSelector((state) => state.campsites);

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

    const renderFavoriteItem = ({ item: campsite }) => (
        <View>
            <SwipeRow rightOpenValue={-100} disableRightSwipe>
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
        </View>
    );

    if (isLoading) return <Loading />;

    if (errorMessage) return (
        <View>
            <Text>{errorMessage}</Text>
        </View>
    );

    return (
        <FlatList
            data={campsitesArray.filter((campsite) => favorites.includes(campsite.id))}
            renderItem={renderFavoriteItem}
            keyExtractor={(item) => item.id.toString()}
        />
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

