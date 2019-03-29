import {createStackNavigator} from 'react-navigation';
import TabNavigator from './TabNavigator';
import InfoModifyScreen from './UserScreen/InfoModify';
import PasswordModifyScreen from './UserScreen/PasswordModify';

export default createStackNavigator(
  {
    Tabs: TabNavigator,
    InfoModify: InfoModifyScreen,
    PasswordModify: PasswordModifyScreen,
  },
  {
    defaultNavigationOptions: {
      title: '美秒短视频会员中心',
      headerTintColor: '#333',
      // headerTransparent: true,
      // headerStyle: {
      //   backgroundColor: 'rgb(255, 255, 255)',
      // }
    },
  },
);
