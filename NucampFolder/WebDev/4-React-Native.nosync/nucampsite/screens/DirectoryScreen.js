import { FlatList } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
const DirectoryScreen = ( props ) => {
    // rename item to campsite during destructuring
    const renderDirectoryItem = ({item: campsite}) => {
        // rounded makes the avatar circular
        return (
            <ListItem>
                <Avatar source={campsite.image} rounded />
                <ListItem.Content>
                    <ListItem.Title>{campsite.name}</ListItem.Title>
                    <ListItem.Subtitle>{campsite.description}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        );
    };
    return (
        <FlatList 
            data={props.campsites}
            renderItem={renderDirectoryItem}
            keyExtractor={item => item.id.toString()}
        />
    );
}
export default DirectoryScreen;
