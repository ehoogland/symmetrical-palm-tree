import React, { useRef } from 'react';
import { Text, View, StyleSheet, Animated, Easing, Button } from 'react-native';
import Constants from 'expo-constants';
import { Card } from 'react-native-elements';

export default function App() {

  const textScaleValue = useRef(new Animated.Value(10)).current;
  const viewColorValue = useRef(new Animated.Value(0)).current;
  const viewPosYValue = useRef(new Animated.Value(0)).current;

  
  /**
   * CHALLENGE 2 Part 1
   * Since view was already mostly opaque, I changed the text color to white (see Part 2   
   * below at Animated.Text style...). Opacity range is [1..0.5], so the box becomes     
   * less opaque.
   */

  const opacityValue = useRef(new Animated.Value(1)).current;
  
  const animOpacity = Animated.timing(
    opacityValue, 
    {
      toValue: 0.5,
      duration: 3000,
      useNativeDriver: true,
    }
  );

  const animTextScale = Animated.timing(
    textScaleValue, {
        toValue: 30,
        duration: 2000,
        useNativeDriver: true
    }
  );

  const animViewColor = Animated.timing(
    viewColorValue,
    {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true
    }
  );
/**
 * Challenge 1: Easing
 * I used 
 */
  const animViewPosY = Animated.timing(
    viewPosYValue,
    {
      toValue: 1.1,
      duration: 750,
      easing: Easing.Exp,
      useNativeDriver: true
    }
  );

  const bgColor = viewColorValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['blue', 'yellow', 'red']
  });

  const posY = viewPosYValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -100, -300]
  })

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        Play around with the Animated code in the editor to learn more about how it works.
      </Text>
         <Button
        title="Click To Animate View Opacity"
        onPress={() => animOpacity.start()}
        
      />
      
      <Button
        title="Click To Animate Text Scale"
        onPress={() => animTextScale.start()}

      />
      <Button
        title="Click To Animate View Color"
        onPress={() => animViewColor.start()}
      />
      <Button
        title="Click To Animate View Position Y"
        onPress={() => animViewPosY.start()}
      />
      <Card> 

        <Animated.View style={{padding: 20,
         backgroundColor: bgColor,
          transform: [{translateY: posY}],
          opacity: opacityValue }}
          >
          {/* Challenge 2 part 2 - I changed text color to white for visibility.
          However, the opacity is changed to a number, not a string, to allow for
          transparency */}
          <Animated.Text style={{fontSize: textScaleValue,
           textAlign: 'center',
           color: '#fff',
            opacity: .8}}>   
            Animate Me 
          </Animated.Text>
        </Animated.View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    
    backgroundColor: '#ecf0f1',
    padding: 8,
  },

  paragraph: {
    margin: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

