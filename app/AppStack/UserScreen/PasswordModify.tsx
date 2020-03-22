import AsyncStorage from '@react-native-community/async-storage';
import {inject, observer} from 'mobx-react';
import React, {Component, Fragment} from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import InputStyles from '../../AuthStack/Styles';
import {scaleSize, setSpText2} from '../../Lib/ScreenUtil';
import {
  checkVerificationCode,
  resetPassword,
  sendMobileMessage,
} from '../../Services/user';

interface InterfaceStates {
  password: string;
  repeatPassword: string;
  code: string;
  content: string;
  totalTime: number;
  canClick: boolean;
  next: boolean;
}

type ScreenNavigationProp = StackNavigationProp<any>;

interface InterfaceProps {
  UserStore: any;
  tokenStore: any;
  navigation: ScreenNavigationProp;
}

@inject('UserStore', 'tokenStore')
@observer
export default class PasswordModify extends Component<
  InterfaceProps,
  InterfaceStates
> {
  constructor(props: Readonly<InterfaceProps>) {
    super(props);
    this.state = {
      password: '',
      repeatPassword: '',
      code: '',
      content: '发送验证码',
      totalTime: 60,
      canClick: true,
      next: false,
    };
  }

  public render() {
    const {next} = this.state;

    const VerificationCode = (
      <Fragment>
        <View>
          <Text style={styles.phone}>当前注册手机号</Text>
          <Text style={styles.phone}>
            {this.props.UserStore.info.mobile_number.replace(
              /^(\d{3})\d{4}(\d+)/,
              '$1****$2',
            )}
          </Text>
        </View>
        <View style={InputStyles.inputView}>
          <TextInput
            style={InputStyles.input}
            placeholderTextColor={'#8E8E8E'}
            placeholder={'请输入验证码'}
            keyboardType={'numeric'}
            textContentType={'oneTimeCode'}
            onChangeText={code => this.setState({code})}
          />
          <TouchableHighlight
            underlayColor="white"
            onPress={this.sendMobileMessage}>
            <Text>{this.state.content}</Text>
          </TouchableHighlight>
        </View>
        <TouchableHighlight
          disabled={this.state.code === ''}
          onPressIn={this.next}
          underlayColor="white">
          <View
            style={
              this.state.code !== ''
                ? {...InputStyles.button, ...InputStyles.buttonActive}
                : {...InputStyles.button, ...InputStyles.buttonDisable}
            }>
            <Text style={InputStyles.buttonText}>下一步</Text>
          </View>
        </TouchableHighlight>
      </Fragment>
    );

    const PassWord = (
      <Fragment>
        <View style={InputStyles.inputView}>
          <TextInput
            style={InputStyles.input}
            placeholderTextColor={'#8E8E8E'}
            placeholder={'请输入新密码'}
            secureTextEntry={true}
            textContentType={'newPassword'}
            value={this.state.password}
            onChangeText={password => this.setState({password})}
          />
        </View>
        <View style={InputStyles.inputView}>
          <TextInput
            style={InputStyles.input}
            placeholderTextColor={'#8E8E8E'}
            placeholder={'请再次输入新密码'}
            secureTextEntry={true}
            textContentType={'newPassword'}
            value={this.state.repeatPassword}
            onChangeText={repeatPassword => this.setState({repeatPassword})}
          />
        </View>
        <TouchableHighlight
          disabled={
            this.state.password === '' && this.state.repeatPassword === ''
          }
          onPressIn={this.resetPassword}
          underlayColor="white">
          <View
            style={
              this.state.password !== '' && this.state.repeatPassword !== ''
                ? {...InputStyles.button, ...InputStyles.buttonActive}
                : {...InputStyles.button, ...InputStyles.buttonDisable}
            }>
            <Text style={InputStyles.buttonText}>完成</Text>
          </View>
        </TouchableHighlight>
      </Fragment>
    );

    return (
      <SafeAreaView>
        <View style={{...InputStyles.container, paddingTop: scaleSize(20)}}>
          <View style={!next ? {display: 'none'} : {}}>{PassWord}</View>
          <View style={next ? {display: 'none'} : {}}>{VerificationCode}</View>
        </View>
      </SafeAreaView>
    );
  }

  private next = async () => {
    const response = await checkVerificationCode({
      phone: this.props.UserStore.info.mobile_number,
      code: this.state.code,
    });
    if (response.errno !== 0) {
      Alert.alert(response.errmsg);
    } else {
      this.setState({
        next: true,
      });
    }
  };

  private resetPassword = async () => {
    const response = await resetPassword({
      phone: this.props.UserStore.info.mobile_number,
      code: this.state.code,
      password: this.state.password,
      repeatPassword: this.state.repeatPassword,
    });
    if (response.errno !== 0) {
      Alert.alert(response.errmsg);
    } else {
      Alert.alert(
        '提示',
        '密码已修改，请重新登录',
        [{text: '确定', onPress: () => this.signOutAsync()}],
        {cancelable: false},
      );
    }
  };

  private signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.tokenStore.setToken('');
  };

  private sendMobileMessage = async () => {
    if (!this.state.canClick) {
      return;
    }
    this.setState({
      canClick: false,
      content: `${this.state.totalTime}s`,
    });
    const siv = setInterval(() => {
      this.setState(
        {
          totalTime: this.state.totalTime - 1,
          content: `${this.state.totalTime}s`,
        },
        () => {
          if (this.state.totalTime === 0) {
            clearInterval(siv);
            this.setState({
              canClick: true,
              totalTime: 60,
              content: '重新发送',
            });
          }
        },
      );
    }, 1000);
    const result = await sendMobileMessage({
      phone: this.props.UserStore.info.mobile_number,
      type: 0,
    });
    if (Number(result.errno) !== 0) {
      clearInterval(siv);
      setTimeout(() => {
        this.setState({
          canClick: true,
          totalTime: 60,
          content: '发送验证码',
        });
      }, 1500);
    }
  };
}

const styles = StyleSheet.create({
  phone: {
    color: '#272A32',
    textAlign: 'center',
    fontSize: setSpText2(15),
  },
});
