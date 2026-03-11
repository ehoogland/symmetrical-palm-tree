// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useState } from 'react';
import Constants from 'expo-constants';
import { Card, Rating } from 'react-native-elements';

export default function App() {
  const [rating, setRating] = useState(5);
  const [submittedMsg, setSubmittedMsg] = useState(
    'Submitted Rating: ' + rating
  );
/**
 * The Rating component is part of react-native-elements. 
 * The official docs are the best source:
 * Main docs: https://reactnativeelements.com/docs/
 * Direct Rating docs (props like ratingCount, fractions, 
 * type, readonly): https://reactnativeelements.com/docs/rating
 * 1. Added readonly to the overall rating component
 * 2. Added type="rocket" to both Rating components.
 * 3. Added fractions={10} to the submit rating component.
 * 4. Set both ratingCount to ratingCount={10}
 * 5. Show the second rating value in real-time.
 * 6. Added onPress to the Submit button to show the submitted rating.
 * 7. Added a submitted message below the button.
 */
  return (
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overall Rating</Text>
          <Rating
            startingValue={3}
            imageSize={20}
            style={styles.rating}
            readonly={true}
            type="rocket"
            ratingCount={10}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Submit Your Rating</Text>
          <Rating
            imageSize={36}
            startingValue={rating}
            style={styles.rating}
            onStartRating={(newRating) => setRating(newRating)}
            onFinishRating={(newRating) => setRating(newRating)}
            type="rocket"
            fractions={10}
            ratingCount={10}
          />

          <View style={styles.liveRating}>
            <Text>Rating: {rating.toFixed(1)}/10</Text>
          </View>

          <View style={styles.submitWrap}>
            <Button
              color="#5637DD"
              title="Submit"
              onPress={() => setSubmittedMsg('Submitted Rating: ' + rating.toFixed(1))}
            />
          </View>

          <View style={styles.submittedMsgWrap}>
            <Text>{submittedMsg}</Text>
          </View>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: Constants.statusBarHeight,
    padding: 12,
    backgroundColor: '#f8f8f8',
    alignItems: 'stretch',
  },
  card: {
    // make the card fill horizontally with some padding
    alignSelf: 'stretch',
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginHorizontal: 8,
  },
  section: {
    // layout each section vertically and center items
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    width: '100%',
  },
  sectionTitle: {
    alignSelf: 'flex-start',
    fontWeight: '600',
    marginBottom: 6,
    marginLeft: 6,
  },
  rating: {
    alignItems: 'center',
    padding: 10,
  },
  liveRating: {
    alignItems: 'center',
    paddingTop: 8,
  },
  submitWrap: {
    width: '60%',
    marginTop: 12,
    alignSelf: 'center',
  },
  submittedMsgWrap: {
    marginTop: 10,
    alignItems: 'center',
  },
});
