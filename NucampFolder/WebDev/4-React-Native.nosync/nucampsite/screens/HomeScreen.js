import { useState } from 'react'; // React hook to manage state in functional components.
import { ScrollView, Text, View } from 'react-native'; // Core components for layout and text rendering.
import { Card } from 'react-native-elements'; // UI library for React Native providing pre-styled components.
import { CAMPSITES } from '../shared/campsites'; // Importing the list of campsites from shared data.
import { PROMOTIONS } from '../shared/promotions'; // Importing the list of promotions from shared data.
import { PARTNERS } from '../shared/partners'; // Importing the list of partners from shared data.

/**
 * @component FeaturedItem
 * @description A reusable component that displays a featured item (campsite, promotion, or partner)
 * in a card format. It shows the item's image, name, and description.
 * @param ({item}) param0- The featured item to be displayed. param0.item should contain the 
 * destructured properties:
 * - image: The image source of the item.
 * - name: The name of the item.
 * - description: A brief description of the item.
 * The outer parentheses around the parameter allow for direct destructuring of the props object.
 * The inner curly braces are used to destructure the item property from the props object.
 * @prop {Object} item - The immutable JavaScript featured item to be displayed.
 * @prop {string} item.image - The image source of the item.
 * @prop {string} item.name - The name of the item.
 * @prop {string} item.description - A brief description of the item.
 * @returns {JSX.Element} The rendered card component displaying the featured item.
*/
const FeaturedItem = ({ item }) => {
    if (item) {
        return (
            <Card containerStyle={{ padding: 0 }}>
                <Card.Image source={item.image}>
                    <View style={{ justifyContent: 'center', flex: 1 }}>
                        <Text
                            style={{
                                color: 'white',
                                textAlign: 'center',
                                fontSize: 20
                            }}
                            >
                            {item.name}
                        </Text>
                    </View>
                </Card.Image>
                <Text style={{ margin: 20 }}>{item.description}</Text>
            </Card>
        );
    }
    return <View />;
};
/** 
 * @component HomeScreen
 * @description The HomeScreen component displays the featured items (campsite, promotion, partner) using the FeaturedItem component.The HomeScreen component uses the useState hook to create state variables
 * for campsites, promotions, and partners. This approach ensures that the component adheres
 * to React's principles of immutability and single source of truth.
 * Instead of using the imported arrays directly, which are mutable, we create state variables
 * that hold copies of these arrays. This way, any updates to the state will trigger a re-render
 * of the component, ensuring that the UI stays in sync with the data. This method also
 * prevents unintended side effects that could arise from directly mutating the imported arrays.
 * @returns {JSX.Element} The HomeScreen component rendered in a ScrollView.
 * @method useState - React hook to manage state in functional components.
 * @property {Array} campsites - State variable to hold a copy of the list of campsites, plus any updates made to the state.
 * @property {Array} promotions - State variable to hold a copy of the list of promotions, plus any updates made to the state.
 * @property {Array} partners - State variable to hold a copy of the list of partners, plus any updates made to the state.
 * @variable {Object} featCampsite - The featured campsite, found by searching the campsites array.
 * @variable {Object} featPromotion - The featured promotion, found by searching the promotions array.
 * @variable {Object} featPartner - The featured partner, found by searching the partners array.
 * @method find - JavaScript array method to locate the first element that satisfies a given
 * condition. Unlike filter, which returns all matching elements, find returns only the first
 * match, or undefined if no match is found. This is particularly useful when you need to
 * retrieve a single item based on a specific criterion, such as finding the first featured
 * item in an array. find() does not directly return true or false. It returns either the
 * found element (which can be a truthy value itself, like an object or a non-zero number) 
 * or undefined (which is a falsy value).
 * @callback item - A function that is called for each element in the array until it finds one
 * where the function returns a truthy value. If such an element is found, find() immediately
 * returns that element. If the function never returns a truthy value (i.e., it returns false
 * or a falsy value for all elements), find() returns undefined.
 * @param {function} item - The current element being processed in the array.
 * @returns {boolean} True if the item is featured, otherwise false.
 * @component ScrollView - A core React Native component that provides a scrolling container
 * for its child components, which are typically other React components. Compare this to View,
 * which is a non-scrollable container like a div in web development, or to FlatList, which
 * is optimized for displaying large lists of data using a more efficient data management approach called
 * lazy loading. All ScrollView's children are rendered at once, which can impact performance
 * if there are many items. ScrollView is best suited for smaller sets of data or when the
 * entire content needs to be visible and scrollable.
 */
const HomeScreen = () => {
    const [campsites, setCampsites] = useState(CAMPSITES);
    const [promotions, setPromotions] = useState(PROMOTIONS);
    const [partners, setPartners] = useState(PARTNERS);

    const featCampsite = campsites.find((item) => item.featured);
    const featPromotion = promotions.find((item) => item.featured);
    const featPartner = partners.find((item) => item.featured);

    return (
        <ScrollView>
            <FeaturedItem item={featCampsite} />
            <FeaturedItem item={featPromotion} />
            <FeaturedItem item={featPartner} />
        </ScrollView>
    );
};

export default HomeScreen;


