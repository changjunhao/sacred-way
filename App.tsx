import { observer, Provider } from 'mobx-react/native';
import React, {Component} from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AppStack from './app/AppStack/';
import AuthStack from './app/AuthStack/';
import AuthLoadingScreen from './app/AuthStack/AuthLoadingScreen';
import Store from './app/Stores';
import TokenStore from './app/Stores/TokenStore';

const RootStack = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStack,
    App: AppStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
));

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
