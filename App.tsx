/**
 * React Native Hello World App
 *
 * @format
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

function App(): JSX.Element {
  return (
      <View style={styles.centerView}>
        <Text>Sean Oh</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  centerView: {
    height: '100%', 
    justifyContent: 'center', 
    alignItems: 'center'}
});

export default App;
