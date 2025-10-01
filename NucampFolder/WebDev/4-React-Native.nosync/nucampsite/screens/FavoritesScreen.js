import { useSelector } from 'react-redux';
import { View, FlatList, Text } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import Loading from '../components/LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
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
 */
const FavoritesScreen = ({ navigation }) => {
    const favorites = useSelector((state) => state.favorites);
    const { campsitesArray, isLoading, errorMessage } = useSelector((state) => state.campsites);
    const renderFavoriteItem = ({ item: campsite }) => {
        return (
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
        );
    };


    if (isLoading) {
        return <Loading />;
    }

    if (errorMessage) {
        return ( 
        <View>
            <Text>{errorMessage}</Text>
        </View>
        );
    }

    return (
        <FlatList
            data={campsitesArray.filter((campsite) =>
                favorites.includes(campsite.id)
            )}
            renderItem={renderFavoriteItem}
            keyExtractor={(item) => item.id.toString()}
        />
    );
};

// removed duplicate renderFavoriteItem helper
          















export default FavoritesScreen;

