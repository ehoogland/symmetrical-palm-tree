import { useState } from 'react';
import { FlatList } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import { CAMPSITES } from '../shared/campsites';

const DirectoryScreen = ({ navigation }) => {
    const [campsites, setCampsites] = useState(CAMPSITES);
    /**
     * @description The navigate function is destructured from the navigation prop that is
     * automatically provided by React Navigation to all components that are used as screens.
     * @param {Object} navigation - The navigation prop provided by React Navigation.
     * @variable {function} navigate - Function to navigate to different screens.
     * @callback renderDirectoryItem
     * @param {Object} item - The campsite item to be rendered.
     * @prop {boolean} rounded - Whether the avatar should be rounded.
     * @returns {JSX.Element} The rendered directory item.
     */
    const renderDirectoryItem = ({ item: campsite }) => {
        return (
            <ListItem
                onPress={() =>
                    navigation.navigate('CampsiteInfo', { campsite })
                }
            >
                <Avatar source={campsite.image} rounded />
                <ListItem.Content>
                    <ListItem.Title>{campsite.name}</ListItem.Title>
                    <ListItem.Subtitle>
                        {campsite.description}
                    </ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        );
    };
    return (
        <FlatList
            data={campsites}
            renderItem={renderDirectoryItem}
            keyExtractor={(item) => item.id.toString()}
        />
    );
};

export default DirectoryScreen;