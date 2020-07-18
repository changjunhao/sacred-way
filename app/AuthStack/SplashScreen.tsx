import React from 'react';
import {ActivityIndicator, StatusBar, View} from 'react-native';

export default function SplashScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
}
