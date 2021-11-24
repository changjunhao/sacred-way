import React, {FC, useEffect, useReducer} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from './context/authContext';
import UserContext from './context/userContext';
import AppStack from './AppStack/';
import AuthStack from './AuthStack/';
import SplashScreen from './AuthStack/SplashScreen';
import InfoEditScreen from './AuthStack/InfoEditScreen';
import {getUserInfo} from './Services/user';

const Stack = createStackNavigator();

const Theme = {
  colors: {
    ...DefaultTheme.colors,
    background: 'rgb(255, 255, 255)',
  },
};

function InfoEdit() {
  return (
    <Stack.Navigator screenOptions={{presentation: 'modal'}}>
      <Stack.Screen
        name="InfoEdit"
        component={InfoEditScreen}
        options={() => ({title: '填写资料'})}
      />
    </Stack.Navigator>
  );
}

const RootStack: FC = () => {
  const [state, dispatch] = useReducer(
    (prevState: any, action: {type: string; token?: string | null}) => {
      switch (action.type) {
        case 'LOADING':
          return {
            ...prevState,
            isLoading: true,
          };
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            isLoading: false,
            token: action.token,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isLoading: false,
            token: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            token: '',
          };
      }
    },
    {
      isLoading: true,
      token: '',
    },
  );

  const [userState, userDispatch] = useReducer(
    (prevState: any, action: any) => {
      switch (action.type) {
        case 'SET_INFO':
          return {
            ...prevState,
            info: action.info,
          };
        case 'SET_INFO_EDIT':
          return {
            ...prevState,
            infoEdit: action.infoEdit,
          };
        case 'SET_BASE_INFO':
          return {
            ...prevState,
            baseInfo: {
              ...prevState.baseInfo,
              ...action.baseInfo,
            },
          };
      }
    },
    {
      infoEdit: false,
      info: {},
      baseInfo: {
        name: '',
        phone: '',
        location: '',
      },
    },
  );

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }
      if (userToken) {
        dispatch({type: 'RESTORE_TOKEN', token: userToken});
        const userInfoResult = await getUserInfo();
        if (userInfoResult.errno !== 0) {
          await AsyncStorage.clear();
          dispatch({type: 'RESTORE_TOKEN', token: ''});
          return;
        }
        const userInfo = userInfoResult.data;
        userDispatch({type: 'SET_INFO', info: userInfo});
        userDispatch({type: 'SET_INFO_EDIT', infoEdit: userInfo.status === 0});
      } else {
        dispatch({type: 'RESTORE_TOKEN', token: ''});
      }
    };

    bootstrapAsync();
  }, []);

  return (
    <AuthContext.Provider value={{state, dispatch}}>
      {state.isLoading ? (
        <SplashScreen />
      ) : (
        <NavigationContainer
          theme={{
            ...DefaultTheme,
            ...Theme,
          }}>
          <UserContext.Provider value={{userState, userDispatch}}>
            <Stack.Navigator screenOptions={{headerShown: false}}>
              {state.token ? (
                userState.infoEdit ? (
                  <Stack.Screen name="InfoEdit" component={InfoEdit} />
                ) : (
                  <Stack.Screen name="App" component={AppStack} />
                )
              ) : (
                <Stack.Screen name="Auth" component={AuthStack} />
              )}
            </Stack.Navigator>
          </UserContext.Provider>
        </NavigationContainer>
      )}
    </AuthContext.Provider>
  );
};

export default RootStack;
