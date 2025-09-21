import { Text, View, StyleSheet } from 'react-native';
import { Card, Icon } from 'react-native-elements';
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
const RenderCampsite = (props) => {
    const { campsite } = props;
    if (campsite) {
        return (
            <Card containerStyle={styles.cardContainer}>
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
                <Icon
                    name={props.isFavorite ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    raised
                    reverse
                    onPress={() =>
                        props.isFavorite
                            ? console.log('Already set as a favorite')
                            : props.markFavorite()
                    }
                />
            </Card>
        );
    }
    return <View />;
};
const styles = StyleSheet.create({
    cardContainer: {
        padding: 0,
        margin: 0,
        marginBottom: 20
    }
});

export default RenderCampsite;