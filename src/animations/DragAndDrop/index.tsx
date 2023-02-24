import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming
} from 'react-native-reanimated';
import { PanGestureHandler, GestureDetector, Gesture } from 'react-native-gesture-handler';

type MeasureProps = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export const DragAndDrop: React.FC = () => {
  const [measure, setMeasure] = useState<MeasureProps | null>(null);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const boxTrash = useRef<Animated.View>(null);
  const textTrash = useRef<Text>(null);



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
      translateY.value = withTiming(0, {
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

  const tap = Gesture.Tap().onStart(() => {
    console.log('tap');
  });


  return (
    <View style={styles.container}>
      <GestureDetector gesture={tap}>

      <Animated.View style={styles.boxTrash} ref={boxTrash} onLayout={event => {
        setMeasure({
          height: event.nativeEvent.layout.height,
          width: event.nativeEvent.layout.width,
          x: event.nativeEvent.layout.x,
          y: event.nativeEvent.layout.y
        })
      }}>
        <Text style={styles.titleTrash} ref={textTrash}>{measure?.x}</Text>
      </Animated.View>

      
      </GestureDetector>

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
  boxTrash: {
    width: 120,
    height: 120,
    borderRadius: 5,
    backgroundColor: 'gray',
    position: 'absolute',
    top: 10,
    right: 0,
    marginVertical: 20,
    marginRight: 20,
    justifyContent: 'center',
  },
  titleTrash: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center'
  }
});
