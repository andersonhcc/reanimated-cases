import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

export const SecondAnimations: React.FC = () => {
  const moveBox = () => {

  }

  return (
    <Animated.View style={styles.container}>
      <View style={styles.box} />
    </Animated.View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-around',
  },
  box: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'red'
  },


});
