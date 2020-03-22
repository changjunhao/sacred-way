import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ResetPasswordScreen from './ResetPasswordScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      mode={'modal'}
      headerMode={'none'}
      initialRouteName={'SignIn'}>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
}
