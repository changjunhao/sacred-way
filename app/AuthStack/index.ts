import {createStackNavigator} from 'react-navigation';
import InfoEditScreen from './InfoEditScreen';
import ResetPasswordScreen from './ResetPasswordScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';

export default createStackNavigator(
  {
    SignIn: SignInScreen,
    SignUp: SignUpScreen,
    ResetPassword: ResetPasswordScreen,
    InfoEdit: InfoEditScreen,
  },
  {
    headerMode: 'none',
    mode: 'modal',
  },
);
