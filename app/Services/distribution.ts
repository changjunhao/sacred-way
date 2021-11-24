import AsyncStorage from '@react-native-async-storage/async-storage';
import config from './config';

const {BASEURL} = config;

export async function getPersonMoney() {
  const userToken = await AsyncStorage.getItem('userToken');
  return fetch(`${BASEURL}/membercenter/Distribution/person_money`, {
    headers: {
      USERSIGN: userToken || '',
    },
  })
    .then(response => response.json())
    .then(responseJson => {
      return responseJson.data;
    })
    .catch(error => {
      console.error(error);
    });
}

export async function getDirectRecommend() {
  const userToken = await AsyncStorage.getItem('userToken');
  return fetch(`${BASEURL}/membercenter/Distribution/direct_recommend`, {
    headers: {
      USERSIGN: userToken || '',
    },
  })
    .then(response => response.json())
    .then(responseJson => {
      return responseJson.data;
    })
    .catch(error => {
      console.error(error);
    });
}

export async function getUserIoList(params: {page: any; pageSize: any}) {
  const userToken = await AsyncStorage.getItem('userToken');
  return fetch(
    `${BASEURL}/membercenter/Distribution/user_io_list?page=${params.page}&pageSize=${params.pageSize}`,
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

export async function getScanList(params: {page: any; pageSize: any}) {
  const userToken = await AsyncStorage.getItem('userToken');
  return fetch(
    `${BASEURL}/membercenter/Distribution/scan_list?page=${params.page}&pageSize=${params.pageSize}`,
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

export async function getDirectUser(params: {page: any; pageSize: any}) {
  const userToken = await AsyncStorage.getItem('userToken');
  return fetch(
    `${BASEURL}/membercenter/Distribution/direct_user?page=${params.page}&pageSize=${params.pageSize}`,
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
