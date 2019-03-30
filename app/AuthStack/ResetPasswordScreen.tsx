import React, {Component, Fragment} from 'react';
import {Alert, Text, TextInput, TouchableHighlight, View} from 'react-native';
import {NavigationScreenProps, SafeAreaView} from 'react-navigation';
import {checkVerificationCode, resetPassword, sendMobileMessage} from '../Services/user';
import styles from './Styles';

interface InterfaceStates {
  phone: string;
  password: string;
  repeatPassword: string;
  code: string;
  content: string;
  totalTime: number;
  canClick: boolean;
  next: boolean;
}

interface InterfaceProps extends NavigationScreenProps<{}> {}

export default class ResetPasswordScreen extends Component<InterfaceProps, InterfaceStates> {

  constructor(props) {
    super(props);
    this.state = {
      phone: '',
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
    const { next } = this.state;

    const VerificationCode = (
      <Fragment>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            autoFocus={true}
            placeholder={'请输入您的手机号'}
            keyboardType={'phone-pad'}
            textContentType={'username'}
            onChangeText={(phone) => this.setState({phone})} />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder={'请输入短信验证码'}
            keyboardType={'numeric'}
            textContentType={'oneTimeCode'}
            onChangeText={(code) => this.setState({code})}/>
          <TouchableHighlight underlayColor='white' onPress={this.sendMobileMessage} >
            <Text>{this.state.content}</Text>
          </TouchableHighlight>
        </View>
        <TouchableHighlight
          disabled={this.state.phone === '' || this.state.code === ''}
          onPressIn={this.next}
          underlayColor='white'>
          <View style={
            this.state.phone !== '' && this.state.code !== '' ?
              {...styles.button, ...styles.buttonActive} :
              {...styles.button, ...styles.buttonDisable}
          }>
            <Text style={styles.buttonText}>下一步</Text>
          </View>
        </TouchableHighlight>
      </Fragment>
    );

    const PassWord = (
      <Fragment>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder={'请输入新密码'}
            secureTextEntry={true}
            textContentType={'newPassword'}
            value={this.state.password}
            onChangeText={(password) => this.setState({password})}/>
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder={'请再次输入新密码'}
            secureTextEntry={true}
            textContentType={'newPassword'}
            value={this.state.repeatPassword}
            onChangeText={(repeatPassword) => this.setState({repeatPassword})}/>
        </View>
        <TouchableHighlight
          disabled={this.state.password === '' && this.state.repeatPassword === ''}
          onPressIn={this.resetPassword}
          underlayColor='white'>
          <View style={
            this.state.password !== '' && this.state.repeatPassword !== '' ?
              {...styles.button, ...styles.buttonActive} :
              {...styles.button, ...styles.buttonDisable}
          }>
            <Text style={styles.buttonText}>完成</Text>
          </View>
        </TouchableHighlight>
      </Fragment>
    );

    return (
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              美秒短视频会员中心
            </Text>
            <Text style={styles.headerSubtitle}>
              重置密码
            </Text>
          </View>
          <View style={!next ? {display: 'none'} : {}}>
            {PassWord}
          </View>
          <View style={next ? {display: 'none'} : {}}>
            {VerificationCode}
          </View>
        </View>
      </SafeAreaView>
    );
  }

  private next = async () => {
    const response = await checkVerificationCode({
      phone: this.state.phone,
      code: this.state.code,
    });
    if (response.errno !== 0) {
      Alert.alert(
        response.errmsg,
      );
    } else {
      this.setState({
        next: true,
      });
    }
  }

  private resetPassword = async () => {
    const response = await resetPassword({
      phone: this.state.phone,
      code: this.state.code,
      password: this.state.password,
      repeatPassword: this.state.repeatPassword,
    });
    if (response.errno !== 0) {
      Alert.alert(
        response.errmsg,
      );
    } else {
      this.props.navigation.goBack();
    }
  }

  private sendMobileMessage = async () => {
    if (!this.state.canClick) { return; }
    this.setState({
      canClick: false,
      content: `${this.state.totalTime}s`,
    });
    const siv = setInterval(() => {
      this.setState({
        totalTime: this.state.totalTime - 1,
        content: `${this.state.totalTime}s`,
      }, () => {
        if (this.state.totalTime === 0) {
          clearInterval(siv);
          this.setState({
            canClick: true,
            totalTime: 60,
            content: '重新发送',
          });
        }
      });
    }, 1000);
    const result = await sendMobileMessage({
      phone: this.state.phone,
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
  }
}
