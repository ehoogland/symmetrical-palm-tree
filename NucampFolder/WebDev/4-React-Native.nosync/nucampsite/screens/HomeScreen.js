import { Card } from 'react-native-elements'; // UI library for React Native providing pre-styled components.
import { ScrollView, Text, View } from 'react-native'; // Core components for layout and text rendering.
import { useSelector } from 'react-redux'; // Hook to access the Redux store's state.
import { baseUrl } from '../shared/baseUrl'; // Base URL for loading images and other resources from a server.

/**
 * The following imports are no longer necessary since the data is now managed via Redux.
 * import { CAMPSITES } from '../shared/campsites'; // Importing the list of campsites from shared data.
 * import { PROMOTIONS } from '../shared/promotions'; // Importing the list of promotions from shared data.
* import { PARTNERS } from '../shared/partners'; // Importing the list of partners from shared data.

* Similarly, useState is no longer needed since we are using Redux to manage state globally.
* import { useState } from 'react'; // React hook to manage state in functional components.
*/
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
                <Card.Image source={{ uri: baseUrl + item.image }}>
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

const HomeScreen = () => {
    const campsites = useSelector((state) => state.campsites);
    const promotions = useSelector((state) => state.promotions);
    const partners = useSelector((state) => state.partners);

    const featCampsite = campsites.campsitesArray.find((item) => item.featured);
    const featPromotion = promotions.promotionsArray.find((item) => item.featured);
    const featPartner = partners.partnersArray.find((item) => item.featured);

    return (
        <ScrollView>
            <FeaturedItem item={featCampsite} />
            <FeaturedItem item={featPromotion} />
            <FeaturedItem item={featPartner} />
        </ScrollView>
    );
};

export default HomeScreen;

/** 
 * @component HomeScreen
 * @note TODO: 1. Eliminate redundant JSDoc code
 * 2. Add PropTypes for type checking and documentation?
 * @description The HomeScreen component displays the featured items (campsite, promotion, partner) 
 * using the FeaturedItem component. The HomeScreen component uses the useState hook to create state variables
 * for campsites, promotions, and partners. This approach ensures that the component adheres
 * to React's principles of immutability and single source of truth.
 * Instead of using the imported arrays directly, which are mutable, we create state variables
 * that hold copies of these arrays. This way, any updates to the state will trigger a re-render
 * of the component, ensuring that the UI stays in sync with the data. This method also
 * prevents unintended side effects that could arise from directly mutating the imported arrays.
 * @returns {JSX.Element} The HomeScreen component rendered in a ScrollView.
 * @method useState - React hook to manage state in functional components.
 * @property {Array} campsites - State variable to hold a copy of the list of campsites, 
 * plus any updates made to the state.
 * @property {Array} promotions - State variable to hold a copy of the list of promotions, 
 * plus any updates made to the state.
 * @property {Array} partners - State variable to hold a copy of the list of partners, 
 * plus any updates made to the state.
 * @variable {Object} featCampsite - The featured campsite, found by searching the campsites array.
 * @variable {Object} featPromotion - The featured promotion, found by searching the promotions array.
 * @variable {Object} featPartner - The featured partner, found by searching the partners array.
 * @Object state - The data object managed by the useState hook. In Redux, this is managed by the store.
*
* @note ---find() method explanation---
* @description @method find The find() method is used to locate the first item in an array that 
* meets a specific condition. In this case, we are looking for the first item where the featured
* property is true. This is useful for displaying highlighted or special items on the Home screen.
* Unlike filter, which returns all matching elements, find returns only the first
* match, or undefined if no match is found. This is particularly useful when you need to
* retrieve a single item based on a specific criterion, such as finding the first featured
* item in an array. find() does not directly return true or false. It returns either the
* found element (which can be a truthy value itself, like an object or a non-zero number) 
* or undefined (which is a falsy value).
* @property {Object} item - The current element being processed in the array.                                              
* @param {function} item - The current element being processed in the array.
* @callback item - A function that is called for each element in the array until it finds one
* where the function returns a truthy value. If such an element is found, find() immediately
* returns that element. If the function never returns a truthy value (i.e., it returns false
* or a falsy value for all elements), find() returns undefined.
* @returns {boolean} True if the item is featured, otherwise false.
* @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
* @note The following changes were made to the HomeScreen component to integrate Redux for state management:
* The following local state variables are no longer necessary since the data is now managed via Redux.
* We instead want to add variables from Redux for campsites, promotions, and partners.
* Before: 'const [campsites, setCampsites] = useState(CAMPSITES);'
* Now: 'const campsites = useSelector((state) => state.campsites);'
* etc.
* We know that state.campsites is available in the store.js file because when we created
* configureStore and defined our slice reducers, we assigned the campsites reducer to the
* // @key campsites in the root reducer. This means that the Redux store's state will have a property
* called campsites, which is managed by the campsitesReducer imported above. The useSelector hook
* allows us to access this part of the state directly in our component. The same logic applies to
* promotions and partners.
* When we call useSelector and pass it a function, that function is executed with the entire Redux state as
* its argument. The function then returns the specific part of the state that we want to use in our component.
* This is how our component "receives" or gets access to the Redux state, enabling it to read data from the store.

* @description
* @hook useSelector() receives the Redux state. It accesses the Redux store's state for
* campsites, promotions, and partners.
* We know that the imported slice reducers state.campsites, state.promotions, and state.partners
* are values that correspond to the keys defined in the Redux store's root reducer. Each of these
* keys holds an object that contains an array of items (campsites, promotions, or partners) along
* with additional metadata such as loading status and error messages. By accessing state.campsites.campsites,
* state.promotions.promotions, and state.partners.partners, we are specifically retrieving
* the arrays of items from their respective slices of the Redux state. This approach ensures that the
* HomeScreen component always has access to the most current data managed by Redux, allowing it to
* react to any changes in the global state. But this is not what we are doing here. We are just accessing
* state.campsites, state.promotions, and state.partners directly. Why is this?
* This is because in the store.js file, when we defined the root reducer, we assigned
* the campsites reducer state.campsitesto the key campsites, the promotions reducer to the key promotions,
* and the partners reducer to the key partners. This means that state.campsites, state.promotions,
* and state.partners correspond to the entire slices of state managed by their respective reducers.
* Each of these slices is an object that contains the array of items along with other properties.
* Therefore, when we access state.campsites, state.promotions, and state.partners in our component,
* we are getting the entire objects returned by their respective reducers, which include the arrays
* we need to work with.
* @param {function} param0 - The function passed to useSelector that receives the entire Redux state.
* @param {function} state - The entire Redux store state.
* @returns {Array} The array of campsites from the Redux store.
* @returns {Array} The array of promotions from the Redux store.
* @returns {Array} The array of partners from the Redux store.
* Since we have now defined the campsites, promotions, and partners reducers directly in the store,
we can access the arrays directly from state.campsites, state.promotions, and state.partners.
* This is because each of these slices of state is managed by its respective reducer, which
* is responsible for handling the data and any related actions for that part of the state.
* Each reducer returns an object that includes the array of items (campsites, promotions,
* or partners) along with other properties like isLoading and errMess. By accessing
* state.campsites, state.promotions, and state.partners, we are getting the entire slice
* of state managed by each reducer, which includes the arrays we need to work with in
* the HomeScreen component.
* Also, we can no longer call find() directly on state.campsites, state.promotions,
* and state.partners because these are now objects that contain the arrays, not the arrays
* themselves. The return value of useSelector for each of these slices is now an object
* that includes the array we need, one that includes both the original array and any
* additional metadata. The array of data is nested within these objects, along with other properties
* like isLoading and errMess. Therefore, to access the actual arrays of items, we need to
* reference the specific property within these objects that holds the array.
* For example, if the campsites slice of state looks like this:
* {
*   isLoading: false,
*   errMess: null,
*   campsites: [array of campsite objects]
* }
* We need to access state.campsites.campsites to get the array of campsite objects.
* The same applies to promotions and partners. So why does it just say state.campsites, etc.?
* This is because in the store.js file, when we defined the root reducer, we assigned
* the campsites reducer to the key campsites, the promotions reducer to the key promotions,
* and the partners reducer to the key partners. This means that state.campsites, state.promotions,
* and state.partners correspond to the entire slices of state managed by their respective reducers.
* Each of these slices is an object that contains the array of items along with other properties.
* Therefore, when we access state.campsites, state.promotions, and state.partners in our component,
* we are getting the entire objects returned by their respective reducers, which include the arrays
* we need to work with.
* Finding the featured items from the respective arrays.
* const featCampsite = campsites.find((item) => item.featured); --cannot do this anymore--
* const featPromotion = promotions.find((item) => item.featured); --cannot do this anymore--
* const featPartner = partners.find((item) => item.featured); --cannot do this anymore--
* This is because state.campsites, state.promotions, and state.partners are now objects
* that contain the arrays, not the arrays themselves. The return value of useSelector for
* each of these slices is now an object that includes the array we need, one that includes
* both the original array and any additional metadata. The array of data is nested within
* these objects, along with other properties like isLoading and errMess. Therefore,
* to access the actual arrays of items, we need to reference the specific property
* within these objects that holds the array.
* For example, if the campsites slice of state looks like this:
* {
*   isLoading: false,
*   errMess: null,
*   campsites: [
*     {
*       id: 1,
*       name: 'Campsite 1',
*       description: 'Description 1',
*       image: require('../assets/images/campsite1.jpg'),
*       featured: true
*     },
*     ...
*   ]
* }
* @note --Served images from server--
* @description The baseUrl is a string that represents the base URL of the server where
* the images are hosted. By concatenating baseUrl with item.image, we create a full URL
* that points to the location of the image on the server. This allows the Card.Image component
* to fetch and display the image correctly. This approach is useful when images are stored
* on a remote server rather than being bundled directly with the app.
* Originally, the image source was set directly to item.image, which would work if item.image
* contained a local image reference (e.g., require('../assets/images/campsite1.jpg')).
* <Card.Image source={item.image} /> was the original code.
* This method is suitable for local images that are part of the app's assets.
* However, when images are hosted on a server, we need to provide the full URL to the image.
* @property {string} baseUrl - The base URL of the server where images are hosted.
* @property {string} item.image - The relative path to the image file.
* @returns {string} The full URL to access the image on the server.
* @see https://reactnative.dev/docs/network
* @see https://reactnative.dev/docs/image#network-images
* @see https://reactnativeelements.com/docs/card#cardimage
* @see https://reactnativeelements.com/docs/card
* @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Template_literals
* @note Template literals are enclosed by backticks (` `) instead of single or double quotes.
* They can contain placeholders indicated by the dollar sign and curly braces (${expression}).
* The expressions inside the placeholders and the text between them get passed to a function.
* The default function just concatenates the parts into a single string.
* Example: const fullUrl = `${baseUrl}${item.image}`;
*

* @note --ScrollView vs View vs FlatList--
* @component ScrollView - A core React Native component that provides a scrolling container
* for its child components, which are typically other React components. Compare this to View,
* which is a non-scrollable container like a div in web development, or to FlatList, which
* is optimized for displaying large lists of data using a more efficient data management approach called
* lazy loading. All ScrollView's children are rendered at once, which can impact performance
* if there are many items. ScrollView is best suited for smaller sets of data or when the
* entire content needs to be visible and scrollable.
*/