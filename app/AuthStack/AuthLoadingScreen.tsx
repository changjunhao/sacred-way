import AsyncStorage from '@react-native-community/async-storage';
import {inject, observer} from 'mobx-react';
import React, {Component} from 'react';
import {ActivityIndicator, StatusBar, View} from 'react-native';
import {StackActions} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {getUserInfo} from '../Services/user';

type ScreenNavigationProp = StackNavigationProp<any>;

interface InterfaceProps {
  UserStore: any;
  tokenStore: any;
  navigation: ScreenNavigationProp;
}

@inject('UserStore', 'tokenStore')
@observer
class AuthLoadingScreen extends Component<InterfaceProps, any> {
  constructor(props: Readonly<InterfaceProps>) {
    super(props);
    this.bootstrapAsync();
  }

  public render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
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
        this.props.navigation.reset({
          index: 0,
          routes: [{name: 'Auth'}],
        });
        return;
      }
      const userInfo = userInfoResult.data;
      this.props.UserStore.setInfo(userInfo);
      if (userInfo.status === 0) {
        this.props.navigation.dispatch(
          StackActions.replace('Auth', {
            screen: 'InfoEdit',
          }),
        );
      } else {
        this.props.navigation.reset({
          index: 0,
          routes: [{name: 'App'}],
        });
      }
    } else {
      this.props.navigation.reset({
        index: 0,
        routes: [{name: 'Auth'}],
      });
    }
  };
}

export default AuthLoadingScreen;
