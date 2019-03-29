import AsyncStorage from '@react-native-community/async-storage';
import config from './config';

const { BASEURL } = config;

export async function getBulletinList(params = {page: 1, count: 5}) {
  return fetch(`${BASEURL}/membercenter/announcement/announcementList?page=${params.page}&count=${params.count}`, {
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

export async function getBulletin(params) {
  return fetch(`${BASEURL}/membercenter/announcement/getAnnouncementInfo?id=${params.id}`, {
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
