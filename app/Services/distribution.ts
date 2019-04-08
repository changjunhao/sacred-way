import { toJS } from 'mobx';
import store from '../Stores/TokenStore';
import config from './config';

const { BASEURL } = config;

export function getPersonMoney() {
  return fetch(`${BASEURL}/membercenter/Distribution/person_money`, {
    headers: {
      USERSIGN: toJS(store).token,
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

export function getDirectRecommend() {
  return fetch(`${BASEURL}/membercenter/Distribution/direct_recommend`, {
    headers: {
      USERSIGN: toJS(store).token,
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

export function getUserIoList(params) {
  return fetch(`${BASEURL}/membercenter/Distribution/user_io_list?page=${params.page}&pageSize=${params.pageSize}`, {
    headers: {
      USERSIGN: toJS(store).token,
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

export function getScanList(params) {
  return fetch(`${BASEURL}/membercenter/Distribution/scan_list?page=${params.page}&pageSize=${params.pageSize}`, {
    headers: {
      USERSIGN: toJS(store).token,
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

export function getDirectUser(params) {
  return fetch(`${BASEURL}/membercenter/Distribution/direct_user?page=${params.page}&pageSize=${params.pageSize}`, {
    headers: {
      USERSIGN: toJS(store).token,
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
