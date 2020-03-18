import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
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

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        title: '美秒短视频会员中心',
        headerTintColor: '#333',
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={({route}) => {
          let title = '发现';
          // @ts-ignore
          if (!route.state) {
            return {title};
          }
          // @ts-ignore
          const routeName = route.state.routeNames[route.state.index];
          if (routeName === 'Find') {
            title = '发现';
          }
          if (routeName === 'Member') {
            title = '会员';
          }
          if (routeName === 'My') {
            title = '我';
          }
          return {title};
        }}
      />
      <Stack.Screen name="InfoModify" component={InfoModifyScreen} />
      <Stack.Screen name="PasswordModify" component={PasswordModifyScreen} />
      <Stack.Screen name="BulletinList" component={BulletinListScreen} />
      <Stack.Screen
        name="BulletinDetail"
        component={BulletinDetailScreen}
        // @ts-ignore
        options={({route}) => ({title: route.params.title})}
      />
      <Stack.Screen
        name="CommunityList"
        component={CommunityListScreen}
        options={CommunityListScreen.navigationOptions}
      />
      <Stack.Screen name="CommunityDetail" component={CommunityDetailScreen} />
      <Stack.Screen
        name="SpecialColumnDetail"
        component={SpecialColumnDetailScreen}
      />
      <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
      <Stack.Screen
        name="Earnings"
        component={EarningsScreen}
        options={EarningsScreen.navigationOptions}
      />
      <Stack.Screen
        name="Visited"
        component={VisitedScreen}
        options={VisitedScreen.navigationOptions}
      />
      <Stack.Screen name="Inviter" component={InviterScreen} />
    </Stack.Navigator>
  );
}
