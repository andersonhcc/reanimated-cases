import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useAnimatedGestureHandler, useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

export const DragAndDrop: React.FC = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (event, context: { translateX: number, translateY: number }) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
    onEnd: (event, context) => {
        translateX.value = withTiming(0, {
          duration: 2000,
        });
        translateY.value = withTiming(0,{
          duration: 2000,
        });
    },
  })
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });


  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View
          style={[styles.square, rStyle]}
        />
      </PanGestureHandler>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropzone: {
    backgroundColor: 'red',
  },
  square: {
    borderRadius: 15,
    backgroundColor: 'pink',
    height: 100,
    width: 100
  },
});
