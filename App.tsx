import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';

export default function App() {
  const x = useSharedValue(0);

  const animateBox = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: x.value * 200}]
    }
  })

  const moveBox = () => {
    x.value = Math.random()
  }


  return (
    <GestureHandlerRootView style={{flex: 1}}>

    <Animated.View style={[styles.container, animateBox]}>
      <View style={styles.box} />
      
    </Animated.View>
    <Button title='Move' onPress={moveBox}/>

    </GestureHandlerRootView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  box: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'red'
  },

});
