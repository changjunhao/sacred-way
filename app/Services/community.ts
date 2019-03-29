import AsyncStorage from '@react-native-community/async-storage';
import config from './config';

const { BASEURL } = config;

export async function getCommunityList(params) {
  return fetch(`${BASEURL}/membercenter/communityEssence/getCommunityList?type=${params.type}`, {
    headers: {
      USERSIGN: await AsyncStorage.getItem('userToken') || '',
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function getCommunityInfo(params) {
  return fetch(`${BASEURL}/membercenter/communityEssence/getCommunityInfo?id=${params.id}`, {
    headers: {
      USERSIGN: await AsyncStorage.getItem('userToken') || '',
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson.data;
    })
    .catch((error) => {
      console.error(error);
    });
}
