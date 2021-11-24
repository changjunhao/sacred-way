import AsyncStorage from '@react-native-async-storage/async-storage';
import config from './config';

const {BASEURL} = config;

export async function getCommunityList(params: {type: any}) {
  const userToken = await AsyncStorage.getItem('userToken');
  return fetch(
    `${BASEURL}/membercenter/communityEssence/getCommunityList?type=${params.type}`,
    {
      headers: {
        USERSIGN: userToken || '',
      },
    },
  )
    .then(response => response.json())
    .then(responseJson => {
      return responseJson.data;
    })
    .catch(error => {
      console.error(error);
    });
}

export async function getCommunityInfo(params: {id: any}) {
  const userToken = await AsyncStorage.getItem('userToken');
  return fetch(
    `${BASEURL}/membercenter/communityEssence/getCommunityInfo?id=${params.id}`,
    {
      headers: {
        USERSIGN: userToken || '',
      },
    },
  )
    .then(response => response.json())
    .then(responseJson => {
      return responseJson.data;
    })
    .catch(error => {
      console.error(error);
    });
}
