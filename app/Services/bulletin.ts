import AsyncStorage from '@react-native-async-storage/async-storage';
import config from './config';

const {BASEURL} = config;

export async function getBulletinList(params = {page: 1, count: 5}) {
  const userToken = await AsyncStorage.getItem('userToken');
  return fetch(
    `${BASEURL}/membercenter/announcement/announcementList?page=${params.page}&count=${params.count}`,
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
      return {errno: -1, errmsg: '网络请求失败，请稍后重试'};
    });
}

export async function getBulletin(params: {id: any}) {
  const userToken = await AsyncStorage.getItem('userToken');
  return fetch(
    `${BASEURL}/membercenter/announcement/getAnnouncementInfo?id=${params.id}`,
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
      return {errno: -1, errmsg: '网络请求失败，请稍后重试'};
    });
}
