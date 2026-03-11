import React, { useState } from 'react';
import Constants from 'expo-constants';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Card, Rating } from 'react-native-elements';

export default function App() {
  const [rating, setRating] = useState(5);
  const [submittedMsg, setSubmittedMsg] = useState(
    'Submitted Rating: ' + rating
  );

  return (
    <View style={styles.container}>
      <Card>
        <Text>Overall Rating</Text>
        <Rating
          startingValue={3}
          imageSize={20}
          style={{ alignItems: 'center', padding: 10 }}
        />
        <Text>Submit Your Rating</Text>
        <Rating
          imageSize={20}
          startingValue={rating}
          style={{ alignItems: 'center' }}
          onFinishRating={(newRating) => setRating(newRating)}
        />
        <View style={{ margin: 20 }}>
          <Button color="#5637DD" title="Submit" />
        </View>
        <View style={{ margin: 10 }}>
          <Text>{submittedMsg}</Text>
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
    padding: 8,
  },
});
