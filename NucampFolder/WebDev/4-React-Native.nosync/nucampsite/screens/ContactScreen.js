import React from 'react';
import { ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Card, Text} from 'react-native-elements';   

const ContactScreen = () => {
    return (
      <ScrollView>
        <Animatable.View
            animation='fadeInDown'
            duration={2000}
            delay={1000}
        >
          <Card wrapperStyle={{margin: 20}}>
            <Card.Title>Contact Information</Card.Title>
              <Card.Divider/>
              <Text>1 Nucamp Way</Text>
            <Text>Seattle, WA 98001</Text>
            <Text style={{marginBottom: 5}}>U.S.A.</Text>
              <Text>Phone: 1-206-555-1234</Text>
              <Text>Email: campsites@nucamp.co</Text>
          </Card>
        </Animatable.View>
      </ScrollView>
  );
};

export default ContactScreen;

/**
 * ContactScreen Notes
 * @function Contact Screen functional component
 * @description
 * The ContactScreen component displays the contact information for the campsite.
 * @ScrollView allows for scrolling if the content exceeds the screen size, and a
 * @Card component from react-native-elements to present the contact details in a styled card format.
 * @component Card.wrapperStyle - A prop used to apply custom styles to the card's container,
 * such as margin, padding, background color, etc.
 * The outer curly braces {} indicate that we are embedding a JavaScript expression within JSX.
 * The inner curly braces {} define a JavaScript object containing the styles to be applied.
 * @component Card.title - A component to display the title of the card
 * @component Card.Divider - A component that adds a visual divider line to separate content sections.
 * @returns {JSX.Element} The Contact screen wrapped in a ScrollView and Card component.
 */
