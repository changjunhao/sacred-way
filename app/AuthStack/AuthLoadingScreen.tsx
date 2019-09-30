import AsyncStorage from '@react-native-community/async-storage';
import { inject, observer } from 'mobx-react/native';
import React, {Component} from 'react';
import {ActivityIndicator, StatusBar, View} from 'react-native';
import {NavigationActions, NavigationSwitchScreenProps, StackActions} from 'react-navigation';
import {getUserInfo} from '../Services/user';

interface InterfaceProps extends NavigationSwitchScreenProps<{}> {
  UserStore;
  tokenStore;
}

@inject('UserStore', 'tokenStore')
@observer
class AuthLoadingScreen extends Component<InterfaceProps, {}> {
  constructor(props) {
    super(props);
    this.bootstrapAsync();
  }

  public render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
        <StatusBar barStyle='default' />
      </View>
    );
  }

  private bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    if (userToken) {
      this.props.tokenStore.setToken(userToken);
      const userInfoResult = await getUserInfo();
      if (userInfoResult.errno !== 0) {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
        return;
      }
      const userInfo = userInfoResult.data;
      this.props.UserStore.setInfo(userInfo);
      if (userInfo.status === 0) {
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'InfoEdit' })],
        });
        this.props.navigation.dispatch(resetAction);
      } else {
        this.props.navigation.navigate( 'App');
      }
    } else {
      this.props.navigation.navigate('Auth');
    }
  }
}

export default AuthLoadingScreen;
