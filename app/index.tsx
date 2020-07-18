import AsyncStorage from '@react-native-community/async-storage';
import {inject, observer} from 'mobx-react';
import React, {Component} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AppStack from './AppStack/';
import AuthStack from './AuthStack/';
import SplashScreen from './AuthStack/SplashScreen';
import InfoEditScreen from './AuthStack/InfoEditScreen';
import {getUserInfo} from './Services/user';

const Stack = createStackNavigator();

const Theme = {
  colors: {
    ...DefaultTheme.colors,
    background: 'rgb(255, 255, 255)',
  },
};
function InfoEdit() {
  return (
    <Stack.Navigator mode={'modal'}>
      <Stack.Screen
        name="InfoEdit"
        component={InfoEditScreen}
        options={InfoEditScreen.navigationOptions}
      />
    </Stack.Navigator>
  );
}

@inject('tokenStore', 'UserStore')
@observer
export default class RootStack extends Component<any, any> {
  constructor(props: Readonly<any>) {
    super(props);
    this.bootstrapAsync();
  }

  public render() {
    if (this.props.tokenStore.isLoading) {
      // We haven't finished checking for the token yet
      return <SplashScreen />;
    }
    return (
      <NavigationContainer
        theme={{
          ...DefaultTheme,
          ...Theme,
        }}>
        <Stack.Navigator headerMode={'none'}>
          {this.props.tokenStore.token ? (
            this.props.UserStore.infoEdit ? (
              <Stack.Screen name="InfoEdit" component={InfoEdit} />
            ) : (
              <Stack.Screen name="App" component={AppStack} />
            )
          ) : (
            <Stack.Screen name="Auth" component={AuthStack} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  private bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    if (userToken) {
      this.props.tokenStore.setToken(userToken);
      const userInfoResult = await getUserInfo();
      this.props.tokenStore.setIsLoading(false);
      if (userInfoResult.errno !== 0) {
        await AsyncStorage.clear();
        this.props.tokenStore.setToken('');
        return;
      }
      const userInfo = userInfoResult.data;
      this.props.UserStore.setInfo(userInfo);
      if (userInfo.status === 0) {
        this.props.UserStore.setInfoEdit(true);
      } else {
        this.props.UserStore.setInfoEdit(false);
      }
    } else {
      this.props.tokenStore.setIsLoading(false);
    }
  };
}
