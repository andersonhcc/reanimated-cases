import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, withRepeat, withSequence } from 'react-native-reanimated';

export const FirstAnimations = () => {
  const x = useSharedValue(0);
  const rotation = useSharedValue(0);

  const animateBox = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withSpring(x.value * 200) }]
    }
  })
  const animatedSecond = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withSpring(x.value * 200, {
        damping: 1, //10
        stiffness: 500,
      }) }]
    }
  })
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${rotation.value}deg` }],
    };
  });


  const moveBox = () => {
    x.value = Math.random();
  }

  const rotationBox = () => {
    rotation.value = withSequence(
      withTiming(-10, { duration: 50 }),
      withRepeat(withTiming(10, { duration: 1000 }), 6, true),
      withTiming(0, { duration: 50 })
    );
  }


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

      <View style={styles.container}>
        <Animated.View style={[styles.box, animateBox]} />

        <Animated.View style={[styles.box, animatedSecond]} />

        <Animated.View style={[styles.boxThree, animatedStyle]} />
      </View>
     
      <View style={styles.content}>
        <Button title='Move 1' onPress={moveBox}/>

        <Pressable  style={styles.click} onPress={moveBox} >
        <Text style={styles.title}>Move 2</Text>
      </Pressable>
        <Button title='Move 3' onPress={rotationBox}/>
      </View>



    </GestureHandlerRootView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-around',
  },
  content: {
    width: '100%',
    paddingBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'red'
  },
  boxThree: {
    width: 100,
    height: 100,
    backgroundColor: 'pink'
  },
  click: {
    marginTop: 10,
    width: 100,
    height: 40,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white'
  }

});
