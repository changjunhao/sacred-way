import React, {useEffect, useState} from 'react';
import {
  Text,
  TextInput,
  TouchableHighlight,
  View,
  SafeAreaView,
} from 'react-native';
import {sendMobileMessage, signUp} from '../Services/user';
import styles from './Styles';

const SignUpScreen: React.FC<Record<string, any>> = props => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [content, setContent] = useState('发送验证码');
  const [totalTime, setTotalTime] = useState(60);
  const [canClick, setCanClick] = useState(true);
  const [siv, setSiv] = useState<NodeJS.Timeout>();

  useEffect(() => {
    if (totalTime === 0) {
      clearInterval(Number(siv));
      setCanClick(true);
      setTotalTime(60);
      setContent('重新发送');
    }
  }, [siv, totalTime]);

  useEffect(() => {
    return () => {
      if (siv) {
        clearInterval(Number(siv));
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSignUp = async () => {
    const result = await signUp({
      phone,
      code,
      password,
    });
    if (Number(result.errno) === 0) {
      props.UserStore.setInfoEdit(true);
    }
  };

  const handleSendMobileMessage = async () => {
    if (!canClick) {
      return;
    }
    setCanClick(false);
    setContent(`${totalTime}s`);
    const interval = setInterval(() => {
      setTotalTime(totalTime - 1);
      setContent(`${totalTime}s`);
    }, 1000);
    setSiv(interval);
    const result = await sendMobileMessage({
      phone,
      type: 1,
    });
    if (Number(result.errno) !== 0) {
      clearInterval(Number(siv));
      setTimeout(() => {
        setCanClick(true);
        setTotalTime(60);
        setContent('发送验证码');
      }, 1500);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>美秒短视频会员中心</Text>
          <Text style={styles.headerSubtitle}>注册</Text>
        </View>
        <View style={styles.inputView}>
          <Text style={styles.signUpInputLabel}>手机号</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor={'#8E8E8E'}
            placeholder={'请输入您的手机号'}
            keyboardType={'phone-pad'}
            textContentType={'username'}
            onChangeText={value => setPhone(value)}
          />
        </View>
        <View style={styles.inputView}>
          <Text style={styles.signUpInputLabel}>验证码</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor={'#8E8E8E'}
            placeholder={'请输入短信验证码'}
            keyboardType={'numeric'}
            textContentType={'oneTimeCode'}
            onChangeText={value => setCode(value)}
          />
          <TouchableHighlight
            underlayColor="white"
            onPress={handleSendMobileMessage}>
            <Text>{content}</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.inputView}>
          <Text style={styles.signUpInputLabel}>密码</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor={'#8E8E8E'}
            placeholder={'请输入密码'}
            secureTextEntry={true}
            textContentType={'password'}
            onChangeText={value => setPassword(value)}
          />
        </View>
        <TouchableHighlight
          disabled={phone === '' || password === '' || code === ''}
          onPressIn={handleSignUp}
          underlayColor="white">
          <View
            style={
              phone !== '' && password !== '' && code !== ''
                ? {...styles.button, ...styles.buttonActive}
                : {...styles.button, ...styles.buttonDisable}
            }>
            <Text style={styles.buttonText}>下一步</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor="white"
          onPress={() => props.navigation.goBack()}>
          <View style={styles.signInTipView}>
            <Text style={styles.signInTip}>已有账号？请点击此处登录</Text>
          </View>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;
