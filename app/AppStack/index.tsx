import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
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

function getHeaderTitle(route: any) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Find';

  switch (routeName) {
    case 'Find':
      return '发现';
    case 'Member':
      return '会员';
    case 'My':
      return '我';
  }
}

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
        options={({route}) => ({
          title: getHeaderTitle(route),
        })}
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
        options={() => ({title: '美秒社群精华问答'})}
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
        options={() => ({title: '收益'})}
      />
      <Stack.Screen
        name="Visited"
        component={VisitedScreen}
        options={() => ({title: '浏览用户'})}
      />
      <Stack.Screen
        name="Inviter"
        component={InviterScreen}
        options={() => ({title: '购课粉丝'})}
      />
    </Stack.Navigator>
  );
}
