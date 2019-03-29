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
    InfoEdit: createStackNavigator({InfoEdit: InfoEditScreen}, {mode: 'modal'}),
  },
  {
    headerMode: 'none',
    mode: 'modal',
  },
);
