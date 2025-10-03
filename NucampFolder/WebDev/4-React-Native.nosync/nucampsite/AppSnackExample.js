import React, { useRef } from 'react';
import { Text, View, StyleSheet, Animated, Easing, Button, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { Card } from 'react-native-elements';

export default function App() {
  const textScaleValue = useRef(new Animated.Value(1)).current;
  const viewColorValue = useRef(new Animated.Value(0)).current;
  const viewPosYValue = useRef(new Animated.Value(0)).current;
  
  // ADDED: animated value used to drive the top button's text color
  // starts at 0 (white) and animates to 1 (button color)
  const textColorAnim = useRef(new Animated.Value(0)).current;

  // ADDED: helper to animate the text color to match the button background (one-way)
  const makeTextSameColor = () => {
    Animated.timing(textColorAnim, {
      toValue: 1,
      duration: 400,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false // color interpolation requires JS driver
    }).start();
  };

  // ADDED: interpolated color used by the Animated.Text in the button
  const animatedTextColor = textColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#FFFFFF', '#5637DD'] // white -> project button color
  });

  const animTextScale = Animated.timing(textScaleValue, {
    toValue: 2,
    duration: 800,
    easing: Easing.out(Easing.ease),
    useNativeDriver: true
  });

  const animViewColor = Animated.timing(viewColorValue, {
    toValue: 1,
    duration: 1500,
    easing: Easing.inOut(Easing.ease),
    useNativeDriver: false
  });

  /* Question 1: Easing.inOut zoomed in text and box significantly, then zoomed out a tad */
  const animViewPosY = Animated.timing(viewPosYValue, {
    toValue: 1,
    duration: 900,
    easing: Easing.out(Easing.ease),
    useNativeDriver: true
  });

  const bgColor = viewColorValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#2196F3', '#FF5252']
  });

  const posY = viewPosYValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -160]
  });

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        Play around with the Animated code in the editor to learn more about how it works.
      </Text>

      {/* ADDED: figure-ground button
          - initial appearance matches other buttons (blue background, white text)
          - onPress animates the text color from white -> button color (one-way)
          - also triggers the existing animViewPosY action */}
      <TouchableOpacity onPress={() => { makeTextSameColor(); animViewPosY.start(); }} activeOpacity={0.8}>
        <Animated.View style={[styles.topButton, { backgroundColor: '#5637DD' }]}>
          <Animated.Text style={[styles.topButtonText, { color: animatedTextColor }]}>
            Click To Animate View Position
          </Animated.Text>
        </Animated.View>
      </TouchableOpacity>
      {/* END ADDED */}
  
      <View style={styles.buttonGroup}>
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
      </View>

      <Card>          
        <Animated.View style={{padding: 20, backgroundColor: bgColor, transform: [{translateY: posY}]}}>
          <Animated.Text style={{ transform: [{ scale: textScaleValue }], textAlign: 'center' }}>
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
  // ADDED: minimal styles for the top button so it visually matches existing buttons
  topButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginVertical: 6
  },
  topButtonText: {
    fontSize: 16,
    fontWeight: '500'
  },
  // group the Buttons so JSX is valid and spacing is nicer
  buttonGroup: {
    marginVertical: 8,
    justifyContent: 'space-between',
    height: 140
  }
});
