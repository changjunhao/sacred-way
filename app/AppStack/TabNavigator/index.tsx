import React from 'react';
import {Image, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FindScreen from './FindScreen';
import MemberScreen from './MemberScreen';
import MyScreen from './MyScreen';

const Tab = createBottomTabNavigator();

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: '#FF5400',
        tabBarInactiveTintColor: '#A4A4AE',
        tabBarIcon: ({focused}) => {
          const routeName = route.name;
          let Icon;
          if (routeName === 'Find') {
            Icon = (
              <Image
                source={
                  focused
                    ? require('../../Images/tab_bar_icon/find_active_icon.png')
                    : require('../../Images/tab_bar_icon/find_inactive_icon.png')
                }
              />
            );
          }
          if (routeName === 'Member') {
            Icon = (
              <Image
                source={
                  focused
                    ? require('../../Images/tab_bar_icon/member_active_icon.png')
                    : require('../../Images/tab_bar_icon/member_inactive_icon.png')
                }
              />
            );
          }
          if (routeName === 'My') {
            Icon = (
              <Image
                source={
                  focused
                    ? require('../../Images/tab_bar_icon/my_active_icon.png')
                    : require('../../Images/tab_bar_icon/my_inactive_icon.png')
                }
              />
            );
          }
          return Icon;
        },
        tabBarLabel: ({focused, color}) => {
          const routeName = route.name;
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
          return (
            <Text
              style={{
                color,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              {label}
            </Text>
          );
        },
      })}>
      <Tab.Screen name="Find" component={FindScreen} />
      <Tab.Screen name="Member" component={MemberScreen} />
      <Tab.Screen name="My" component={MyScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
