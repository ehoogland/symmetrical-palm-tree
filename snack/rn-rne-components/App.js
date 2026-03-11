import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import Chip from './component/Chip';

export default function App() {
  const handleChipPress = (chipTitle) => {
    Alert.alert('Chip Pressed', `You pressed: ${chipTitle}`);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Chip Component Examples</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Chips</Text>
        <View style={styles.chipRow}>
          <Chip title="Solid Chip" onPress={() => handleChipPress('Solid Chip')} style={styles.chipSpacing} />
          <Chip title="Disabled Chip" disabled style={styles.chipSpacing} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Outlined Chips</Text>
        <View style={styles.chipRow}>
          <Chip title="Outlined Chip" type="outline" onPress={() => handleChipPress('Outlined Chip')} style={styles.chipSpacing} />
          <Chip title="Outlined & Disabled" type="outline" disabled style={styles.chipSpacing} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Different Sizes</Text>
        <View style={styles.chipRow}>
          <Chip title="Small" size="small" onPress={() => handleChipPress('Small')} style={styles.chipSpacing} />
          <Chip title="Medium" size="medium" onPress={() => handleChipPress('Medium')} style={styles.chipSpacing} />
          <Chip title="Large" size="large" onPress={() => handleChipPress('Large')} style={styles.chipSpacing} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Colors</Text>
        <View style={styles.chipRow}>
          <Chip 
            title="Success" 
            backgroundColor="#4CAF50"
            onPress={() => handleChipPress('Success')}
            style={styles.chipSpacing}
          />
          <Chip 
            title="Warning" 
            backgroundColor="#FF9800"
            onPress={() => handleChipPress('Warning')}
            style={styles.chipSpacing}
          />
          <Chip 
            title="Error" 
            backgroundColor="#F44336"
            onPress={() => handleChipPress('Error')}
            style={styles.chipSpacing}
          />
        </View>
      </View>

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 20,
    paddingTop: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  section: {
    marginBottom: 35,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#555',
    textAlign: 'center',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: -5,
    marginVertical: 10,
  },
  chipSpacing: {
    margin: 5,
  },
});
