import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {FC, useContext, useState} from 'react';
import {Text, TouchableHighlight, View, SafeAreaView} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import AuthContext from '../context/authContext';
import UserContext from '../context/userContext';
import LoginInput from '../Components/LoginInput';
import {login} from '../Services/user';
import styles from './Styles';

type ScreenNavigationProp = StackNavigationProp<any>;

interface InterfaceProps {
  navigation: ScreenNavigationProp;
}

const SignInScreen: FC<InterfaceProps> = props => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const {dispatch} = useContext(AuthContext);
  const {userDispatch} = useContext(UserContext);

  const handleLogin = async () => {
    const response = await login({
      phone,
      password,
    });
    if (response) {
      await AsyncStorage.setItem('userToken', response.usersign);
      userDispatch({type: 'SET_INFO', info: response.user_info});
      userDispatch({
        type: 'SET_INFO_EDIT',
        infoEdit: response.user_info.status === 0,
      });
      dispatch({type: 'SIGN_IN', token: response.usersign});
    }
  };

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
          onChangeText={(val: string) => setPhone(val)}
        />
        <LoginInput
          secureTextEntry={true}
          placeholder={'请输入密码'}
          textContentType={'password'}
          onChangeText={(val: string) => setPassword(val)}
        />
        <TouchableHighlight
          disabled={phone === '' || password === ''}
          onPressIn={handleLogin}
          underlayColor="white">
          <View
            style={
              phone !== '' && password !== ''
                ? {...styles.button, ...styles.buttonActive}
                : {...styles.button, ...styles.buttonDisable}
            }>
            <Text style={styles.buttonText}>登录</Text>
          </View>
        </TouchableHighlight>
        <View style={styles.actionContainer}>
          <TouchableHighlight
            underlayColor="white"
            onPress={() => props.navigation.navigate('ResetPassword')}>
            <Text style={styles.actionButton}>忘记密码</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="white"
            onPress={() => props.navigation.navigate('SignUp')}>
            <Text style={styles.actionButton}>注册</Text>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;
