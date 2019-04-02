import {createStackNavigator} from 'react-navigation';
import BulletinDetailScreen from './BulletinScreen/Detail';
import BulletinListScreen from './BulletinScreen/List';
import CommunityDetailScreen from './CommunityScreen/Detail';
import CommunityListScreen from './CommunityScreen/List';
import TabNavigator from './TabNavigator';
import InfoModifyScreen from './UserScreen/InfoModify';
import PasswordModifyScreen from './UserScreen/PasswordModify';

export default createStackNavigator(
  {
    Tabs: TabNavigator,
    InfoModify: InfoModifyScreen,
    PasswordModify: PasswordModifyScreen,
    BulletinList: BulletinListScreen,
    BulletinDetail: BulletinDetailScreen,
    CommunityList: CommunityListScreen,
    CommunityDetail: CommunityDetailScreen,
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
