import React from 'react';
import {ActivityIndicator, StatusBar, View} from 'react-native';

const SplashScreen: React.FC = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
};

export default SplashScreen;
