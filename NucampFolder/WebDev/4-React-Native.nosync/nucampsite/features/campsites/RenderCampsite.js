import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';
/**
 * @function RenderCampsite
 * @description This function component renders a campsite item using the Card component
 * @component Card - A react-native-elements component used to display content in a card layout.
 * @param ({ campsite }) - The props object. It is destructured to extract the campsite property.
 * @param {Object} param0.campsite - The campsite item to render
 * @property {string} campsite.name - The name of the campsite.
 * @property {string} campsite.image - The image source of the campsite.
 * @property {string} campsite.description - The description of the campsite.
 * @returns {JSX.Element} The rendered campsite item, or an empty View if no campsite is provided.
 * View is used as a container for layout purposes, like a div in web development.
 */
const RenderCampsite = ({ campsite }) => {
    if (campsite) {
        return (
            <Card containerStyle={{ padding: 0 }}>
                <Card.Image source={campsite.image}>
                    <View style={{ justifyContent: 'center', flex: 1 }}>
                        <Text
                            style={{
                                color: 'white',
                                textAlign: 'center',
                                fontSize: 20
                            }}
                        >
                            {campsite.name}
                        </Text>
                    </View>
                </Card.Image>
                <Text style={{ margin: 20 }}>{campsite.description}</Text>
            </Card>
        );
    }
    return <View />;
};

export default RenderCampsite;