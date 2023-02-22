import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {FirstAnimations} from './src/animations/FirstAnimations';
import { SecondAnimations } from './src/animations/SecondAnimations';
import { Button, View } from 'react-native';
import React, { useState } from 'react';

export default function App() {
  const [firstAnimations, setFirstAnimations] = useState(true);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

      {firstAnimations ?

        <>
          <FirstAnimations />
          <View style={{ paddingBottom: 20 }}>
            <Button title="Second Animation" onPress={() => setFirstAnimations(false)} />
          </View>
        </> : <>
          <SecondAnimations />
          <View style={{ paddingBottom: 20 }}>
            <Button title="First Animation" onPress={() => setFirstAnimations(true)} />
          </View>
        </>}


    </GestureHandlerRootView>

  );
}

