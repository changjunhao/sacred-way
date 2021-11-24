import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ResetPasswordScreen from './ResetPasswordScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';

const Stack = createStackNavigator();

const AuthStack: React.FC = () => (
  <Stack.Navigator
    initialRouteName={'SignIn'}
    screenOptions={{presentation: 'modal', headerShown: false}}>
    <Stack.Screen name="SignIn" component={SignInScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
    <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
  </Stack.Navigator>
);

export default AuthStack;
