import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import InfoEditScreen from './InfoEditScreen';
import ResetPasswordScreen from './ResetPasswordScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';

const Stack = createStackNavigator();

function InfoEdit() {
  return (
    <Stack.Navigator mode={'modal'}>
      <Stack.Screen
        name="InfoEdit"
        component={InfoEditScreen}
        options={InfoEditScreen.navigationOptions}
      />
    </Stack.Navigator>
  );
}

export default function AuthStack() {
  return (
    <Stack.Navigator
      mode={'modal'}
      headerMode={'none'}
      initialRouteName={'SignIn'}>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="InfoEdit" component={InfoEdit} />
    </Stack.Navigator>
  );
}
