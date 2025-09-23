import { ScrollView, Text } from 'react-native';
import { Avatar, Card, ListItem } from 'react-native-elements';
/* Added the following lines as they are needed with Redux integration */
import { useSelector } from 'react-redux';
/* Added for fetching images from server simulator json-server */
import { baseUrl } from '../shared/baseUrl';
import Loading from '../components/LoadingComponent';

/*
Removed the following lines as they are no longer needed with Redux integration
import React, { useState } from 'react';
import { PARTNERS } from '../shared/partners'; 
*/

const Mission = () => {
    return (
        <Card>
      <Card.Title>Our Mission</Card.Title>
      <Card.Divider />
      <Text style={{ margin: 10 }}>
        We present a curated database of the best campsites in the vast woods and backcountry of the World Wide Web Wilderness. We increase access to adventure for the public while promoting safe and respectful use of resources. The expert wilderness trekkers on our staff personally verify each campsite to make sure that they are up to our standards. We also present a platform for campers to share reviews on campsites they have visited with each other.
      </Text>
    </Card>
  );
};

const AboutScreen = () => {
    /* Using useSelector to access partners data from Redux store. Replaces the former useState hook as well as
    any useSelector hook using the selectAllPartners parameter.
    const partners = useState(PARTNERS); --- IGNORE ---
    const partners = useSelector(selectAllPartners); --- IGNORE ---
    */
    const partners = useSelector((state) => state.partners);
    if (partners.isLoading) {
        return (
            <ScrollView>
                <Mission />
                <Card>
                    <Card.Title>Community Partners</Card.Title>
                    <Card.Divider />
                    <Loading />
                </Card>
            </ScrollView>
        );
    }
    if (partners.errMess) {
        return (
            <ScrollView>
                <Mission />
                <Card>
                    <Card.Title>Community Partners</Card.Title>
                    <Card.Divider />
                    <Text>{partners.errMess}</Text>
                </Card>
            </ScrollView>
        );
    }
    /* Using map to iterate over the partners array and render a ListItem for each partner;
    changed the value that is being mapped from partners to partners.partnersArray for Redux integration */

    return (
    <ScrollView>
      <Mission />
      <Card>
        <Card.Title>Community Partners</Card.Title>
        <Card.Divider />

        {partners.partnersArray.map((partner) => (
          <ListItem key={partner.id.toString()}>
            {/* <Avatar rounded source={partner.image} changed for json-server rendering */ }
            <Avatar rounded source={{ uri: baseUrl + partner.image }} />
            <ListItem.Content>
              <ListItem.Title style={{ fontWeight: 'bold' }}>{partner.name}</ListItem.Title>
                <ListItem.Subtitle>{partner.description}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
        ))}
        </Card>
    </ScrollView>
    );
  };

export default AboutScreen;
/**
 * AboutScreen, Mission, and Community Partners Notes
 * 
 * Mission Component
 * @function Mission functional component
 * @description The Mission component displays the mission statement of the app using a Card component
 * from react-native-elements. It includes a title and a descriptive text about the app's mission.
 * @component Card - A component from react-native-elements used to create a styled container for content.
 * @component Card.Title - A component to display the title of the card.
 * @component Card.Divider - A component that adds a visual divider line within the card to separate content sections.
 * @Text - A core component in React Native for displaying text that supports nesting, styling,
 * and touch handling. It does not include scroll functionality, so it is often wrapped in a ScrollView 
 * for longer content.
 * @returns {JSX.Element} The rendered Mission component.
 * 
 * The AboutScreen component
 * @description The About screen of the app, providing information about the app and its purpose.
 * @functional component AboutScreen displays information about the app and its community partners.
 * @array PARTNERS imported from ../shared/partners contains data about community partners.
 * @hook useState hook manages the state of the partners data.
 * @state partners - The state variable that holds the array of community partners. It is initialized
 * with the PARTNERS array imported from ../shared/partners. This state variable is used to render
 * the list of community partners dynamically within the component. Updates to this state will trigger
 * a re-render of the component to reflect any changes in the partners data.
 * @description The partners data is an array of objects, each representing a community partner
 *  with an id, name, and description.
 * @component Card - A component from react-native-elements used to create a styled container for content.
 * @component Card.Title - A component to display the title of the card.
 * @component Card.Divider - A component that adds a visual divider line within the card to separate content sections.
 * @Text - A core component in React Native for displaying text that supports nesting, styling,
 * and touch handling. It does not include scroll functionality, so it is often wrapped in a ScrollView 
 * for longer content.
 * @ScrollView - A core component in React Native that provides a scrolling container for other components.
 * It supports vertical and horizontal scrolling, making it useful for displaying long lists of content.
 * The ScrollView component is used here to allow the entire About screen content to be scrollable,
 * ensuring that all information is accessible even if it exceeds the screen size.
 * @returns {JSX.Element} The rendered About screen.
 
 * Community Partners Section
 * @description This section displays a list of community partners using a Card component from react-native-elements.
 * The partners data is sourced from the PARTNERS array imported from the shared data in ../shared/partners.
 * @hook useState is a React hook used here to help create a state variable. useState ensures immutability 
 * and adherence to React principles such as not modifying the original PARTNERS array directly.
 * This allows the component to manage and display the partners data and any updates consistently.
 * @method map - The map function is used to iterate over the partners array and render a View
 * component for each partner, displaying their name and description. It is a built-in JavaScript array
 * method that creates a new array populated with the results of calling a provided function on every element in the calling array. In this case,
 * it is used to iterate over the partners array and render a View component for each partner.
 * @param partner - Each partner object from the partners array is passed as a parameter to the map function.
 * This allows access to the properties of each partner (id, name, description) for rendering.
 * @property id - The unique identifier for each partner, used as the key prop in the ListItem component
 * to ensure efficient rendering and updating of the list.
 * @property name - The name of the community partner, displayed in bold text for emphasis.
 * @property description - A brief description of the community partner, providing additional context.
 * @component Card - A component from react-native-elements used to create a styled container for content.
 * It provides a visually appealing way to group related information together.
 * @component Card.Title - A component to display the title of the card. It is styled to stand out
 * and indicate the main topic or heading of the card's content.
 * @component Card.Divider - A component that adds a visual divider line within the card to separate content sections.
 * This helps improve readability and organization of the information presented in the card.
 * This allows access to the properties of each partner (id, name, description) for rendering.
 * @property id - The unique identifier for each partner, used as the key prop in the View component
 * to ensure efficient rendering and updating of the list. Keys help React identify which items have changed,
 * are added, or are removed.
 * @property name - The name of the community partner, displayed in bold text for emphasis.
 * This helps highlight the partner's name and makes it easily identifiable for users
 * @component ListItem - A component from react-native-elements that represents a single item in a list.
 * It provides a structured layout for displaying information, including title and subtitle sections.
 * (Unlike the Directory component in DirectoryScreen, this ListItem will not need a onPress prop
 * nor the navigate function as, unlike the items in the Directory screen, the items in this list 
 * will not be links.)
 * @component ListItem.key - A special string attribute you need to include when creating lists of elements.
 * Keys help React identify which items have changed, are added, or are removed. They should be given
 * to the elements inside the array to give the elements a stable identity. The best way to pick a key
 * is to use a string that uniquely identifies a list item among its siblings. Most often you would use
 * IDs from your data as keys, similar to a database primary key.
 * @component Avatar - A component from react-native-elements that displays an image or icon representing a user or entity.
 * It is often used to show profile pictures or logos in a circular format.
 * @property rounded - A prop of the Avatar component that, when set to true, renders the avatar image in a circular shape.
 * This is commonly used for profile pictures to give them a more polished and visually appealing look.
 * @property source - A prop of the Avatar component that specifies the image source to be displayed.
 * It can take a local image (using require) or a remote image (using a URI).
 * In this case, it is used to display the partner's logo or image associated with their profile.
 * @property style - The style prop is used to apply custom styles to React Native components.
 * It allows you to customize the appearance and layout of components using a variety of style properties.
 * In this case, the style prop is used to apply bold font weight to the ListItem.Title component,
 * making the partner's name more prominent and easily identifiable for users.
 * @component ListItem.Content - A sub-component of ListItem that serves as a container for the main content of the list item.
 * It helps structure the layout of the list item by grouping related elements together.
 * @component ListItem.Title - A sub-component of ListItem.Content that displays the primary title or heading of the list item.
 * It is typically styled to stand out and indicate the main topic or name associated with the item.
 * @component ListItem.Subtitle - A sub-component of ListItem.Content that displays additional information or a subtitle related to the list item.
 * It is typically styled to be less prominent than the title, providing supplementary context or details about the item.
 * @property description - The description property of each partner object is passed to the ListItem.Subtitle component
 * to display a brief description of the community partner. This provides users with more context about
 * each partner and their role or significance.
 * @summary The AboutScreen component effectively utilizes React Native and react-native-elements components
 * to present information about the app and its community partners in a structured and visually appealing manner.
 * The use of state management with useState ensures that the partners data is handled efficiently,
 * while the mapping function allows for dynamic rendering of the list based on the data provided.
 * Overall, this component serves as an informative section of the app, highlighting its purpose and the
 * organizations it collaborates with.
 * @returns {JSX.Element} The About screen with the Community Partners section rendered inside a ScrollView and Card component.
 */