import AsyncStorage from '@react-native-async-storage/async-storage';
import {inject, observer} from 'mobx-react';
import React, {Component} from 'react';
import {Text, TouchableHighlight, View, SafeAreaView} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import LoginInput from '../Components/LoginInput';
import {login} from '../Services/user';
import styles from './Styles';

interface InterfaceStates {
  phone: string;
  password: string;
}

type ScreenNavigationProp = StackNavigationProp<any>;

interface InterfaceProps {
  UserStore: any;
  tokenStore: any;
  navigation: ScreenNavigationProp;
}

@inject('UserStore', 'tokenStore')
@observer
export default class SignInScreen extends Component<
  InterfaceProps,
  InterfaceStates
> {
  constructor(props: Readonly<InterfaceProps>) {
    super(props);
    this.state = {
      phone: '',
      password: '',
    };
  }

  public render() {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>美秒短视频会员中心</Text>
          </View>
          <LoginInput
            keyboardType={'phone-pad'}
            placeholder={'请输入账号'}
            textContentType={'username'}
            onChangeText={(phone: any) => this.setState({phone})}
          />
          <LoginInput
            secureTextEntry={true}
            placeholder={'请输入密码'}
            textContentType={'password'}
            onChangeText={(password: any) => this.setState({password})}
          />
          <TouchableHighlight
            disabled={this.state.phone === '' || this.state.password === ''}
            onPressIn={this.handleLogin}
            underlayColor="white">
            <View
              style={
                this.state.phone !== '' && this.state.password !== ''
                  ? {...styles.button, ...styles.buttonActive}
                  : {...styles.button, ...styles.buttonDisable}
              }>
              <Text style={styles.buttonText}>登录</Text>
            </View>
          </TouchableHighlight>
          <View style={styles.actionContainer}>
            <TouchableHighlight
              underlayColor="white"
              onPress={() => this.props.navigation.navigate('ResetPassword')}>
              <Text style={styles.actionButton}>忘记密码</Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="white"
              onPress={() => this.props.navigation.navigate('SignUp')}>
              <Text style={styles.actionButton}>注册</Text>
            </TouchableHighlight>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  private handleLogin = async () => {
    const response = await login({
      phone: this.state.phone,
      password: this.state.password,
    });
    if (response) {
      this.props.tokenStore.setToken(response.usersign);
      this.props.UserStore.setInfo(response.user_info);
      await AsyncStorage.setItem('userToken', response.usersign);
      if (response.user_info.status === 0) {
        this.props.UserStore.setInfoEdit(true);
      }
    }
  };
}
