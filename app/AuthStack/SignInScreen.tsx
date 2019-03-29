import AsyncStorage from '@react-native-community/async-storage';
import {inject, observer} from 'mobx-react/native'
import React, {Component} from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import {NavigationScreenProps, SafeAreaView} from 'react-navigation';
import LoginInput from '../Components/LoginInput';
import {login} from '../Services/user';
import styles from './Styles';

interface InterfaceStates {
  phone: string;
  password: string;
}

interface InterfaceProps extends NavigationScreenProps<{}> {
  UserStore;
  tokenStore;
}

@inject('UserStore', 'tokenStore')
@observer
export default class SignInScreen extends Component<InterfaceProps, InterfaceStates> {

  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      password: '',
    };
  }

  public render(): React.ReactNode {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              美秒短视频会员中心
            </Text>
          </View>
          <LoginInput
            keyboardType={'phone-pad'}
            placeholder={'请输入账号'}
            textContentType={'username'}
            onChangeText={(phone) => this.setState({phone})} />
          <LoginInput
            secureTextEntry={true}
            placeholder={'请输入密码'}
            textContentType={'password'}
            onChangeText={(password) => this.setState({password})} />
          <TouchableHighlight
            disabled={this.state.phone === '' && this.state.password === ''}
            onPressIn={this.handleLogin}
            underlayColor='white'>
            <View
              style={
                this.state.phone !== '' && this.state.password !== '' ?
                  {...styles.button, ...styles.buttonActive} :
                  {...styles.button, ...styles.buttonDisable}
              }>
              <Text style={styles.buttonText}>登录</Text>
            </View>
          </TouchableHighlight>
          <View style={styles.actionContainer}>
            <TouchableHighlight underlayColor='white' onPress={() => this.props.navigation.navigate('ResetPassword')}>
              <Text style={styles.actionButton}>忘记密码</Text>
            </TouchableHighlight>
            <TouchableHighlight underlayColor='white' onPress={() => this.props.navigation.navigate('SignUp')} >
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
      await AsyncStorage.setItem('userToken', response.usersign);
      this.props.navigation.navigate('App');
    }
  }
}
