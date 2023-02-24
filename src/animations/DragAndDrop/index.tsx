import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS
} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

type MeasureProps = {
  x: number;
  y: number;
  width: number;
  height: number;
};

import { Dimensions } from 'react-native';
const { width } = Dimensions.get("window");

export const DragAndDrop: React.FC = () => {

  const [measure, setMeasure] = useState<MeasureProps | null>(null);
  const redBox = useSharedValue({
    x: 0,
    y: 0,
    backgroundColor: 'pink',
  })
  const boxTrash = useRef<Animated.View>(null);
  const textTrash = useRef<Text>(null);

  const teste = () => {
    console.log("teste function js");
  }


  const newMethod = Gesture.Pan()
  .onUpdate(event => {
    redBox.value = {...redBox.value ,x: event.translationX , y: event.translationY}
    if(event.absoluteX >= (width * 0.19 + width * 0.5) && event.absoluteY <= (width * 0.19 + width * 0.08)){
      redBox.value = {...redBox.value, backgroundColor: 'red'}
    }
  })
  .onEnd(() => {
    redBox.value =  {x: 0, y:0, backgroundColor: 'pink'}
    runOnJS(teste)()
  })
  .onStart(e => {
    console.log({inital: e.absoluteX});
  })

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: !redBox.value.x ? withTiming(redBox.value.x, {duration: 1000}) : redBox.value.x,
        },
        {
          translateY: !redBox.value.y ? withTiming(redBox.value.y, {duration: 1000}) : redBox.value.y,
        },
      ],
      backgroundColor: redBox.value.backgroundColor
    };
  });


  return (
    <View style={styles.container}>

        <Animated.View style={styles.boxTrash} ref={boxTrash} onLayout={event => {
          setMeasure({
            height: event.nativeEvent.layout.height,
            width: event.nativeEvent.layout.width,
            x: event.nativeEvent.layout.x,
            y: event.nativeEvent.layout.y
          })
        }}>
          <Text style={styles.titleTrash} ref={textTrash}>{measure?.y}</Text>
        </Animated.View>

      <GestureDetector gesture={newMethod}>
        <Animated.View
          style={[styles.square, rStyle]}
        />
      </GestureDetector>

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
    height: 100,
    width: 100
  },
  boxTrash: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: 5,
    backgroundColor: 'gray',
    position: 'absolute',
    top: width * 0.08,
    right: width * 0.04,
    justifyContent: 'center',
  },
  titleTrash: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center'
  }
});
