import { useState } from 'react';
import { CAMPSITES } from '../shared/campsites';
import { FlatList } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
/**
 * DirectoryScreen component
 * @param navigation navigation prop for navigating between screens
 * @variable campsites state variable initialized with CAMPSITES data
 * @variable selectedCampsiteId state variable to keep track of the selected campsite ID
 * @returns JSX element representing the directory screen
 */
const DirectoryScreen = ({ navigation }) => {
    const [campsites, setCampsites] = useState(CAMPSITES);
    const [selectedCampsiteId, setSelectedCampsiteId] = useState(null);
/**
 * Render a single campsite item
 * Destructure a prop value of navigation in the parameter list of DirectoryScreen function,
 * which replaces the previous value of props.
 * @param {Object} param0 - Props for the component
 * @param {Object} param0.navigation - Navigation prop for navigating between screens
 * @returns JSX element representing a single campsite item
 *   <ListItem onPress={() => navigation.navigate('CampsiteInfo', { campsite } )}> // ListItem component
 *  with onPress navigation to CampsiteInfo screen
 *       <Avatar source={campsite.image} rounded /> // Avatar component to display campsite image
 *       <ListItem.Content> // Content container for ListItem
 *           <ListItem.Title>{campsite.name}</ListItem.Title> // Title displaying campsite name
 *           <ListItem.Subtitle>
 *               {campsite.description} // Subtitle displaying campsite description
 *           </ListItem.Subtitle>
 *       </ListItem.Content>
 *   </ListItem>
 */
    const renderDirectoryItem = ({ item: campsite }) => {
        return (
            <ListItem onPress={() => navigation.navigate('CampsiteInfo', { campsite } )}>
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
    /**
     * @variable campsites state variable initialized with CAMPSITES data
     * @Flatlist to render the list of campsites using renderDirectoryItem function
     * @keyExtractor to provide unique keys for each item in the list
     */
    return (
        <FlatList
            data={campsites}
            renderItem={renderDirectoryItem}
            keyExtractor={(item) => item.id.toString()}
        />
    );
};

export default DirectoryScreen;
