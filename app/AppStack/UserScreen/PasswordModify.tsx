import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {FC, Fragment, useContext, useState} from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import AuthContext from '../../context/authContext';
import UserContext from '../../context/userContext';
import InputStyles from '../../AuthStack/Styles';
import {
  checkVerificationCode,
  resetPassword,
  sendMobileMessage,
} from '../../Services/user';
import {scaleSize, setSpText2} from '../../Lib/ScreenUtil';

const PasswordModify: FC = () => {
  const {userState} = useContext(UserContext);
  const {dispatch} = useContext(AuthContext);

  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [content, setContent] = useState('发送验证码');
  const [totalTime, setTotalTime] = useState(60);
  const [canClick, setCanClick] = useState(true);
  const [code, setCode] = useState('');
  const [next, setNext] = useState(false);

  const handleNext = async () => {
    const response = await checkVerificationCode({
      phone: userState.info.mobile_number,
      code: code,
    });
    if (response.errno !== 0) {
      Alert.alert(response.errmsg);
    } else {
      setNext(true);
    }
  };

  const handleResetPassword = async () => {
    const response = await resetPassword({
      phone: userState.info.mobile_number,
      code,
      password,
      repeatPassword,
    });
    if (response.errno !== 0) {
      Alert.alert(response.errmsg);
    } else {
      Alert.alert(
        '提示',
        '密码已修改，请重新登录',
        [{text: '确定', onPress: () => signOutAsync()}],
        {cancelable: false},
      );
    }
  };

  const signOutAsync = async () => {
    await AsyncStorage.clear();
    dispatch({type: 'SIGN_OUT'});
  };

  const handleSendMobileMessage = async () => {
    if (!canClick) {
      return;
    }
    setCanClick(false);
    setContent(`${totalTime}s`);
    const siv = setInterval(() => {
      const t = totalTime - 1;
      setContent(`${totalTime}s`);
      setTotalTime(t);

      if (t === 0) {
        clearInterval(siv);
        setCanClick(true);
        setContent('重新发送');
        setTotalTime(60);
      }
    }, 1000);
    const result = await sendMobileMessage({
      phone: userState.info.mobile_number,
      type: 0,
    });
    if (Number(result.errno) !== 0) {
      clearInterval(siv);
      setTimeout(() => {
        setCanClick(true);
        setContent('发送验证码');
        setTotalTime(60);
      }, 1500);
    }
  };

  const VerificationCode = (
    <Fragment>
      <View>
        <Text style={styles.phone}>当前注册手机号</Text>
        <Text style={styles.phone}>
          {userState.info.mobile_number.replace(
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
          onChangeText={val => setCode(val)}
        />
        <TouchableHighlight
          underlayColor="white"
          onPress={handleSendMobileMessage}>
          <Text>{content}</Text>
        </TouchableHighlight>
      </View>
      <TouchableHighlight
        disabled={code === ''}
        onPressIn={handleNext}
        underlayColor="white">
        <View
          style={
            code !== ''
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
          value={password}
          onChangeText={val => setPassword(val)}
        />
      </View>
      <View style={InputStyles.inputView}>
        <TextInput
          style={InputStyles.input}
          placeholderTextColor={'#8E8E8E'}
          placeholder={'请再次输入新密码'}
          secureTextEntry={true}
          textContentType={'newPassword'}
          value={repeatPassword}
          onChangeText={val => setRepeatPassword(val)}
        />
      </View>
      <TouchableHighlight
        disabled={password === '' && repeatPassword === ''}
        onPressIn={handleResetPassword}
        underlayColor="white">
        <View
          style={
            password !== '' && repeatPassword !== ''
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
      <View
        style={{
          ...InputStyles.container,
          paddingTop: scaleSize(20),
        }}>
        <View style={!next ? {display: 'none'} : {}}>{PassWord}</View>
        <View style={next ? {display: 'none'} : {}}>{VerificationCode}</View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  phone: {
    color: '#272A32',
    textAlign: 'center',
    fontSize: setSpText2(15),
  },
});

export default PasswordModify;
