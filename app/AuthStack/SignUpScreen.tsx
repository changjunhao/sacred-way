import React, {useContext, useEffect, useState} from 'react';
import {
  Alert,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserContext from '../context/userContext';
import {sendMobileMessage, signUp} from '../Services/user';
import styles from './Styles';

const SignUpScreen: React.FC<Record<string, any>> = props => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [content, setContent] = useState('发送验证码');
  const [totalTime, setTotalTime] = useState(60);
  const [canClick, setCanClick] = useState(true);
  const [siv, setSiv] = useState<number>();

  const {userDispatch} = useContext(UserContext);

  useEffect(() => {
    return () => {
      if (siv) {
        clearInterval(Number(siv));
      }
    };
  }, [siv]);

  const handleSignUp = async () => {
    const result = await signUp({
      phone,
      code,
      password,
    });
    if (result && Number(result.errno) === 0) {
      userDispatch({type: 'SET_INFO_EDIT', infoEdit: true});
    } else if (result && result.errno !== 0) {
      Alert.alert(result.errmsg || '注册失败');
    }
  };

  const handleSendMobileMessage = async () => {
    if (!canClick) {
      return;
    }
    setCanClick(false);
    setContent(`${totalTime}s`);
    const interval = setInterval(() => {
      setTotalTime(prev => {
        const next = prev - 1;
        setContent(`${next}s`);
        if (next === 0) {
          clearInterval(interval);
          setCanClick(true);
          setTotalTime(60);
          setContent('重新发送');
          return 60;
        }
        return next;
      });
    }, 1000);
    setSiv(interval);
    const result = await sendMobileMessage({
      phone,
      type: 1,
    });
    if (!result || Number(result.errno) !== 0) {
      clearInterval(Number(interval));
      setCanClick(true);
      setTotalTime(60);
      setContent('发送验证码');
      if (result) {
        Alert.alert(result.errmsg || '发送失败');
      }
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
