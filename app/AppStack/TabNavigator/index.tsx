import React from 'react';
import {Image, Text} from 'react-native';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import FindScreen from './FindScreen';
import MemberScreen from './MemberScreen';
import MyScreen from './MyScreen';

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
      tabBarLabel: ({focused, tintColor}) => {
        const { routeName } = navigation.state;
        let color: string = tintColor || '';
        let label = '';
        if (routeName === 'Find') {
          label = '发现';
        }
        if (routeName === 'Member') {
          label = '会员';
        }
        if (routeName === 'My') {
          label = '我';
        }
        if (routeName === 'Member' && focused) {
          color = '#444444';
        }
        return <Text style={{color, fontWeight: 'bold', textAlign: 'center'}}>{label}</Text>;
      },
      tabBarIcon: ({focused}) => {
        const { routeName } = navigation.state;
        let Icon;
        if (routeName === 'Find') {
          Icon = <Image source={
            focused ?
              require('../../Images/tab_bar_icon/find_active_icon.png') :
              require('../../Images/tab_bar_icon/find_inactive_icon.png')}
          />;
        }
        if (routeName === 'Member') {
          Icon = <Image source={
            focused ?
              require('../../Images/tab_bar_icon/member_active_icon.png') :
              require('../../Images/tab_bar_icon/member_inactive_icon.png')}
          />;
        }
        if (routeName === 'My') {
          Icon = <Image source={
            focused ?
              require('../../Images/tab_bar_icon/my_active_icon.png') :
              require('../../Images/tab_bar_icon/my_inactive_icon.png')}
          />;
        }
        return Icon;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#FF5400',
      inactiveTintColor: '#A4A4AE',
    },
  },
);

TabNavigator.navigationOptions = {
  header: null,
  headerBackTitle: null,
};

export default TabNavigator;
