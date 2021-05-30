import React, {useEffect, useState} from 'react';
import {
  Alert,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  SafeAreaView,
} from 'react-native';
import {
  checkVerificationCode,
  resetPassword,
  sendMobileMessage,
} from '../Services/user';
import styles from './Styles';

const ResetPasswordScreen: React.FC<Record<string, any>> = props => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [code, setCode] = useState('');
  const [content, setContent] = useState('发送验证码');
  const [totalTime, setTotalTime] = useState(60);
  const [canClick, setCanClick] = useState(true);
  const [next, setNext] = useState(false);
  const [siv, setSiv] = useState<NodeJS.Timeout>();

  const handleNext = async () => {
    const response = await checkVerificationCode({
      phone,
      code,
    });
    if (response.errno !== 0) {
      Alert.alert(response.errmsg);
    } else {
      setNext(true);
    }
  };

  const handleResetPassword = async () => {
    const response = await resetPassword({
      phone,
      code,
      password,
      repeatPassword,
    });
    if (response.errno !== 0) {
      Alert.alert(response.errmsg);
    } else {
      props.navigation.goBack();
    }
  };

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
      type: 0,
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

  const VerificationCode = (
    <>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          autoFocus={true}
          placeholderTextColor={'#8E8E8E'}
          placeholder={'请输入您的手机号'}
          keyboardType={'phone-pad'}
          textContentType={'username'}
          onChangeText={value => setPhone(value)}
        />
      </View>
      <View style={styles.inputView}>
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
      <TouchableHighlight
        disabled={phone === '' || code === ''}
        onPressIn={handleNext}
        underlayColor="white">
        <View
          style={
            phone !== '' && code !== ''
              ? {...styles.button, ...styles.buttonActive}
              : {...styles.button, ...styles.buttonDisable}
          }>
          <Text style={styles.buttonText}>下一步</Text>
        </View>
      </TouchableHighlight>
    </>
  );

  const PassWord = (
    <>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholderTextColor={'#8E8E8E'}
          placeholder={'请输入新密码'}
          secureTextEntry={true}
          textContentType={'newPassword'}
          value={password}
          onChangeText={value => setPassword(value)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholderTextColor={'#8E8E8E'}
          placeholder={'请再次输入新密码'}
          secureTextEntry={true}
          textContentType={'newPassword'}
          value={repeatPassword}
          onChangeText={value => setRepeatPassword(value)}
        />
      </View>
      <TouchableHighlight
        disabled={password === '' && repeatPassword === ''}
        onPressIn={handleResetPassword}
        underlayColor="white">
        <View
          style={
            password !== '' && repeatPassword !== ''
              ? {...styles.button, ...styles.buttonActive}
              : {...styles.button, ...styles.buttonDisable}
          }>
          <Text style={styles.buttonText}>完成</Text>
        </View>
      </TouchableHighlight>
    </>
  );

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>美秒短视频会员中心</Text>
          <Text style={styles.headerSubtitle}>重置密码</Text>
        </View>
        <View style={!next ? {display: 'none'} : {}}>{PassWord}</View>
        <View style={next ? {display: 'none'} : {}}>{VerificationCode}</View>
      </View>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;
