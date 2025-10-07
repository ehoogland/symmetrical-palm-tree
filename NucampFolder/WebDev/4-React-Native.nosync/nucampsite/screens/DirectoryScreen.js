import Loading from '../components/LoadingComponent';
import { FlatList, Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable'
import { Tile } from 'react-native-elements';
import { baseUrl } from '../shared/baseUrl';
import { useSelector } from 'react-redux';

const DirectoryScreen = () => {
    
    const campsites = useSelector((state) => state.campsites);
    if (campsites.isLoading) {
        return <Loading />;
    }
    if (campsites.errMess) {
        return (
            <View>
                <Text>{campsites.errMess}</Text>
            </View>
        );
    }
    /**
     * @description The navigate function is destructured from the navigation prop that is
     * automatically provided by React Navigation to all components that are used as screens.
     * @param {Object} navigation - The navigation prop provided by React Navigation.
     * @variable {function} navigate - Function to navigate to different screens.
     * @callback renderDirectoryItem
     * @prop {Object} item - The campsite item to be rendered, destructured to extract the campsite property.
     * @param {Object} campsite - The campsite object
     * @property {string} campsite.name - The name of the campsite.
     * @property {string} campsite.image - The image source of the campsite.
     * @property {string} campsite.description - The description of the campsite.
     * @property {boolean} campsite.featured - Whether the campsite is featured.
     * @function onPress - arrow function [declaration] to handle press events on the Tile component.
     * @prop {Object} navigation - The navigation prop provided by React Navigation.
     * @function navigate - React Navigation function to navigate to different screens.
     * @returns {JSX.Element} The rendered directory item.
     */
    const renderDirectoryItem = ({ item: campsite }) => {
        return (
            <Animatable.View
                animation='fadeInRightBig'
                duration={2000}
            >
                <Tile
                    title={campsite.name}
                    caption={campsite.description}
                    featured
                    onPress={() => {
                        navigation.navigate('CampsiteInfoScreen', { campsite });
                    }}
                    imageSrc={{ uri: baseUrl + campsite.image }}
                />
            </Animatable.View>
        );
    };
    return (
        <FlatList
            data={campsites.campsitesArray}
            renderItem={renderDirectoryItem}
            keyExtractor={(item) => item.id.toString()}
        />
    );
};

export default DirectoryScreen;