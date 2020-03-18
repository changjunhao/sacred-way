import {observer, Provider} from 'mobx-react';
import React, {Component} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AppStack from './app/AppStack/';
import AuthStack from './app/AuthStack/';
import AuthLoadingScreen from './app/AuthStack/AuthLoadingScreen';
import Store from './app/Stores';
import TokenStore from './app/Stores/TokenStore';

const Stack = createStackNavigator();

const Theme = {
  colors: {
    ...DefaultTheme.colors,
    background: 'rgb(255, 255, 255)',
  },
};

function RootStack() {
  return (
    <NavigationContainer theme={{...DefaultTheme, ...Theme}}>
      <Stack.Navigator headerMode={'none'}>
        <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} />
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="App" component={AppStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

@observer
export default class App extends Component<{}> {
  public render() {
    return (
      <Provider {...Store} tokenStore={TokenStore}>
        <RootStack />
      </Provider>
    );
  }
}
