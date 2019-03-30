import React, {Component} from 'react';
import {Text, TextInput, TouchableHighlight, View} from 'react-native';
import {NavigationScreenProps, SafeAreaView} from 'react-navigation';
import {sendMobileMessage, signUp} from '../Services/user';
import styles from './Styles';

interface InterfaceStates {
  phone: string;
  password: string;
  inviteCode: number;
  code: string;
  content: string;
  totalTime: number;
  canClick: boolean;
}

interface InterfaceProps extends NavigationScreenProps<{}> {}

export default class SignUpScreen extends Component<InterfaceProps, InterfaceStates> {

  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      password: '',
      inviteCode: 8286968, // 9115427
      code: '',
      content: '发送验证码',
      totalTime: 60,
      canClick: true,
    };
  }

  public render() {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              美秒短视频会员中心
            </Text>
            <Text style={styles.headerSubtitle}>
              注册
            </Text>
          </View>
          <View style={styles.inputView}>
            <Text style={styles.signUpInputLabel}>手机号</Text>
            <TextInput
              style={styles.input}
              placeholder={'请输入您的手机号'}
              keyboardType={'phone-pad'}
              textContentType={'username'}
              onChangeText={(phone) => this.setState({phone})} />
          </View>
          <View style={styles.inputView}>
            <Text style={styles.signUpInputLabel}>验证码</Text>
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
          <View style={styles.inputView}>
            <Text style={styles.signUpInputLabel}>密码</Text>
            <TextInput
              style={styles.input}
              placeholder={'请输入密码'}
              secureTextEntry={true}
              textContentType={'password'}
              onChangeText={(password) => this.setState({password})}/>
          </View>
          <TouchableHighlight
            disabled={this.state.phone === '' || this.state.password === '' || this.state.code === ''}
            onPressIn={this.signUp}
            underlayColor='white'>
            <View
              style={
                this.state.phone !== '' && this.state.password !== '' && this.state.code !== '' ?
                  {...styles.button, ...styles.buttonActive} :
                  {...styles.button, ...styles.buttonDisable}
              }>
              <Text style={styles.buttonText}>下一步</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight underlayColor='white' onPress={() => this.props.navigation.goBack()}>
            <View style={styles.signInTipView}>
              <Text style={styles.signInTip}>已有账号？请点击此处登录</Text>
            </View>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    );
  }

  private signUp = async () => {
    // this.props.navigation.navigate('InfoEdit');
    const result = await signUp({
      inviteCode: this.state.inviteCode,
      phone: this.state.phone,
      code: this.state.code,
      password: this.state.password,
    });
    if (Number(result.errno) === 0) {
      this.props.navigation.navigate('InfoEdit');
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
      type: 1,
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
