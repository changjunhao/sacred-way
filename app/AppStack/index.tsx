import React from 'react';
import {Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import FindScreen from './FindScreen';
import MemberScreen from './MemberScreen';
import MyScreen from './MyScreen';
import InfoModifyScreen from './MyScreen/InfoModify';
import PasswordModifyScreen from './MyScreen/PasswordModify';

const FindStack = createStackNavigator(
  {
    Find: FindScreen,
  },
  {
    defaultNavigationOptions: {
      title: '发现',
    },
  },
);

const MemberStack = createStackNavigator(
  {
    Member: MemberScreen,
  },
  {
    defaultNavigationOptions: {
      title: '会员',
    },
  },
);

const MyPageStack = createStackNavigator(
  {
    My: MyScreen,
  },
  {
    defaultNavigationOptions: {
      title: '我',
    },
  },
);

const TabNavigator = createBottomTabNavigator(
  {
    Find: FindStack,
    Member: MemberStack,
    My: MyPageStack,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarLabel: ({tintColor}) => {
        const { routeName } = navigation.state;
        const color: string = tintColor || '';
        let label = '';
        switch (routeName) {
          case 'Find':
            label = '发现';
            break;
          case 'Member':
            label = '会员';
            break;
          case 'My':
            label = '我';
            break;
          default:
            label = '发现';
        }
        return <Text style={{color}}>{label}</Text>;
      },
      tabBarIcon: ({tintColor}) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Find') {
          iconName = 'eye';
        } else if (routeName === 'Member') {
          iconName = 'crown';
        } else {
          iconName = 'account';
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
  },
);

TabNavigator.navigationOptions = {
  header: null,
  headerBackTitle: null,
};

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
