import {createStackNavigator} from 'react-navigation-stack';
import BulletinDetailScreen from './BulletinScreen/Detail';
import BulletinListScreen from './BulletinScreen/List';
import CommunityDetailScreen from './CommunityScreen/Detail';
import CommunityListScreen from './CommunityScreen/List';
import CourseDetailScreen from './CourseScreen/Detail';
import SpecialColumnDetailScreen from './SpecialColumnScreen/Detail';
import TabNavigator from './TabNavigator';
import EarningsScreen from './UserScreen/Earnings';
import InfoModifyScreen from './UserScreen/InfoModify';
import InviterScreen from './UserScreen/Inviter';
import PasswordModifyScreen from './UserScreen/PasswordModify';
import VisitedScreen from './UserScreen/Visited';

export default createStackNavigator(
  {
    Tabs: TabNavigator,
    InfoModify: InfoModifyScreen,
    PasswordModify: PasswordModifyScreen,
    BulletinList: BulletinListScreen,
    BulletinDetail: BulletinDetailScreen,
    CommunityList: CommunityListScreen,
    CommunityDetail: CommunityDetailScreen,
    SpecialColumnDetail: SpecialColumnDetailScreen,
    CourseDetail: CourseDetailScreen,
    Earnings: EarningsScreen,
    Visited: VisitedScreen,
    Inviter: InviterScreen,
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
