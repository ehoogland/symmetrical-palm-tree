import { Text, View, StyleSheet } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { baseUrl } from '../../shared/baseUrl';
/**
 * @function RenderCampsite
 * @description This function component renders a campsite item using the Card component
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
 */
const RenderCampsite = (props) => {
    const { campsite } = props;
    if (campsite) {
        return (
            <Animatable.View 
                animation='fadeInUp' 
                duration={2000} 
                delay={1000}
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